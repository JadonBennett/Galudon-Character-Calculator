import { useMemo } from 'react';
import { BASE_POINTS } from '../config/talents';
import { ATTRIBUTES } from '../config/attributes';
import {
  aggregateAllTalents,
  calculateTotalSpent,
  calculateTierBonuses,
  getTalentsWithTiers,
  calculateAttributeTotal
} from '../utils/calculations';
import { getWarfareGrantedTalentId, getArtsGrantedTalentIds } from '../utils/talentHelpers';

/**
 * Custom hook for calculating all character stats
 * Returns comprehensive stats object with totals, breakdowns, and error states
 */
export function useStats(talents, extraPoints, virtuoso, wieldingFinesse, wieldingHeavy) {
  const stats = useMemo(() => {
    const allSkills = aggregateAllTalents(talents);

    // Find which Strength skill (if any) is granted by Warfare
    const warfareGrantedTalentId = getWarfareGrantedTalentId(talents);

    // Find which Academics skills (if any) are granted by The Arts
    const artsGrantedTalentIds = getArtsGrantedTalentIds(talents);

    // Calculate total spent
    const totalSpent = calculateTotalSpent(allSkills, warfareGrantedTalentId, artsGrantedTalentIds);

    const remaining = BASE_POINTS + extraPoints - totalSpent;
    const tier3Count = allSkills.filter(s => s.tier >= 3).length;
    const hasError = tier3Count > 1 && !virtuoso;

    // Count mystics and curses with tiers
    const mysticsWithTiersCount = getTalentsWithTiers(talents.mystics).length;
    const cursesWithTiersCount = getTalentsWithTiers(talents.curses).length;
    const hasMysticsError = mysticsWithTiersCount > 1;
    const hasCursesError = cursesWithTiersCount > 1;

    // Calculate tier bonuses for all skills with detailed breakdown
    const { bonuses: abilityBonuses, breakdowns: abilityBreakdowns } = calculateTierBonuses(allSkills, talents);

    // Check if Lich curse is active
    const lichCurse = talents.curses.find(c => c.id === 'lich');
    const isLichActive = lichCurse && lichCurse.tier > 0;

    // Calculate ability totals using helper function for each attribute
    const attributeResults = {};

    Object.keys(ATTRIBUTES).forEach(key => {
      const config = ATTRIBUTES[key];
      const categoryKey = key === 'cursed' ? 'curses' : key;
      const skillCategory = talents[categoryKey];
      const tierBonus = key === 'cursed' ? 0 : (abilityBonuses[key] || 0);
      const wieldingBonus = key === 'strength' ? (wieldingHeavy ? 2 : 0) :
                            key === 'dexterity' ? (wieldingFinesse ? 2 : 0) : 0;
      const lichCap = key === 'dexterity' ? isLichActive : false;

      attributeResults[key] = calculateAttributeTotal(
        config,
        skillCategory,
        tierBonus,
        wieldingBonus,
        lichCap,
        talents,
        categoryKey
      );
    });

    // Extract convenient shortcuts for commonly used values
    const constitutionTotal = attributeResults.constitution.total;
    const strengthTotal = attributeResults.strength.total;
    const dexterityTotal = attributeResults.dexterity.total;
    const scrutinyTotal = attributeResults.scrutiny.total;
    const mysticsTotal = attributeResults.mystics.total;
    const cursedTotal = attributeResults.cursed.total;

    return {
      totalSpent,
      remaining,
      tier3Count,
      hasError,
      mysticsWithTiersCount,
      cursesWithTiersCount,
      hasMysticsError,
      hasCursesError,
      constitutionTotal,
      strengthTotal,
      dexterityTotal,
      scrutinyTotal,
      mysticsTotal,
      cursedTotal,
      canSpend: remaining > 0,
      // Breakdowns for tooltips
      breakdowns: Object.keys(ATTRIBUTES).reduce((acc, key) => {
        const config = ATTRIBUTES[key];
        const result = attributeResults[key];

        acc[key] = {
          base: config.baseValue,
          fromTalents: result.fromTalents,
          talentDetails: result.talentDetails,
          total: result.total,
          capped: result.capped,
          cap: result.cap
        };

        // Add ability bonuses and details for non-cursed attributes
        if (key !== 'cursed') {
          acc[key].abilityBonuses = abilityBonuses[key];
          acc[key].abilityDetails = abilityBreakdowns[key];
        }

        // Add wielding bonus for strength and dexterity
        if (key === 'strength' || key === 'dexterity') {
          acc[key].wielding = result.wieldingBonus;
        }

        // Add lich cap for dexterity
        if (key === 'dexterity') {
          acc[key].lichCap = result.lichCap;
        }

        return acc;
      }, {})
    };
  }, [talents, extraPoints, virtuoso, wieldingFinesse, wieldingHeavy]);

  return stats;
}

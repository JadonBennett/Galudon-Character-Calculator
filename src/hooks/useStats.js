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
export function useStats(talents, extraPoints, virtuoso, wieldingFinesse, wieldingHeavy, customGrimoireEnabled, customGrimoireSpells, enhancedCurseEnabled, enhancedCurseAbilities, enhancedMartialEnabled, enhancedMartialAbilities, luminarchEnabled, luminarchAbilities) {
  const stats = useMemo(() => {
    const allSkills = aggregateAllTalents(talents);

    // Find which Strength skill (if any) is granted by Warfare
    const warfareGrantedTalentId = getWarfareGrantedTalentId(talents);

    // Find which Academics skills (if any) are granted by The Arts
    const artsGrantedTalentIds = getArtsGrantedTalentIds(talents);

    // Calculate total spent
    const totalSpent = calculateTotalSpent(allSkills, warfareGrantedTalentId, artsGrantedTalentIds);

    // Calculate custom grimoire cost (highest tier with spells)
    let grimoireCost = 0;
    if (customGrimoireEnabled && customGrimoireSpells) {
      for (let tier = 3; tier >= 1; tier--) {
        const hasSpell = customGrimoireSpells[tier]?.some(spell => spell.name && spell.name.trim() !== '');
        if (hasSpell) {
          grimoireCost = tier;
          break;
        }
      }
    }

    // Calculate enhanced curse cost (highest tier with abilities)
    let enhancedCurseCost = 0;
    if (enhancedCurseEnabled && enhancedCurseAbilities) {
      for (let tier = 3; tier >= 1; tier--) {
        const hasAbility = enhancedCurseAbilities[tier]?.some(ability => ability.name && ability.name.trim() !== '');
        if (hasAbility) {
          enhancedCurseCost = tier;
          break;
        }
      }
    }

    // Calculate enhanced martial cost (highest tier with abilities)
    let enhancedMartialCost = 0;
    if (enhancedMartialEnabled && enhancedMartialAbilities) {
      for (let tier = 3; tier >= 1; tier--) {
        const hasAbility = enhancedMartialAbilities[tier]?.some(ability => ability.name && ability.name.trim() !== '');
        if (hasAbility) {
          enhancedMartialCost = tier;
          break;
        }
      }
    }

    // Calculate luminarch cost (highest tier with abilities)
    let luminarchCost = 0;
    if (luminarchEnabled && luminarchAbilities) {
      for (let tier = 3; tier >= 1; tier--) {
        const hasAbility = luminarchAbilities[tier]?.some(ability => ability.name && ability.name.trim() !== '');
        if (hasAbility) {
          luminarchCost = tier;
          break;
        }
      }
    }

    const remaining = BASE_POINTS + extraPoints - totalSpent - grimoireCost - enhancedCurseCost - enhancedMartialCost - luminarchCost;
    const tier3Count = allSkills.filter(s => s.tier >= 3).length;
    const hasError = tier3Count > 1 && !virtuoso;

    // Count mystics and curses with tiers
    const mysticsWithTiersCount = getTalentsWithTiers(talents.mystics).length;
    const cursesWithTiersCount = getTalentsWithTiers(talents.curses).length;
    // Custom Magic Grimoire counts as a mystic with tiers
    const hasMysticsError = mysticsWithTiersCount + (customGrimoireEnabled ? 1 : 0) > 1;
    // Enhanced Curse counts as a curse with tiers
    const hasCursesError = cursesWithTiersCount + (enhancedCurseEnabled ? 1 : 0) > 1;

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
      grimoireCost,
      enhancedCurseCost,
      enhancedMartialCost,
      luminarchCost,
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
  }, [talents, extraPoints, virtuoso, wieldingFinesse, wieldingHeavy, customGrimoireEnabled, customGrimoireSpells, enhancedCurseEnabled, enhancedCurseAbilities, enhancedMartialEnabled, enhancedMartialAbilities, luminarchEnabled, luminarchAbilities]);

  return stats;
}

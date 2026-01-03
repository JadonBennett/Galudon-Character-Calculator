import { ABILITY_BONUSES } from '../config/talents';
import { calculateFreeTiers } from './freeTiers';

/**
 * Calculate ability total with detailed breakdown
 * @param {Object} config - Attribute configuration (from ATTRIBUTES)
 * @param {Array} talentsArray - Array of talents in this category
 * @param {number} abilityBonus - Ability bonuses from talent tiers
 * @param {number} wieldingBonus - Bonus from wielding weapons
 * @param {boolean} lichActive - Whether Lich curse is active
 * @param {Object} talents - Full talents object (for free tier calculation)
 * @param {string} category - Category name (for free tier calculation)
 * @returns {Object} Breakdown of ability total
 */
export function calculateAttributeTotal(config, talentsArray, abilityBonus, wieldingBonus = 0, lichActive = false, talents = null, category = null) {
  const talentDetails = talentsArray
    .map(t => {
      // Calculate total tier including free tiers
      let totalTier = t.tier;
      if (talents && category) {
        const freeTiersInfo = calculateFreeTiers(category, t.id, talents);
        totalTier = t.tier + freeTiersInfo.count;
      }

      return {
        name: t.name,
        tier: totalTier,
        bonus: config.abilityBonusFormula(totalTier),
        totalTier: totalTier
      };
    })
    .filter(t => t.totalTier > 0 && t.totalTier <= 3);

  const fromTalents = talentDetails.reduce((sum, t) => sum + t.bonus, 0);
  const raw = config.baseValue + fromTalents + abilityBonus + wieldingBonus;

  // Apply caps (handle Lich dexterity special case)
  let cap = config.cap;
  if (lichActive && config.lichCap) {
    cap = config.lichCap;
  }

  const total = Math.min(cap, raw);

  return {
    total,
    raw,
    talentDetails,
    fromTalents,
    abilityBonus,
    wieldingBonus,
    capped: raw > cap,
    cap,
    lichCap: lichActive && config.lichCap ? config.lichCap : null
  };
}

/**
 * Calculate effective tier (excluding warfare-granted and arts-granted free points)
 * Used for point cost calculations
 * @param {Object} talent - Talent object
 * @param {string} warfareGrantedTalentId - Talent ID that receives warfare bonus
 * @param {Array} artsGrantedTalentIds - Talent IDs that receive arts bonuses
 * @returns {number} Effective tier for cost calculation
 */
export function calculateEffectiveTier(talent, warfareGrantedTalentId, artsGrantedTalentIds) {
  let effectiveTier = talent.tier;

  // Subtract warfare-granted point if applicable
  if (talent.id === warfareGrantedTalentId && effectiveTier > 0) {
    effectiveTier = Math.max(0, talent.tier - 1);
  }

  // Subtract arts-granted points if applicable (could be 1 or 2 points)
  if (artsGrantedTalentIds.includes(talent.id) && effectiveTier > 0) {
    const artsGrantedCount = artsGrantedTalentIds.filter(id => id === talent.id).length;
    effectiveTier = Math.max(0, talent.tier - artsGrantedCount);
  }

  return effectiveTier;
}

/**
 * Calculate total points spent across all talents
 * @param {Array} allTalents - Aggregated array of all talents
 * @param {string} warfareGrantedTalentId - Talent ID that receives warfare bonus
 * @param {Array} artsGrantedTalentIds - Talent IDs that receive arts bonuses
 * @returns {number} Total points spent
 */
export function calculateTotalSpent(allTalents, warfareGrantedTalentId, artsGrantedTalentIds) {
  return allTalents.reduce((sum, talent) => {
    const cost = talent.cost || 1;

    // Handle curses (cost 3 if tier >= 1, with Lich+Mortanum exception)
    if (cost === 3 && talent.tier >= 1) {
      if (talent.id === 'lich' && talent.subclass === 'Mortanum') {
        return sum; // Lich with Mortanum subclass costs 0 points
      }
      return sum + 3;
    }

    // Calculate effective tier (excluding free points)
    const effectiveTier = calculateEffectiveTier(talent, warfareGrantedTalentId, artsGrantedTalentIds);
    return sum + (effectiveTier * cost);
  }, 0);
}

/**
 * Aggregate all talents from all categories into a single array
 * @param {Object} talents - Talents object with all categories
 * @returns {Array} Single array containing all talents
 */
export function aggregateAllTalents(talents) {
  return [...talents.constitution, ...talents.strength, ...talents.dexterity, ...talents.scrutiny, ...talents.mystics, ...talents.curses];
}

/**
 * Calculate tier bonuses (ability bonuses from talent tiers) for all talents
 * @param {Array} allTalents - Aggregated array of all talents
 * @param {Object} talents - Full talents object (for free tier calculation)
 * @returns {Object} { bonuses, breakdowns } with ability bonuses and detailed breakdowns
 */
export function calculateTierBonuses(allTalents, talents) {
  const bonuses = {
    constitution: 0,
    strength: 0,
    dexterity: 0,
    scrutiny: 0,
    mystics: 0
  };
  const breakdowns = {
    constitution: [],
    strength: [],
    dexterity: [],
    scrutiny: [],
    mystics: []
  };

  allTalents.forEach(talent => {
    // Determine which category this talent belongs to
    let category = null;
    if (talents.constitution.includes(talent)) category = 'constitution';
    else if (talents.strength.includes(talent)) category = 'strength';
    else if (talents.dexterity.includes(talent)) category = 'dexterity';
    else if (talents.scrutiny.includes(talent)) category = 'scrutiny';
    else if (talents.mystics.includes(talent)) category = 'mystics';
    else if (talents.curses.includes(talent)) category = 'curses';

    if (category && ABILITY_BONUSES[talent.id]) {
      // Calculate total tier including free tiers
      const freeTiersInfo = calculateFreeTiers(category, talent.id, talents);
      const totalTier = talent.tier + freeTiersInfo.count;

      // Accumulate bonuses from all tiers 1 through total tier (paid + free)
      if (totalTier > 0) {
        for (let tier = 1; tier <= totalTier; tier++) {
          const abilityBonus = ABILITY_BONUSES[talent.id][tier];
          if (abilityBonus) {
            Object.keys(abilityBonus).forEach(attr => {
              bonuses[attr] += abilityBonus[attr];
              breakdowns[attr].push({ name: talent.name, tier: tier, bonus: abilityBonus[attr] });
            });
          }
        }
      }
    }
  });

  return { bonuses, breakdowns };
}

/**
 * Get active talents by category (with paid or free tiers)
 * @param {string} category - Category name
 * @param {Object} talents - Full talents object
 * @returns {Array} Filtered array of talents with tiers > 0 or free tiers
 */
export function getTalentsByCategory(category, talents) {
  const talentList = talents[category];
  if (category === 'mystics' || category === 'curses') {
    return talentList.filter(t => t.tier > 0);
  }
  return talentList.filter(t => {
    const freeTiers = calculateFreeTiers(category, t.id, talents);
    return t.tier > 0 || freeTiers.count > 0;
  });
}

/**
 * Filter talents with tiers > 0
 * @param {Array} talentsArray - Array of talents
 * @returns {Array} Filtered array of talents with tiers > 0
 */
export function getTalentsWithTiers(talentsArray) {
  return talentsArray.filter(t => t.tier > 0);
}

/**
 * Skill Tier Identifiers Configuration
 *
 * This file defines custom tier identifier terms for skills that appear at multiple tiers.
 * When a skill has duplicates at different tiers, these identifiers appear before the skill name.
 *
 * Format:
 * 'skill-name': {
 *   1: 'Identifier for Tier 1',
 *   2: 'Identifier for Tier 2',
 *   3: 'Identifier for Tier 3'
 * }
 *
 * Skills not listed here will use the default identifiers:
 * Tier 1: 'Novice'
 * Tier 2: 'Adept'
 * Tier 3: 'Master'
 */

export const SKILL_TIER_IDENTIFIERS = {
  // Skills that appear at multiple tiers within the same talent
  // Uncomment and customize any skill to use custom tier identifiers

  // Wayfarer
  'Stumble onto Map': { 1: 'Basic', 2: 'Intermediate', 3: 'Advanced' },

  // Smithing
  'Smithy': { 2: 'Renowned' },

  // Cooking
  'Chef': { 2: 'Renowned' },
  'Listen for World Affairs': { 2: 'Minor', 3: 'Major' },

  // Finesse Weapons
  'Finesse Weapon': { 1: ' ', 2: 'Adept', 3: 'Master' },

  // Firearms
  'Firearms Proficiency': { 1: ' ', 2: 'Adept', 3: 'Master' },

  // Heavy Weapons
  'Heavy Weapon Proficiency': { 1: ' ', 2: 'Adept', 3: 'Master' },

  // Brawn (Unarmed)
  'Unarmed Combat': { 1: ' ', 2: 'Adept', 3: 'Master' },

  // Martial Weapons
  'Martial Weapon Proficiency': { 1: ' ', 2: 'Adept', 3: 'Master' },

  // Traditional Ranged
  'Traditional Ranged Proficiency': { 1: ' ', 2: 'Adept', 3: 'Master' },

  // Sleight of Hand
  // 'Lockpicking': { 1: 'Novice', 2: 'Adept', 3: 'Master' },
  // 'PickPocketing': { 1: 'Novice', 2: 'Adept', 3: 'Master' },

  // Stealth
  // 'Concealment': { 1: 'Novice', 2: 'Adept', 3: 'Master' },

  // Engineering
  'Device Creation': { 1: 'Small', 2: 'Medium' },

  // Academics (Both Subject 1 & 2)
  'Archives Access': { 1: ' ', 2: 'Royal', 3: 'Hidden' },
  'Professor Cert': { 2: 'Adjunct', 3: 'Full' },

  // Medicine & Alchemy
  // 'Healing': { 1: 'Novice', 2: 'Adept', 3: 'Master' },
  // 'Alchemical Concotions': { 1: 'Novice', 2: 'Adept', 3: 'Master' },

  // Navigation
  // 'Water or Air Vessel': { 1: 'Small', 2: 'Medium', 3: 'State of the Art' },

  // Warfare
  'Platoon of Personal Troops': { 2: 'Minor', 3: 'Major' },
  'Warfare Rank': { 1: 'Officer', 2: 'Officer', 3: 'General' },

  // Black Market Info
  // 'Forging': { 1: 'Novice', 2: 'Adept', 3: 'Master' },

  // Arcane Knowledge
  // 'Magic Sense': { 1: 'Novice', 2: 'Adept', 3: 'Master' },
  // 'Artificing, and Enchanting': { 1: 'Novice', 2: 'Adept', 3: 'Master' },
  'Arcane Archives Access': { 1: ' ', 2: 'Intermediate', 3: 'Greater' },
};

/**
 * Default tier identifiers used when skill doesn't have custom identifiers
 */
export const DEFAULT_TIER_IDENTIFIERS = {
  1: 'Novice',
  2: 'Adept',
  3: 'Master'
};

/**
 * Get tier identifier for a specific skill and tier
 * @param {string} skillName - Name of the skill
 * @param {number} tier - Tier level (1-3)
 * @returns {string} Tier identifier
 */
export function getTierIdentifier(skillName, tier) {
  // Check if skill has custom identifiers
  if (SKILL_TIER_IDENTIFIERS[skillName]) {
    return SKILL_TIER_IDENTIFIERS[skillName][tier] || DEFAULT_TIER_IDENTIFIERS[tier] || '';
  }

  // Use default identifiers
  return DEFAULT_TIER_IDENTIFIERS[tier] || '';
}

import { calculateFreeTiers } from './freeTiers';

/**
 * Consolidate duplicate skills by name, keeping highest tier
 * Used for displaying skill lists without duplicates
 * @param {Array} skills - Array of skill entries with { skill, tier, ... }
 * @returns {Object} { consolidated, tierCounts } with unique skills and tier tracking
 */
export function consolidateSkillsByName(skills) {
  const skillsByName = {};
  const tierCounts = {};

  skills.forEach(entry => {
    const skillName = entry.skill.name;
    if (!tierCounts[skillName]) {
      tierCounts[skillName] = new Set();
    }
    tierCounts[skillName].add(entry.tier);

    if (!skillsByName[skillName] || entry.tier > skillsByName[skillName].tier) {
      skillsByName[skillName] = entry;
    }
  });

  return { consolidated: Object.values(skillsByName), tierCounts };
}

/**
 * Aggregate all skills from talents across categories
 * Collects skill abilities from all talent tiers into a single array
 * @param {Object} talents - Full talents object
 * @param {Object} options - Options for filtering which categories to include
 * @param {boolean} options.includeWeapons - Include skills from strength (weapon) talents
 * @param {boolean} options.includeRegular - Include skills from constitution, dexterity, scrutiny
 * @param {boolean} options.includeCurses - Include skills from curses
 * @param {boolean} options.includeMystics - Include skills from mystics
 * @returns {Array} Array of skill entries with { id, skill, talentName, tier, isCurse }
 */
export function aggregateSkillsFromTalents(talents, options = {}) {
  const allSkills = [];
  const {
    includeWeapons = true,
    includeRegular = true,
    includeCurses = true,
    includeMystics = false
  } = options;

  // From weapon talents (strength)
  if (includeWeapons) {
    talents.strength.forEach(talent => {
      const freeTiers = calculateFreeTiers('strength', talent.id, talents);
      const totalTier = talent.tier + freeTiers.count;
      if (totalTier > 0) {
        for (let tier = 1; tier <= totalTier; tier++) {
          const skillsList = talent.skills?.[tier] || [];
          skillsList.forEach((skill, idx) => {
            if (skill.name && skill.name.trim() !== '') {
              allSkills.push({
                id: `weapon-${talent.id}-${tier}-${idx}`,
                skill,
                talentName: talent.name,
                tier: tier,
                isCurse: false
              });
            }
          });
        }
      }
    });
  }

  // From regular talents (constitution, dexterity, scrutiny)
  if (includeRegular) {
    const regularTalentCategories = [
      { category: 'constitution', talents: talents.constitution },
      { category: 'dexterity', talents: talents.dexterity },
      { category: 'scrutiny', talents: talents.scrutiny }
    ];
    regularTalentCategories.forEach(({ category, talents: talentsInCategory }) => {
      talentsInCategory.forEach(talent => {
        const freeTiers = calculateFreeTiers(category, talent.id, talents);
        const totalTier = talent.tier + freeTiers.count;
        if (totalTier > 0) {
          for (let tier = 1; tier <= totalTier; tier++) {
            const skillsList = talent.skills?.[tier] || [];
            skillsList.forEach((skill, idx) => {
              if (skill.name && skill.name.trim() !== '') {
                allSkills.push({
                  id: `talent-${talent.id}-${tier}-${idx}`,
                  skill,
                  talentName: talent.name,
                  tier: tier,
                  isCurse: false
                });
              }
            });
          }
        }
      });
    });
  }

  // From mystics
  if (includeMystics) {
    talents.mystics.forEach(talent => {
      if (talent.tier > 0) {
        for (let tier = 1; tier <= talent.tier; tier++) {
          const skillsList = talent.skills?.[tier] || [];
          skillsList.forEach((skill, idx) => {
            if (skill.name && skill.name.trim() !== '') {
              allSkills.push({
                id: `mystic-${talent.id}-${tier}-${idx}`,
                skill,
                talentName: talent.name,
                tier: tier,
                isCurse: false
              });
            }
          });
        }
      }
    });
  }

  // From curses
  if (includeCurses) {
    talents.curses.forEach(talent => {
      if (talent.tier > 0) {
        for (let tier = 1; tier <= talent.tier; tier++) {
          const skillsList = talent.skills?.[tier] || [];
          skillsList.forEach((skill, idx) => {
            if (skill.name && skill.name.trim() !== '') {
              allSkills.push({
                id: `curse-${talent.id}-${tier}-${idx}`,
                skill,
                talentName: talent.name,
                tier: tier,
                isCurse: true
              });
            }
          });
        }
      }
    });
  }

  return allSkills;
}

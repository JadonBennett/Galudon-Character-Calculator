import { FREE_TIERS } from '../config/talents';

/**
 * Find a talent by ID across all talent categories
 * @param {string} talentId - Talent ID to find
 * @param {Object} talents - Full talents object
 * @returns {Object|null} Talent object if found, null otherwise
 */
export function findTalentById(talentId, talents) {
  for (const talentsArray of Object.values(talents)) {
    const found = talentsArray.find(t => t.id === talentId);
    if (found) return found;
  }
  return null;
}

/**
 * Check if a target grant matches the requested talent
 * @param {Object} targetGrant - Grant object with category and talentId
 * @param {string} category - Category to match
 * @param {string} talentId - Talent ID to match
 * @returns {boolean} True if grant matches
 */
function grantMatchesTarget(targetGrant, category, talentId) {
  return targetGrant && targetGrant.category === category && targetGrant.talentId === talentId;
}

/**
 * Process a single grant and add to count/sources if it matches
 * @param {Object} grant - Grant configuration
 * @param {Object} talent - Granting talent object
 * @param {number} thresholdTier - Tier threshold for this grant
 * @param {string} category - Target category
 * @param {string} talentId - Target talent ID
 * @param {number} count - Current count of free tiers
 * @param {Array} sources - Array of source objects
 * @returns {number} Updated count
 */
function processGrant(grant, talent, thresholdTier, category, talentId, count, sources) {
  let targetGrant = null;

  // Determine target grant based on grant type
  if (grant.type === 'bonusTier-dependent') {
    if (talent.tier >= thresholdTier && talent.bonusTier) {
      targetGrant = grant.bonusTierMap[talent.bonusTier];
    }
  } else if (grant.type === 'subclass-dependent') {
    if (talent.tier >= thresholdTier && talent.subclass) {
      targetGrant = grant.subclassMap[talent.subclass];
    }
  } else {
    // Direct grant
    if (talent.tier >= thresholdTier) {
      targetGrant = grant;
    }
  }

  // If grant matches target, increment count and add source
  if (grantMatchesTarget(targetGrant, category, talentId)) {
    count++;
    sources.push({ talentName: talent.name, talentTier: talent.tier, thresholdTier });
  }

  return count;
}

/**
 * Calculate free tiers granted to a talent
 * Checks all talents that can grant free tiers and counts matches
 * @param {string} category - Category of the target talent
 * @param {string} talentId - ID of the target talent
 * @param {Object} talents - Full talents object
 * @returns {Object} { count, sources } with number of free tiers and source details
 */
export function calculateFreeTiers(category, talentId, talents) {
  let count = 0;
  const sources = [];

  // Check all talents that grant free tiers
  Object.entries(FREE_TIERS).forEach(([grantingTalentId, tierGrants]) => {
    const talent = findTalentById(grantingTalentId, talents);
    if (!talent) return;

    // Process each tier grant
    Object.entries(tierGrants).forEach(([tierStr, grant]) => {
      const thresholdTier = parseInt(tierStr);
      count = processGrant(grant, talent, thresholdTier, category, talentId, count, sources);
    });
  });

  return { count, sources };
}

import { ARTS_IDS, WARFARE_SKILL_MAP } from '../config/constants';

/**
 * Check if a talent ID is an Arts talent
 * @param {string} talentId - Talent ID to check
 * @returns {boolean} True if talent is an Arts talent
 */
export function isArtsTalent(talentId) {
  return ARTS_IDS.includes(talentId);
}

/**
 * Get warfare-granted talent ID from warfare talent
 * Returns the talent ID that receives a free tier from Warfare talent's bonus selection
 * @param {Object} talents - Full talents object
 * @returns {string|null} Talent ID that receives warfare bonus, or null
 */
export function getWarfareGrantedTalentId(talents) {
  const warfare = talents.scrutiny?.find(t => t.id === 'warfare');
  return warfare?.bonusTier ? WARFARE_SKILL_MAP[warfare.bonusTier] : null;
}

/**
 * Get arts-granted talent IDs from arts talents
 * Returns talent IDs that receive free tiers from Arts talents' bonus selections
 * @param {Object} talents - Full talents object
 * @returns {Array} Array of talent IDs that receive arts bonuses
 */
export function getArtsGrantedTalentIds(talents) {
  const artsGrantedTalentIds = [];
  ARTS_IDS.forEach(artsId => {
    const arts = talents.constitution.find(t => t.id === artsId);
    if (arts?.bonusTier && (arts.bonusTier === 'academics-1' || arts.bonusTier === 'academics-2')) {
      artsGrantedTalentIds.push(arts.bonusTier);
    }
  });
  return artsGrantedTalentIds;
}

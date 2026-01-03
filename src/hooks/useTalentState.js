import { useState, useCallback, useEffect } from 'react';
import { INITIAL_TALENTS, BASE_POINTS } from '../config/talents';
import { ARTS_IDS } from '../config/constants';
import { getWarfareGrantedTalentId, getArtsGrantedTalentIds } from '../utils/talentHelpers';
import { getTalentsWithTiers } from '../utils/calculations';

/**
 * Custom hook for managing talent state and operations
 * Handles talent tier updates, name changes, and subclass selection
 */
export function useTalentState(extraPoints) {
  const [talents, setTalents] = useState(INITIAL_TALENTS);

  // Handle cleanup when Warfare tier goes to 0
  useEffect(() => {
    const warfare = talents.scrutiny.find(s => s.id === 'warfare');
    if (warfare && warfare.tier === 0 && warfare.bonusTier) {
      // Clear bonusTier when tier drops to 0 (freeTiers system handles removal automatically)
      setTalents(prev => ({
        ...prev,
        scrutiny: prev.scrutiny.map(s =>
          s.id === 'warfare' ? { ...s, bonusTier: '' } : s
        )
      }));
    }
  }, [talents.scrutiny]);

  // Handle cleanup when The Arts tier goes below 2
  useEffect(() => {
    ARTS_IDS.forEach(artsId => {
      const arts = talents.constitution.find(s => s.id === artsId);
      if (arts && arts.tier < 2 && arts.bonusTier) {
        // Clear bonusTier when tier drops below 2 (freeTiers system handles removal automatically)
        setTalents(prev => ({
          ...prev,
          constitution: prev.constitution.map(s =>
            s.id === artsId ? { ...s, bonusTier: '' } : s
          )
        }));
      }
    });
  }, [talents.constitution]);

  const updateTalent = useCallback((category, talentId, delta) => {
    setTalents(prev => {
      const talent = prev[category].find(s => s.id === talentId);
      if (!talent) return prev;

      // Check if this skill is warfare-granted
      const warfareGrantedTalentId = getWarfareGrantedTalentId(prev);

      // Prevent removing warfare-granted point
      if (talentId === warfareGrantedTalentId && delta < 0 && talent.tier === 1) {
        return prev; // Can't go below tier 1 for warfare-granted skill
      }

      // Check if this skill is Arts-granted and count how many free points it has
      const artsGrantedTalentIds = getArtsGrantedTalentIds(prev);

      // Count how many times this skill is granted (could be 0, 1, or 2)
      const artsGrantedCount = artsGrantedTalentIds.filter(id => id === talentId).length;

      // Prevent removing Arts-granted points
      if (artsGrantedCount > 0 && delta < 0 && talent.tier <= artsGrantedCount) {
        return prev; // Can't go below the number of granted points
      }

      const cost = talent.cost || 1;
      const isCurse = cost === 3;
      const isMystic = category === 'mystics';

      // Check for mutual exclusivity - allow up to 2 mystics and 2 curses
      if (delta > 0 && talent.tier === 0) {
        // Check if trying to add tiers to a mystic when 2 other mystics already have tiers
        if (isMystic) {
          const mysticsWithTiers = getTalentsWithTiers(prev.mystics);
          if (mysticsWithTiers.length >= 2) {
            return prev; // Block: already have 2 mystics with tiers
          }
        }

        // Check if trying to add tiers to a curse when 2 other curses already have tiers
        if (isCurse) {
          const cursesWithTiers = getTalentsWithTiers(prev.curses);
          if (cursesWithTiers.length >= 2) {
            return prev; // Block: already have 2 curses with tiers
          }
        }
      }

      const allSkills = [...prev.constitution, ...prev.strength, ...prev.dexterity, ...prev.scrutiny, ...prev.mystics, ...prev.curses];

      // Calculate total spent with curse special rule
      const totalSpent = allSkills.reduce((sum, s) => {
        const sCost = s.cost || 1;
        if (sCost === 3 && s.tier >= 1) {
          return sum + 3;
        }

        // Exclude warfare-granted point from total
        let effectiveTier = s.tier;
        if (s.id === warfareGrantedTalentId && effectiveTier > 0) {
          effectiveTier = Math.max(0, s.tier - 1);
        }

        // Exclude Arts-granted point from total
        if (artsGrantedTalentIds.includes(s.id) && effectiveTier > 0) {
          effectiveTier = Math.max(0, s.tier - 1);
        }

        return sum + (effectiveTier * sCost);
      }, 0);

      const remaining = BASE_POINTS + extraPoints - totalSpent;

      return {
        ...prev,
        [category]: prev[category].map(s => {
          if (s.id === talentId) {
            let newTier;

            // Curses are all-or-nothing: tier 0 or tier 3
            if (isCurse) {
              if (delta > 0 && s.tier === 0) {
                // Check if we have 3 points available
                if (remaining < 3) return s;
                newTier = 3; // Jump straight to tier 3
              } else if (delta < 0) {
                newTier = 0; // Go straight to 0
              } else {
                return s; // Already at tier 3, can't increase further
              }
            } else {
              // Normal skills: increment/decrement normally
              newTier = Math.max(0, Math.min(3, s.tier + delta));
              // Check if we have enough points
              if (delta > 0 && remaining < cost) return s;
            }

            return { ...s, tier: newTier };
          }
          return s;
        })
      };
    });
  }, [extraPoints]);

  const updateTalentName = useCallback((category, talentId, newName) => {
    setTalents(prev => ({
      ...prev,
      [category]: prev[category].map(talent =>
        talent.id === talentId ? { ...talent, name: newName } : talent
      )
    }));
  }, []);

  const updateTalentSubclass = useCallback((category, talentId, newSubclass) => {
    setTalents(prev => ({
      ...prev,
      [category]: prev[category].map(talent =>
        talent.id === talentId ? { ...talent, subclass: newSubclass } : talent
      )
    }));
  }, []);

  return {
    talents,
    setTalents,
    updateTalent,
    updateTalentName,
    updateTalentSubclass
  };
}

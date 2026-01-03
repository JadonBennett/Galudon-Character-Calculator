import React, { useCallback } from 'react';
import { ICON_MAP } from '../config/attributes';
import { ERROR_MESSAGES } from '../config/constants';
import { isArtsTalent } from '../utils/talentHelpers';

const TalentRow = React.memo(({ talent, freeTiers, freeTiersSources, displayTier, category, updateTalent, updateTalentName, updateTalentSubclass, tier3Count, canAffordIncrease, virtuoso, hasMysticsError, hasCursesError, mysticsWithTiersCount, cursesWithTiersCount, isWarfareGranted, artsGrantedCount, academicsSkills, setTalents }) => {
  const hasTier3Error = talent.tier >= 3 && tier3Count > 1 && !virtuoso;
  const isMystic = category === 'mystics';
  const isCurse = talent.cost === 3;
  const hasMysticError = isMystic && talent.tier > 0 && hasMysticsError;
  const hasCurseError = isCurse && talent.tier > 0 && hasCursesError;
  const hasAnyError = hasTier3Error || hasMysticError || hasCurseError;
  const cost = talent.cost || 1;

  // Disable increase button if at limit and this talent has no tiers
  const isBlockedByMysticLimit = isMystic && talent.tier === 0 && mysticsWithTiersCount >= 2;
  const isBlockedByCurseLimit = isCurse && talent.tier === 0 && cursesWithTiersCount >= 2;

  const handleSubclassChange = useCallback((e) => {
    const newValue = e.target.value;
    // freeTiers system handles automatic granting/removal of tiers
    // Update the appropriate property (bonusTier for Warfare/Arts, subclass for Curses)
    if (talent.bonusTierOptions) {
      // Has bonusTierOptions - update bonusTier property
      setTalents(prev => ({
        ...prev,
        [category]: prev[category].map(s =>
          s.id === talent.id ? { ...s, bonusTier: newValue } : s
        )
      }));
    } else {
      // Has subclassOptions - update subclass property
      updateTalentSubclass(category, talent.id, newValue);
    }
  }, [category, talent.id, talent.bonusTierOptions, updateTalentSubclass, setTalents]);

  // Parse editable skill names to separate prefix from subject
  const getEditableParts = (name) => {
    // If name is empty, use placeholder to determine prefix
    if (!name && talent.placeholder) {
      const match = talent.placeholder.match(/^(The Arts|Academics)\s+(.*)$/);
      if (match) {
        return { prefix: match[1], subject: '' };
      }
    }
    // Match pattern like "The Arts Subject 1" or "Academics Subject 1"
    const match = name.match(/^(The Arts|Academics)\s+(.+)$/);
    if (match) {
      return { prefix: match[1], subject: match[2].trim() };
    }
    // If just "The Arts" or "Academics" without subject, return empty subject
    if (name === 'The Arts' || name.trim() === 'The Arts') {
      return { prefix: 'The Arts', subject: '' };
    }
    if (name === 'Academics' || name.trim() === 'Academics') {
      return { prefix: 'Academics', subject: '' };
    }
    return { prefix: '', subject: name };
  };

  const parts = getEditableParts(talent.name);
  const [localSubject, setLocalSubject] = React.useState(parts.subject);

  // Initialize showSubclass based on tier threshold
  const isArts = isArtsTalent(talent.id);
  const tierThreshold = isArts ? 2 : 1;
  const [showSubclass, setShowSubclass] = React.useState(talent.tier >= tierThreshold);
  const [isAnimatingOut, setIsAnimatingOut] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  // Update local state when talent.name changes from external source
  React.useEffect(() => {
    setLocalSubject(parts.subject);
  }, [talent.name]);

  // Handle subclass/bonusTier wrapper show/hide with animation
  React.useEffect(() => {
    if (talent.subclassOptions || talent.bonusTierOptions) {
      // Determine tier threshold for showing dropdown
      const isArts = isArtsTalent(talent.id);
      const tierThreshold = isArts ? 2 : 1;

      if (talent.tier >= tierThreshold) {
        // Show it immediately (animate in)
        setIsAnimatingOut(false);
        setShowSubclass(true);
      } else if (talent.tier < tierThreshold) {
        // Hide it (animate out)
        setIsAnimatingOut(true);
        const timer = setTimeout(() => {
          setShowSubclass(false);
          setIsAnimatingOut(false);
        }, 400); // Match animation duration
        return () => clearTimeout(timer);
      }
    }
  }, [talent.tier, talent.subclassOptions, talent.bonusTierOptions, talent.id]);

  const handleSubjectChange = (e) => {
    setLocalSubject(e.target.value);
  };

  const saveChanges = React.useCallback(() => {
    const trimmedSubject = localSubject.trim();
    // Don't save if subject is empty - revert to original
    if (!trimmedSubject) {
      setLocalSubject(parts.subject);
      return;
    }
    const newName = `${parts.prefix} ${trimmedSubject}`;
    if (newName !== talent.name) {
      updateTalentName(category, talent.id, newName);
    }
  }, [localSubject, parts.prefix, parts.subject, talent.name, talent.id, category, updateTalentName]);

  const handleBlur = () => {
    saveChanges();
  };

  const handleKeyDown = React.useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveChanges();
      e.target.blur();
    }
  }, [saveChanges]);

  const handleDecreaseClick = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    updateTalent(category, talent.id, -1);
  }, [category, talent.id, updateTalent]);

  const handleIncreaseClick = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    updateTalent(category, talent.id, 1);
  }, [category, talent.id, updateTalent]);

  // Generate error message for tooltip
  const getErrorMessage = () => {
    if (hasMysticError) {
      return ERROR_MESSAGES.MULTIPLE_MYSTICS;
    }
    if (hasCurseError) {
      return ERROR_MESSAGES.MULTIPLE_CURSES;
    }
    if (hasTier3Error) {
      return ERROR_MESSAGES.MULTIPLE_TIER3;
    }
    return "";
  };

  return (
    <div className={`skill-row ${hasAnyError ? 'error' : ''} ${talent.tier > 0 ? 'active' : ''} ${dropdownOpen ? 'dropdown-open' : ''}`}>
      <div className="skill-name-container">
        <div className="skill-name">
          {talent.editable ? (
            <>
              <span>{parts.prefix} </span>
              <input
                type="text"
                value={localSubject}
                onChange={handleSubjectChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="skill-name-input"
                placeholder={talent.placeholder ? talent.placeholder.replace(/^(The Arts|Academics)\s+/, '') : "Enter subject"}
              />
            </>
          ) : (
            <span>{talent.name}</span>
          )}
          {cost > 1 && <span className="skill-cost">({cost} pts)</span>}
        </div>
        {(talent.bonusTierOptions || talent.subclassOptions) && showSubclass && (
          <div className={`skill-subclass-wrapper ${isAnimatingOut ? 'animating-out' : ''}`}>
            <span className="skill-subclass-arrow">└</span>
            <select
              value={talent.bonusTierOptions ? (talent.bonusTier || '') : (talent.subclass || '')}
              onChange={handleSubclassChange}
              onClick={() => setDropdownOpen(prev => !prev)}
              onBlur={() => setDropdownOpen(false)}
              className="skill-subclass-select"
            >
              <option value="">{talent.bonusTierPrompt || talent.subclassPrompt || 'Select...'}</option>
              {academicsSkills ? (
                // For The Arts: use actual Academics skill names
                academicsSkills.map(acadSkill => {
                  // Check if skill is at default name
                  const isDefault = acadSkill.name === 'Academics' || acadSkill.name === '';

                  // If default, show full placeholder like "Academics Subject 1" or "Academics Subject 2"
                  // Otherwise show the custom name
                  let displayName;
                  if (isDefault && acadSkill.placeholder) {
                    // For academics-1, placeholder is "Subject 1", prepend "Academics "
                    // For academics-2, placeholder is already "Academics Subject 2"
                    displayName = acadSkill.placeholder.startsWith('Academics')
                      ? acadSkill.placeholder
                      : `Academics ${acadSkill.placeholder}`;
                  } else {
                    displayName = acadSkill.name;
                  }

                  return (
                    <option key={acadSkill.id} value={acadSkill.id}>
                      {displayName}
                    </option>
                  );
                })
              ) : (
                // For other talents: use hardcoded options
                (talent.bonusTierOptions || talent.subclassOptions).map(option => (
                  <option key={option} value={option}>{option}</option>
                ))
              )}
            </select>
          </div>
        )}
      </div>
      {hasAnyError && (
        <div className="skill-error-tooltip">
          {getErrorMessage()}
        </div>
      )}

      <div className="skill-controls">
        <div className={`skill-tier ${displayTier > 0 ? 'has-points' : ''}`}>
          <span className="tier-label">Tier</span>
          <span className="tier-value">{displayTier}</span>
          {freeTiers > 0 && (
            <div className="skill-tier-tooltip">
              <div className="tooltip-row"><strong>Free Tier From:</strong></div>
              {freeTiersSources.map((source, idx) => (
                <div key={idx} className="tooltip-row">
                  • {source.talentName} T{source.thresholdTier}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleDecreaseClick}
          disabled={talent.tier === 0 || isWarfareGranted || talent.tier <= artsGrantedCount}
          className="skill-btn"
          aria-label="Decrease"
        >
          {React.createElement(ICON_MAP['Minus'], { size: 16 })}
        </button>

        <button
          type="button"
          onClick={handleIncreaseClick}
          disabled={talent.tier === 3 || !canAffordIncrease || isBlockedByMysticLimit || isBlockedByCurseLimit}
          className="skill-btn"
          aria-label="Increase"
        >
          {React.createElement(ICON_MAP['Plus'], { size: 16 })}
        </button>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for React.memo
  // Return true if props are equal (don't re-render)
  // Return false if props are different (do re-render)

  // Compare academicsSkills
  const academicsEqual = (!prevProps.academicsSkills && !nextProps.academicsSkills) ||
    (prevProps.academicsSkills && nextProps.academicsSkills &&
     prevProps.academicsSkills.length === nextProps.academicsSkills.length &&
     prevProps.academicsSkills.every((skill, i) =>
       skill.id === nextProps.academicsSkills[i].id &&
       skill.name === nextProps.academicsSkills[i].name
     ));

  // Compare freeTiersSources
  const freeTiersSourcesEqual = (!prevProps.freeTiersSources && !nextProps.freeTiersSources) ||
    (prevProps.freeTiersSources && nextProps.freeTiersSources &&
     prevProps.freeTiersSources.length === nextProps.freeTiersSources.length &&
     prevProps.freeTiersSources.every((source, i) =>
       source.talentName === nextProps.freeTiersSources[i].talentName &&
       source.talentTier === nextProps.freeTiersSources[i].talentTier &&
       source.thresholdTier === nextProps.freeTiersSources[i].thresholdTier
     ));

  return (
    prevProps.talent.id === nextProps.talent.id &&
    prevProps.talent.name === nextProps.talent.name &&
    prevProps.talent.tier === nextProps.talent.tier &&
    prevProps.talent.cost === nextProps.talent.cost &&
    prevProps.talent.editable === nextProps.talent.editable &&
    prevProps.talent.placeholder === nextProps.talent.placeholder &&
    prevProps.talent.subclass === nextProps.talent.subclass &&
    prevProps.talent.bonusTier === nextProps.talent.bonusTier &&
    prevProps.freeTiers === nextProps.freeTiers &&
    prevProps.displayTier === nextProps.displayTier &&
    prevProps.category === nextProps.category &&
    prevProps.tier3Count === nextProps.tier3Count &&
    prevProps.canAffordIncrease === nextProps.canAffordIncrease &&
    prevProps.virtuoso === nextProps.virtuoso &&
    prevProps.hasMysticsError === nextProps.hasMysticsError &&
    prevProps.hasCursesError === nextProps.hasCursesError &&
    prevProps.mysticsWithTiersCount === nextProps.mysticsWithTiersCount &&
    prevProps.cursesWithTiersCount === nextProps.cursesWithTiersCount &&
    prevProps.isWarfareGranted === nextProps.isWarfareGranted &&
    prevProps.artsGrantedCount === nextProps.artsGrantedCount &&
    prevProps.updateTalent === nextProps.updateTalent &&
    prevProps.updateTalentName === nextProps.updateTalentName &&
    prevProps.updateTalentSubclass === nextProps.updateTalentSubclass &&
    prevProps.setTalents === nextProps.setTalents &&
    academicsEqual &&
    freeTiersSourcesEqual
  );
});

export default TalentRow;

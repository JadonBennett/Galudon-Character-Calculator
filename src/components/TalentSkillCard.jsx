import React from 'react';
import { ICON_MAP } from '../config/attributes';

// TalentSkillCard - Displays individual skill with talent source
const TalentSkillCard = ({ skill, talentName, tier, isExpanded, onToggle, showTierIndicator = false, isCurse = false }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onToggle();
  };

  // Generate tier prefix: Novice/Adept/Master
  const getTierPrefix = (tier) => {
    switch(tier) {
      case 1: return 'Novice';
      case 2: return 'Adept';
      case 3: return 'Master';
      default: return '';
    }
  };

  const displayName = showTierIndicator ? `${getTierPrefix(tier)} ${skill.name}` : skill.name;
  const sourceText = isCurse ? `From: ${talentName} Curse` : `From: ${talentName} T${tier}`;

  return (
    <div className="skill-ability-card">
      <div className="skill-ability-header" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <div className="skill-ability-main">
          <div className="skill-ability-name">
            {displayName}
          </div>
          <div className="skill-ability-source">{sourceText}</div>
        </div>
        <div className="skill-expand-icon">
          {isExpanded ? React.createElement(ICON_MAP['ChevronUp'], { size: 20 }) : React.createElement(ICON_MAP['ChevronDown'], { size: 20 })}
        </div>
      </div>

      {isExpanded && (
        <div className="skill-ability-content">
          <div className="skill-ability-description">{skill.description}</div>

          <div className="skill-ability-meta">
            {skill.actionType && (
              <div className="skill-ability-meta-item">
                <strong>Action Type:</strong> {skill.actionType}
              </div>
            )}
            {skill.cooldown && (
              <div className="skill-ability-meta-item">
                <strong>Cooldown:</strong> {skill.cooldown}
              </div>
            )}
          </div>

          {skill.link && (
            <div className="skill-ability-source-link">
              <a href={skill.link} target="_blank" rel="noopener noreferrer">
                Source
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TalentSkillCard;

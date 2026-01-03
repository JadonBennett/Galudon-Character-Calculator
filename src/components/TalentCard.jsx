import React from 'react';

// TalentCard - Simple display of talent name and tier
const TalentCard = React.memo(({ skill, freeTiers }) => {
  const totalTier = skill.tier + (freeTiers?.count || 0);

  return (
    <div className="talent-card">
      <div className="talent-name">
        {skill.name}
        {skill.bonusTier && <span className="talent-subclass"> - {skill.bonusTier}</span>}
        {skill.subclass && <span className="talent-subclass"> - {skill.subclass}</span>}
      </div>
      <div className="talent-tier">
        <div className="tier-dots">
          {[1, 2, 3].map(i => (
            <span
              key={i}
              className={`dot ${i <= totalTier ? 'filled' : ''}`}
            />
          ))}
        </div>
        <span className="tier-text">Tier {totalTier}</span>
      </div>
    </div>
  );
});

export default TalentCard;

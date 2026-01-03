import React from 'react';

// StatTooltip - Reusable tooltip for attribute breakdowns
const StatTooltip = React.memo(({ breakdown, wieldingText = null, lichCapText = null }) => (
  <div className="section-tooltip">
    <div className="tooltip-row">Base: {breakdown.base}</div>
    {breakdown.talentDetails && breakdown.talentDetails.length > 0 && (
      <>
        <div className="tooltip-row">From Talents: +{breakdown.fromTalents}</div>
        {breakdown.talentDetails.map((detail, i) => (
          <div key={i} className="tooltip-subrow">
            • {detail.name}, T{detail.tier}: +{detail.bonus}
          </div>
        ))}
      </>
    )}
    {breakdown.abilityBonuses > 0 && (
      <>
        <div className="tooltip-row">Ability Bonuses: +{breakdown.abilityBonuses}</div>
        {breakdown.abilityDetails && breakdown.abilityDetails.map((detail, i) => (
          <div key={i} className="tooltip-subrow">
            • {detail.name}, T{detail.tier}: +{detail.bonus}
          </div>
        ))}
      </>
    )}
    {wieldingText && breakdown.wielding > 0 && (
      <div className="tooltip-row">{wieldingText}: +{breakdown.wielding}</div>
    )}
    {lichCapText && (
      <div className="tooltip-row tooltip-warning">{lichCapText}</div>
    )}
    {breakdown.capped && (
      <div className="tooltip-row tooltip-warning">
        Capped at {breakdown.lichCap || breakdown.cap || 20}
      </div>
    )}
  </div>
));

export default StatTooltip;

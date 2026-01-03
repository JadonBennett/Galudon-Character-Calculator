import React from 'react';
import { ATTRIBUTES } from '../config/attributes';
import StatTooltip from './StatTooltip';

// StatCard - Reusable stat card for reference sheet
const StatCard = React.memo(({ attributeKey, total, breakdown, wieldingText = null, lichCapText = null }) => {
  const config = ATTRIBUTES[attributeKey];

  return (
    <div className={`stat-card stat-card-${attributeKey}`}>
      <div className="stat-label">{config.label}</div>
      <div className="stat-value">{total}</div>
      <div className="stat-tooltip">
        <StatTooltip
          breakdown={breakdown}
          wieldingText={wieldingText}
          lichCapText={lichCapText}
        />
      </div>
    </div>
  );
});

export default StatCard;

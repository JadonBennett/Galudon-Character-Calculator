import React from 'react';

// SimpleTooltip - Reusable tooltip for simple text content
const SimpleTooltip = React.memo(({ content, children }) => (
  <div className="tooltip-container">
    {children}
    <div className="simple-tooltip">{content}</div>
  </div>
));

export default SimpleTooltip;

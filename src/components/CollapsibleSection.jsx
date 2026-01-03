import React from 'react';
import { ICON_MAP } from '../config/attributes';

// CollapsibleSection - Reusable collapsible section for reference sheet
const CollapsibleSection = React.memo(({ title, isCollapsed, onToggle, children, count, icon, displayValue, displayValueLabel, onDisplayValueChange, customClassName }) => {
  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`collapsible-section ${customClassName || ''}`}>
      <div className="collapsible-header" onClick={onToggle}>
        <h3 className="collapsible-title">
          {icon && <span className="collapsible-icon">{icon}</span>}
          {title}
          {count !== undefined && <span className="section-count"> ({count})</span>}
        </h3>
        <div className="collapsible-header-right">
          {displayValue !== undefined && onDisplayValueChange && (
            <div className="collapsible-display-value" onClick={handleInputClick}>
              {displayValueLabel && <label className="collapsible-input-label">{displayValueLabel}</label>}
              <input
                type="text"
                value={displayValue}
                onChange={onDisplayValueChange}
                onClick={handleInputClick}
                placeholder="Enter name"
                className="collapsible-input"
              />
            </div>
          )}
          <div className="collapse-icon">
            {isCollapsed ? React.createElement(ICON_MAP['ChevronDown'], { size: 24 }) : React.createElement(ICON_MAP['ChevronUp'], { size: 24 })}
          </div>
        </div>
      </div>
      {!isCollapsed && (
        <div className="collapsible-content">
          {children}
        </div>
      )}
    </div>
  );
});

export default CollapsibleSection;

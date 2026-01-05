import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ATTRIBUTES, ICON_MAP } from '../config/attributes';
import { BASE_POINTS } from '../config/talents';

/**
 * Navigation component - Unified menu bar with page tabs and section navigation
 * @param {Object} stats - Character stats object (for points display)
 * @param {number} extraPoints - Extra points from settings
 * @param {Function} scrollToSection - Function to scroll to a section
 * @param {Function} resetToDefaults - Function to reset all character data
 */
export const Navigation = ({ stats, extraPoints, scrollToSection, resetToDefaults }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="unified-menu">
      <div className="unified-menu-content">
        <Link
          to="/"
          className={`unified-menu-tab ${currentPath === '/' ? 'active' : ''}`}
          aria-label="View character sheet"
          aria-current={currentPath === '/' ? 'page' : undefined}
        >
          CHARACTER SHEET
        </Link>
        <Link
          to="/reference"
          className={`unified-menu-tab ${currentPath === '/reference' ? 'active' : ''}`}
          aria-label="View reference sheet"
          aria-current={currentPath === '/reference' ? 'page' : undefined}
        >
          REFERENCE SHEET
        </Link>

        <div className="unified-menu-divider"></div>

        {/* Section navigation - always rendered to maintain button positions, but hidden on non-character pages */}
        <div className={currentPath !== '/' ? 'unified-menu-section-spacer' : ''}>
          <button
            onClick={() => currentPath === '/' && scrollToSection('section-character-info')}
            className="unified-menu-btn"
            aria-label="Jump to Character Information section"
            disabled={currentPath !== '/'}
          >
            {React.createElement(ICON_MAP['BookOpen'], { size: 18 })}
            INFO
          </button>
          {Object.keys(ATTRIBUTES).map(key => {
            const config = ATTRIBUTES[key];
            const IconComponent = ICON_MAP[config.icon];

            return (
              <button
                key={key}
                onClick={() => currentPath === '/' && scrollToSection(config.sectionId)}
                className="unified-menu-btn"
                aria-label={`Jump to ${config.label} section`}
                disabled={currentPath !== '/'}
              >
                <IconComponent size={18} />
                {config.abbreviation}
              </button>
            );
          })}
          <div className="unified-menu-divider"></div>
          <div className="unified-menu-points">
            <span className="unified-points-label">Points:</span>
            <span className={`unified-points-value ${stats.remaining < 0 ? 'negative' : ''}`}>
              {stats.remaining}/{BASE_POINTS + extraPoints}
            </span>
          </div>
        </div>

        <div className="unified-menu-divider"></div>
        <button
          onClick={resetToDefaults}
          className="unified-menu-btn reset-btn-menu"
          aria-label="Reset to default values"
          title="Reset all skills, weapons, and settings to default values"
        >
          {React.createElement(ICON_MAP['AlertCircle'], { size: 18 })}
          RESET
        </button>
        <Link
          to="/settings"
          className={`unified-menu-tab ${currentPath === '/settings' ? 'active' : ''}`}
          aria-label="View settings"
          aria-current={currentPath === '/settings' ? 'page' : undefined}
        >
          {React.createElement(ICON_MAP['Settings'], { size: 18 })}
        </Link>
      </div>
    </nav>
  );
};

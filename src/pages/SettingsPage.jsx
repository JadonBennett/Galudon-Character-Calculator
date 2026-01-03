import React from 'react';
import { ICON_MAP } from '../config/attributes';

const SettingsPage = ({
  extraPoints,
  setExtraPoints,
  virtuoso,
  setVirtuoso,
  resetToDefaults,
  exportCharacter,
  importCharacter
}) => {
  return (
    <div className="settings-sheet">
      <h1 className="sheet-title"> {React.createElement(ICON_MAP['Cog'], { size: 24 })} Settings {React.createElement(ICON_MAP['Cog'], { size: 24 })} </h1>

      <section className="settings-section">
        <h2 className="settings-section-title">⚙ SPECIAL PERMISSION SETTINGS ⚙</h2>

        <div className="settings-cards">
          <div className="points-card levelup-card">
            <div className="points-label">Level Up</div>
            <input
              type="number"
              className="levelup-input"
              value={extraPoints}
              onChange={(e) => setExtraPoints(Math.max(0, parseInt(e.target.value) || 0))}
              min="0"
              max="10"
            />
            <div className="settings-card-tooltip">
              <div className="tooltip-header">Level Up Points</div>
              <div className="tooltip-text">Add extra skill points beyond the base 8 points. This allows you to allocate additional tiers to your character's talents.</div>
            </div>
          </div>

          <div className="points-card virtuoso-card">
            <div className="points-label">Virtuoso</div>
            <label className="virtuoso-toggle">
              <input
                type="checkbox"
                checked={virtuoso}
                onChange={(e) => setVirtuoso(e.target.checked)}
              />
            </label>
            <div className="settings-card-tooltip">
              <div className="tooltip-header">Virtuoso Permission</div>
              <div className="tooltip-text">Enables your character to have multiple talents at Tier 3. Without this permission, you can only have one talent at maximum tier.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h2 className="settings-section-title">⚙ CHARACTER DATA MANAGEMENT ⚙</h2>

        <div className="data-management-section">
          <div className="data-management-card">
            <h3 className="data-card-title">Export Character</h3>
            <p className="data-card-description">
              Save your character build to a JSON file. You can import this file later to restore your character.
            </p>
            <button onClick={exportCharacter} className="data-btn export-btn">
              {React.createElement(ICON_MAP['ChevronDown'], { size: 20 })}
              Export Character
            </button>
          </div>

          <div className="data-management-card">
            <h3 className="data-card-title">Import Character</h3>
            <p className="data-card-description">
              Load a previously saved character build from a JSON file. This will replace your current character data.
            </p>
            <label className="data-btn import-btn">
              {React.createElement(ICON_MAP['ChevronUp'], { size: 20 })}
              Import Character
              <input
                type="file"
                accept=".json"
                onChange={importCharacter}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
      </section>

      <div className="reset-section">
        <button onClick={resetToDefaults} className="reset-btn">
          {React.createElement(ICON_MAP['AlertCircle'], { size: 24 })}
          Reset to Default Values
        </button>
        <p className="reset-warning">
          This will reset all skills, weapons, and settings to their default values. This action cannot be undone.
        </p>
      </div>

      {/* Copyright Footer */}
      <footer className="copyright-footer">
        <div className="copyright-content">
          <p>&copy; {new Date().getFullYear()} A Gears of Galudon Character Calculator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SettingsPage;

import React, { useState } from 'react';
import { ICON_MAP } from '../config/attributes';
import { CollapsibleSection } from '../components';

const SettingsPage = ({
  extraPoints,
  setExtraPoints,
  virtuoso,
  setVirtuoso,
  foreignNotorietyEnabled,
  setForeignNotorietyEnabled,
  foreignNotorietyName,
  setForeignNotorietyName,
  foreignNotorietyDescription,
  setForeignNotorietyDescription,
  customGrimoireEnabled,
  setCustomGrimoireEnabled,
  customGrimoireName,
  setCustomGrimoireName,
  customGrimoireSourceLink,
  setCustomGrimoireSourceLink,
  customGrimoireSpells,
  updateCustomGrimoireSpell,
  enhancedCurseEnabled,
  setEnhancedCurseEnabled,
  enhancedCurseName,
  setEnhancedCurseName,
  enhancedCurseSourceLink,
  setEnhancedCurseSourceLink,
  enhancedCurseAbilities,
  updateEnhancedCurseAbility,
  enhancedMartialEnabled,
  setEnhancedMartialEnabled,
  enhancedMartialName,
  setEnhancedMartialName,
  enhancedMartialSourceLink,
  setEnhancedMartialSourceLink,
  enhancedMartialAbilities,
  updateEnhancedMartialAbility,
  luminarchEnabled,
  setLuminarchEnabled,
  luminarchName,
  setLuminarchName,
  luminarchSourceLink,
  setLuminarchSourceLink,
  luminarchAbilities,
  updateLuminarchAbility,
  resetToDefaults,
  exportCharacter,
  importCharacter
}) => {
  const [notorietyPanelCollapsed, setNotorietyPanelCollapsed] = useState(false);
  const [grimoirePanelCollapsed, setGrimoirePanelCollapsed] = useState(false);
  const [enhancedCursePanelCollapsed, setEnhancedCursePanelCollapsed] = useState(false);
  const [enhancedMartialPanelCollapsed, setEnhancedMartialPanelCollapsed] = useState(false);
  const [luminarchPanelCollapsed, setLuminarchPanelCollapsed] = useState(false);
  const [tier1Collapsed, setTier1Collapsed] = useState(true);
  const [tier2Collapsed, setTier2Collapsed] = useState(true);
  const [tier3Collapsed, setTier3Collapsed] = useState(true);

  const handleGrimoireToggle = (checked) => {
    setCustomGrimoireEnabled(checked);
    if (checked) {
      // Automatically open the panel when checkbox is first checked
      setGrimoirePanelCollapsed(false);
    }
  };

  const handleEnhancedCurseToggle = (checked) => {
    setEnhancedCurseEnabled(checked);
    if (checked) {
      setEnhancedCursePanelCollapsed(false);
    }
  };

  const handleEnhancedMartialToggle = (checked) => {
    setEnhancedMartialEnabled(checked);
    if (checked) {
      setEnhancedMartialPanelCollapsed(false);
    }
  };

  const handleLuminarchToggle = (checked) => {
    setLuminarchEnabled(checked);
    if (checked) {
      setLuminarchPanelCollapsed(false);
    }
  };

  return (
    <div className="settings-sheet">
      <h1 className="sheet-title"> {React.createElement(ICON_MAP['Cog'], { size: 24 })} Settings {React.createElement(ICON_MAP['Cog'], { size: 24 })} </h1>

        {/* Character Data Management Header */}
        <h2 className="settings-section-title">⚙ CHARACTER DATA MANAGEMENT ⚙</h2>

        <section className="settings-section">
            <div className="data-management-section">
                <div className="data-management-card">
                    <h3 className="data-card-title">Export Character</h3>
                    <p className="data-card-description">
                        Save your character build. You can import this file later to restore your character.
                    </p>
                    <button onClick={exportCharacter} className="data-btn export-btn">
                        {React.createElement(ICON_MAP['ChevronDown'], { size: 20 })}
                        Export Character
                    </button>
                </div>

                <div className="data-management-card">
                    <h3 className="data-card-title">Import Character</h3>
                    <p className="data-card-description">
                        Load a previously saved character build. This will replace your current character data.
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

      {/* Special Permission Settings Header */}
      <h2 className="settings-section-title">⚙ SPECIAL PERMISSION SETTINGS ⚙</h2>

      <div className="settings-tiers-grid">
        {/* Tier 1 Permissions */}
        <CollapsibleSection
        title="Tier 1 Permissions"
        isCollapsed={tier1Collapsed}
        onToggle={() => setTier1Collapsed(!tier1Collapsed)}
        customClassName="settings-tier-section"
      >
        <div className="settings-cards">
          <div className="points-card notoriety-card">
            <div className="points-label">Foreign Notoriety</div>
            <label className="checkbox-toggle">
              <input
                type="checkbox"
                checked={foreignNotorietyEnabled}
                onChange={(e) => setForeignNotorietyEnabled(e.target.checked)}
              />
            </label>
            <div className="settings-card-tooltip">
              <div className="tooltip-header">Foreign Notoriety Permission</div>
              <div className="tooltip-text">Grants a custom passive ability that appears on your reference sheet. Use this for special character backgrounds or earned reputations.</div>
            </div>
          </div>
        </div>

        {/* Foreign Notoriety Information Panel */}
        {foreignNotorietyEnabled && (
          <CollapsibleSection
            title="Foreign Notoriety Information"
            isCollapsed={notorietyPanelCollapsed}
            onToggle={() => setNotorietyPanelCollapsed(!notorietyPanelCollapsed)}
            customClassName="settings-notoriety-panel"
          >
            <div className="notoriety-inputs">
              <input
                type="text"
                className="notoriety-text-input"
                placeholder="Type of Foreign Notoriety"
                value={foreignNotorietyName}
                onChange={(e) => setForeignNotorietyName(e.target.value)}
                maxLength="50"
              />
              <textarea
                className="notoriety-textarea-input"
                placeholder="Describe the effect of the foreign notoriety"
                value={foreignNotorietyDescription}
                onChange={(e) => setForeignNotorietyDescription(e.target.value)}
                maxLength="500"
                rows="6"
              />
            </div>
          </CollapsibleSection>
        )}
      </CollapsibleSection>

      {/* Tier 2 Permissions */}
      <CollapsibleSection
        title="Tier 2 Permissions"
        isCollapsed={tier2Collapsed}
        onToggle={() => setTier2Collapsed(!tier2Collapsed)}
        customClassName="settings-tier-section"
      >
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
            <label className="checkbox-toggle">
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

          <div className="points-card grimoire-card">
            <div className="points-label">Custom Magic Grimoire</div>
            <label className="checkbox-toggle">
              <input
                type="checkbox"
                checked={customGrimoireEnabled}
                onChange={(e) => handleGrimoireToggle(e.target.checked)}
              />
            </label>
            <div className="settings-card-tooltip">
              <div className="tooltip-header">Custom Magic Grimoire Permission</div>
              <div className="tooltip-text">Create up to 9 custom mystic spells (3 per tier) that appear in your Grimoire section on the reference sheet.</div>
            </div>
          </div>
        </div>

        {/* Custom Magic Grimoire Spell Inputs */}
        {customGrimoireEnabled && (
          <CollapsibleSection
            title="Custom Magic Grimoire Spells"
            isCollapsed={grimoirePanelCollapsed}
            onToggle={() => setGrimoirePanelCollapsed(!grimoirePanelCollapsed)}
            customClassName="settings-grimoire-panel"
          >
            <div className="grimoire-inputs">
              {/* Mystic Path Name Input */}
              <div className="grimoire-name-section">
                <input
                  type="text"
                  className="grimoire-name-input"
                  placeholder="Mystic Path Name (e.g., Path of the Arcane)"
                  value={customGrimoireName}
                  onChange={(e) => setCustomGrimoireName(e.target.value)}
                  maxLength="100"
                />
              </div>

              {/* Source Link Input */}
              <div className="grimoire-source-section">
                <input
                  type="text"
                  className="grimoire-source-input"
                  placeholder="Source Link (Link to your Spec Perm Document)"
                  value={customGrimoireSourceLink}
                  onChange={(e) => setCustomGrimoireSourceLink(e.target.value)}
                />
              </div>

              {/* Tier 1 Spells */}
              <div className="grimoire-tier-section">
                <h4 className="grimoire-tier-title">Tier 1 Spells</h4>
                {[0, 1, 2].map(spellIndex => (
                  <div key={`t1-${spellIndex}`} className="grimoire-spell-inputs">
                    <div className="grimoire-spell-header">
                      <input
                        type="text"
                        className="grimoire-spell-name"
                        placeholder={`Spell ${spellIndex + 1} Name`}
                        value={customGrimoireSpells[1][spellIndex].name}
                        onChange={(e) => updateCustomGrimoireSpell(1, spellIndex, 'name', e.target.value)}
                        maxLength="100"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-cooldown"
                        placeholder="Cooldown"
                        value={customGrimoireSpells[1][spellIndex].cooldown}
                        onChange={(e) => updateCustomGrimoireSpell(1, spellIndex, 'cooldown', e.target.value)}
                        maxLength="50"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-actiontype"
                        placeholder="Action Type"
                        value={customGrimoireSpells[1][spellIndex].actionType}
                        onChange={(e) => updateCustomGrimoireSpell(1, spellIndex, 'actionType', e.target.value)}
                        maxLength="50"
                      />
                    </div>
                    <textarea
                      className="grimoire-spell-description"
                      placeholder="Description"
                      value={customGrimoireSpells[1][spellIndex].description}
                      onChange={(e) => updateCustomGrimoireSpell(1, spellIndex, 'description', e.target.value)}
                      maxLength="500"
                      rows="3"
                    />
                  </div>
                ))}
              </div>

              {/* Tier 2 Spells */}
              <div className="grimoire-tier-section">
                <h4 className="grimoire-tier-title">Tier 2 Spells</h4>
                {[0, 1, 2].map(spellIndex => (
                  <div key={`t2-${spellIndex}`} className="grimoire-spell-inputs">
                    <div className="grimoire-spell-header">
                      <input
                        type="text"
                        className="grimoire-spell-name"
                        placeholder={`Spell ${spellIndex + 1} Name`}
                        value={customGrimoireSpells[2][spellIndex].name}
                        onChange={(e) => updateCustomGrimoireSpell(2, spellIndex, 'name', e.target.value)}
                        maxLength="100"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-cooldown"
                        placeholder="Cooldown"
                        value={customGrimoireSpells[2][spellIndex].cooldown}
                        onChange={(e) => updateCustomGrimoireSpell(2, spellIndex, 'cooldown', e.target.value)}
                        maxLength="50"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-actiontype"
                        placeholder="Action Type"
                        value={customGrimoireSpells[2][spellIndex].actionType}
                        onChange={(e) => updateCustomGrimoireSpell(2, spellIndex, 'actionType', e.target.value)}
                        maxLength="50"
                      />
                    </div>
                    <textarea
                      className="grimoire-spell-description"
                      placeholder="Description"
                      value={customGrimoireSpells[2][spellIndex].description}
                      onChange={(e) => updateCustomGrimoireSpell(2, spellIndex, 'description', e.target.value)}
                      maxLength="500"
                      rows="3"
                    />
                  </div>
                ))}
              </div>

              {/* Tier 3 Spells */}
              <div className="grimoire-tier-section">
                <h4 className="grimoire-tier-title">Tier 3 Spells</h4>
                {[0, 1, 2].map(spellIndex => (
                  <div key={`t3-${spellIndex}`} className="grimoire-spell-inputs">
                    <div className="grimoire-spell-header">
                      <input
                        type="text"
                        className="grimoire-spell-name"
                        placeholder={`Spell ${spellIndex + 1} Name`}
                        value={customGrimoireSpells[3][spellIndex].name}
                        onChange={(e) => updateCustomGrimoireSpell(3, spellIndex, 'name', e.target.value)}
                        maxLength="100"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-cooldown"
                        placeholder="Cooldown"
                        value={customGrimoireSpells[3][spellIndex].cooldown}
                        onChange={(e) => updateCustomGrimoireSpell(3, spellIndex, 'cooldown', e.target.value)}
                        maxLength="50"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-actiontype"
                        placeholder="Action Type"
                        value={customGrimoireSpells[3][spellIndex].actionType}
                        onChange={(e) => updateCustomGrimoireSpell(3, spellIndex, 'actionType', e.target.value)}
                        maxLength="50"
                      />
                    </div>
                    <textarea
                      className="grimoire-spell-description"
                      placeholder="Description"
                      value={customGrimoireSpells[3][spellIndex].description}
                      onChange={(e) => updateCustomGrimoireSpell(3, spellIndex, 'description', e.target.value)}
                      maxLength="500"
                      rows="3"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleSection>
        )}
      </CollapsibleSection>

      {/* Tier 3 Permissions */}
      <CollapsibleSection
        title="Tier 3 Permissions"
        isCollapsed={tier3Collapsed}
        onToggle={() => setTier3Collapsed(!tier3Collapsed)}
        customClassName="settings-tier-section"
      >
        <div className="settings-cards">
          <div className="points-card grimoire-card">
            <div className="points-label">Enhanced Curse</div>
            <label className="checkbox-toggle">
              <input
                type="checkbox"
                checked={enhancedCurseEnabled}
                onChange={(e) => handleEnhancedCurseToggle(e.target.checked)}
              />
            </label>
            <div className="settings-card-tooltip">
              <div className="tooltip-header">Enhanced Curse Permission</div>
              <div className="tooltip-text">Create up to 9 custom curse abilities (3 per tier) that appear in your Curses section on the reference sheet.</div>
            </div>
          </div>

          <div className="points-card grimoire-card">
            <div className="points-label">Enhanced Martial</div>
            <label className="checkbox-toggle">
              <input
                type="checkbox"
                checked={enhancedMartialEnabled}
                onChange={(e) => handleEnhancedMartialToggle(e.target.checked)}
              />
            </label>
            <div className="settings-card-tooltip">
              <div className="tooltip-header">Enhanced Martial Permission</div>
              <div className="tooltip-text">Create up to 9 custom martial abilities (3 per tier) that appear in your Martial Abilities section on the reference sheet.</div>
            </div>
          </div>

          <div className="points-card grimoire-card">
            <div className="points-label">Luminarch</div>
            <label className="checkbox-toggle">
              <input
                type="checkbox"
                checked={luminarchEnabled}
                onChange={(e) => handleLuminarchToggle(e.target.checked)}
              />
            </label>
            <div className="settings-card-tooltip">
              <div className="tooltip-header">Luminarch Permission</div>
              <div className="tooltip-text">Create up to 9 custom luminarch abilities (3 per tier) that appear in your Luminarch section on the reference sheet.</div>
            </div>
          </div>
        </div>

        {/* Enhanced Curse Abilities Panel */}
        {enhancedCurseEnabled && (
          <CollapsibleSection
            title="Enhanced Curse Abilities"
            isCollapsed={enhancedCursePanelCollapsed}
            onToggle={() => setEnhancedCursePanelCollapsed(!enhancedCursePanelCollapsed)}
            customClassName="settings-grimoire-panel"
          >
            <div className="grimoire-inputs">
              <div className="grimoire-name-section">
                <input
                  type="text"
                  className="grimoire-name-input"
                  placeholder="Enhanced Curse Name (e.g., Curse of the Void)"
                  value={enhancedCurseName}
                  onChange={(e) => setEnhancedCurseName(e.target.value)}
                  maxLength="100"
                />
              </div>

              <div className="grimoire-source-section">
                <input
                  type="text"
                  className="grimoire-source-input"
                  placeholder="Source Link (Link to your Spec Perm Document)"
                  value={enhancedCurseSourceLink}
                  onChange={(e) => setEnhancedCurseSourceLink(e.target.value)}
                />
              </div>

              {/* Tier 1 Abilities */}
              <div className="grimoire-tier-section">
                <h4 className="grimoire-tier-title">Tier 1 Abilities</h4>
                {[0, 1, 2].map(abilityIndex => (
                  <div key={`ec-t1-${abilityIndex}`} className="grimoire-spell-inputs">
                    <div className="grimoire-spell-header">
                      <input
                        type="text"
                        className="grimoire-spell-name"
                        placeholder={`Ability ${abilityIndex + 1} Name`}
                        value={enhancedCurseAbilities[1][abilityIndex].name}
                        onChange={(e) => updateEnhancedCurseAbility(1, abilityIndex, 'name', e.target.value)}
                        maxLength="100"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-cooldown"
                        placeholder="Cooldown"
                        value={enhancedCurseAbilities[1][abilityIndex].cooldown}
                        onChange={(e) => updateEnhancedCurseAbility(1, abilityIndex, 'cooldown', e.target.value)}
                        maxLength="50"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-actiontype"
                        placeholder="Action Type"
                        value={enhancedCurseAbilities[1][abilityIndex].actionType}
                        onChange={(e) => updateEnhancedCurseAbility(1, abilityIndex, 'actionType', e.target.value)}
                        maxLength="50"
                      />
                    </div>
                    <textarea
                      className="grimoire-spell-description"
                      placeholder="Description"
                      value={enhancedCurseAbilities[1][abilityIndex].description}
                      onChange={(e) => updateEnhancedCurseAbility(1, abilityIndex, 'description', e.target.value)}
                      maxLength="500"
                      rows="3"
                    />
                  </div>
                ))}
              </div>

              {/* Tier 2 Abilities */}
              <div className="grimoire-tier-section">
                <h4 className="grimoire-tier-title">Tier 2 Abilities</h4>
                {[0, 1, 2].map(abilityIndex => (
                  <div key={`ec-t2-${abilityIndex}`} className="grimoire-spell-inputs">
                    <div className="grimoire-spell-header">
                      <input
                        type="text"
                        className="grimoire-spell-name"
                        placeholder={`Ability ${abilityIndex + 1} Name`}
                        value={enhancedCurseAbilities[2][abilityIndex].name}
                        onChange={(e) => updateEnhancedCurseAbility(2, abilityIndex, 'name', e.target.value)}
                        maxLength="100"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-cooldown"
                        placeholder="Cooldown"
                        value={enhancedCurseAbilities[2][abilityIndex].cooldown}
                        onChange={(e) => updateEnhancedCurseAbility(2, abilityIndex, 'cooldown', e.target.value)}
                        maxLength="50"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-actiontype"
                        placeholder="Action Type"
                        value={enhancedCurseAbilities[2][abilityIndex].actionType}
                        onChange={(e) => updateEnhancedCurseAbility(2, abilityIndex, 'actionType', e.target.value)}
                        maxLength="50"
                      />
                    </div>
                    <textarea
                      className="grimoire-spell-description"
                      placeholder="Description"
                      value={enhancedCurseAbilities[2][abilityIndex].description}
                      onChange={(e) => updateEnhancedCurseAbility(2, abilityIndex, 'description', e.target.value)}
                      maxLength="500"
                      rows="3"
                    />
                  </div>
                ))}
              </div>

              {/* Tier 3 Abilities */}
              <div className="grimoire-tier-section">
                <h4 className="grimoire-tier-title">Tier 3 Abilities</h4>
                {[0, 1, 2].map(abilityIndex => (
                  <div key={`ec-t3-${abilityIndex}`} className="grimoire-spell-inputs">
                    <div className="grimoire-spell-header">
                      <input
                        type="text"
                        className="grimoire-spell-name"
                        placeholder={`Ability ${abilityIndex + 1} Name`}
                        value={enhancedCurseAbilities[3][abilityIndex].name}
                        onChange={(e) => updateEnhancedCurseAbility(3, abilityIndex, 'name', e.target.value)}
                        maxLength="100"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-cooldown"
                        placeholder="Cooldown"
                        value={enhancedCurseAbilities[3][abilityIndex].cooldown}
                        onChange={(e) => updateEnhancedCurseAbility(3, abilityIndex, 'cooldown', e.target.value)}
                        maxLength="50"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-actiontype"
                        placeholder="Action Type"
                        value={enhancedCurseAbilities[3][abilityIndex].actionType}
                        onChange={(e) => updateEnhancedCurseAbility(3, abilityIndex, 'actionType', e.target.value)}
                        maxLength="50"
                      />
                    </div>
                    <textarea
                      className="grimoire-spell-description"
                      placeholder="Description"
                      value={enhancedCurseAbilities[3][abilityIndex].description}
                      onChange={(e) => updateEnhancedCurseAbility(3, abilityIndex, 'description', e.target.value)}
                      maxLength="500"
                      rows="3"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleSection>
        )}

        {/* Enhanced Martial Abilities Panel */}
        {enhancedMartialEnabled && (
          <CollapsibleSection
            title="Enhanced Martial Abilities"
            isCollapsed={enhancedMartialPanelCollapsed}
            onToggle={() => setEnhancedMartialPanelCollapsed(!enhancedMartialPanelCollapsed)}
            customClassName="settings-grimoire-panel"
          >
            <div className="grimoire-inputs">
              <div className="grimoire-name-section">
                <input
                  type="text"
                  className="grimoire-name-input"
                  placeholder="Enhanced Martial Name (e.g., Path of the Bladedancer)"
                  value={enhancedMartialName}
                  onChange={(e) => setEnhancedMartialName(e.target.value)}
                  maxLength="100"
                />
              </div>

              <div className="grimoire-source-section">
                <input
                  type="text"
                  className="grimoire-source-input"
                  placeholder="Source Link (Link to your Spec Perm Document)"
                  value={enhancedMartialSourceLink}
                  onChange={(e) => setEnhancedMartialSourceLink(e.target.value)}
                />
              </div>

              {/* Tier 1 Abilities */}
              <div className="grimoire-tier-section">
                <h4 className="grimoire-tier-title">Tier 1 Abilities</h4>
                {[0, 1, 2].map(abilityIndex => (
                  <div key={`em-t1-${abilityIndex}`} className="grimoire-spell-inputs">
                    <div className="grimoire-spell-header">
                      <input
                        type="text"
                        className="grimoire-spell-name"
                        placeholder={`Ability ${abilityIndex + 1} Name`}
                        value={enhancedMartialAbilities[1][abilityIndex].name}
                        onChange={(e) => updateEnhancedMartialAbility(1, abilityIndex, 'name', e.target.value)}
                        maxLength="100"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-cooldown"
                        placeholder="Cooldown"
                        value={enhancedMartialAbilities[1][abilityIndex].cooldown}
                        onChange={(e) => updateEnhancedMartialAbility(1, abilityIndex, 'cooldown', e.target.value)}
                        maxLength="50"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-actiontype"
                        placeholder="Action Type"
                        value={enhancedMartialAbilities[1][abilityIndex].actionType}
                        onChange={(e) => updateEnhancedMartialAbility(1, abilityIndex, 'actionType', e.target.value)}
                        maxLength="50"
                      />
                    </div>
                    <textarea
                      className="grimoire-spell-description"
                      placeholder="Description"
                      value={enhancedMartialAbilities[1][abilityIndex].description}
                      onChange={(e) => updateEnhancedMartialAbility(1, abilityIndex, 'description', e.target.value)}
                      maxLength="500"
                      rows="3"
                    />
                  </div>
                ))}
              </div>

              {/* Tier 2 Abilities */}
              <div className="grimoire-tier-section">
                <h4 className="grimoire-tier-title">Tier 2 Abilities</h4>
                {[0, 1, 2].map(abilityIndex => (
                  <div key={`em-t2-${abilityIndex}`} className="grimoire-spell-inputs">
                    <div className="grimoire-spell-header">
                      <input
                        type="text"
                        className="grimoire-spell-name"
                        placeholder={`Ability ${abilityIndex + 1} Name`}
                        value={enhancedMartialAbilities[2][abilityIndex].name}
                        onChange={(e) => updateEnhancedMartialAbility(2, abilityIndex, 'name', e.target.value)}
                        maxLength="100"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-cooldown"
                        placeholder="Cooldown"
                        value={enhancedMartialAbilities[2][abilityIndex].cooldown}
                        onChange={(e) => updateEnhancedMartialAbility(2, abilityIndex, 'cooldown', e.target.value)}
                        maxLength="50"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-actiontype"
                        placeholder="Action Type"
                        value={enhancedMartialAbilities[2][abilityIndex].actionType}
                        onChange={(e) => updateEnhancedMartialAbility(2, abilityIndex, 'actionType', e.target.value)}
                        maxLength="50"
                      />
                    </div>
                    <textarea
                      className="grimoire-spell-description"
                      placeholder="Description"
                      value={enhancedMartialAbilities[2][abilityIndex].description}
                      onChange={(e) => updateEnhancedMartialAbility(2, abilityIndex, 'description', e.target.value)}
                      maxLength="500"
                      rows="3"
                    />
                  </div>
                ))}
              </div>

              {/* Tier 3 Abilities */}
              <div className="grimoire-tier-section">
                <h4 className="grimoire-tier-title">Tier 3 Abilities</h4>
                {[0, 1, 2].map(abilityIndex => (
                  <div key={`em-t3-${abilityIndex}`} className="grimoire-spell-inputs">
                    <div className="grimoire-spell-header">
                      <input
                        type="text"
                        className="grimoire-spell-name"
                        placeholder={`Ability ${abilityIndex + 1} Name`}
                        value={enhancedMartialAbilities[3][abilityIndex].name}
                        onChange={(e) => updateEnhancedMartialAbility(3, abilityIndex, 'name', e.target.value)}
                        maxLength="100"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-cooldown"
                        placeholder="Cooldown"
                        value={enhancedMartialAbilities[3][abilityIndex].cooldown}
                        onChange={(e) => updateEnhancedMartialAbility(3, abilityIndex, 'cooldown', e.target.value)}
                        maxLength="50"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-actiontype"
                        placeholder="Action Type"
                        value={enhancedMartialAbilities[3][abilityIndex].actionType}
                        onChange={(e) => updateEnhancedMartialAbility(3, abilityIndex, 'actionType', e.target.value)}
                        maxLength="50"
                      />
                    </div>
                    <textarea
                      className="grimoire-spell-description"
                      placeholder="Description"
                      value={enhancedMartialAbilities[3][abilityIndex].description}
                      onChange={(e) => updateEnhancedMartialAbility(3, abilityIndex, 'description', e.target.value)}
                      maxLength="500"
                      rows="3"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleSection>
        )}

        {/* Luminarch Abilities Panel */}
        {luminarchEnabled && (
          <CollapsibleSection
            title="Luminarch Abilities"
            isCollapsed={luminarchPanelCollapsed}
            onToggle={() => setLuminarchPanelCollapsed(!luminarchPanelCollapsed)}
            customClassName="settings-grimoire-panel"
          >
            <div className="grimoire-inputs">
              <div className="grimoire-name-section">
                <input
                  type="text"
                  className="grimoire-name-input"
                  placeholder="Luminarch Name (e.g., Lightbringer)"
                  value={luminarchName}
                  onChange={(e) => setLuminarchName(e.target.value)}
                  maxLength="100"
                />
              </div>

              <div className="grimoire-source-section">
                <input
                  type="text"
                  className="grimoire-source-input"
                  placeholder="Source Link (Link to your Spec Perm Document)"
                  value={luminarchSourceLink}
                  onChange={(e) => setLuminarchSourceLink(e.target.value)}
                />
              </div>

              {/* Tier 1 Abilities */}
              <div className="grimoire-tier-section">
                <h4 className="grimoire-tier-title">Tier 1 Abilities</h4>
                {[0, 1, 2].map(abilityIndex => (
                  <div key={`lum-t1-${abilityIndex}`} className="grimoire-spell-inputs">
                    <div className="grimoire-spell-header">
                      <input
                        type="text"
                        className="grimoire-spell-name"
                        placeholder={`Ability ${abilityIndex + 1} Name`}
                        value={luminarchAbilities[1][abilityIndex].name}
                        onChange={(e) => updateLuminarchAbility(1, abilityIndex, 'name', e.target.value)}
                        maxLength="100"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-cooldown"
                        placeholder="Cooldown"
                        value={luminarchAbilities[1][abilityIndex].cooldown}
                        onChange={(e) => updateLuminarchAbility(1, abilityIndex, 'cooldown', e.target.value)}
                        maxLength="50"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-actiontype"
                        placeholder="Action Type"
                        value={luminarchAbilities[1][abilityIndex].actionType}
                        onChange={(e) => updateLuminarchAbility(1, abilityIndex, 'actionType', e.target.value)}
                        maxLength="50"
                      />
                    </div>
                    <textarea
                      className="grimoire-spell-description"
                      placeholder="Description"
                      value={luminarchAbilities[1][abilityIndex].description}
                      onChange={(e) => updateLuminarchAbility(1, abilityIndex, 'description', e.target.value)}
                      maxLength="500"
                      rows="3"
                    />
                  </div>
                ))}
              </div>

              {/* Tier 2 Abilities */}
              <div className="grimoire-tier-section">
                <h4 className="grimoire-tier-title">Tier 2 Abilities</h4>
                {[0, 1, 2].map(abilityIndex => (
                  <div key={`lum-t2-${abilityIndex}`} className="grimoire-spell-inputs">
                    <div className="grimoire-spell-header">
                      <input
                        type="text"
                        className="grimoire-spell-name"
                        placeholder={`Ability ${abilityIndex + 1} Name`}
                        value={luminarchAbilities[2][abilityIndex].name}
                        onChange={(e) => updateLuminarchAbility(2, abilityIndex, 'name', e.target.value)}
                        maxLength="100"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-cooldown"
                        placeholder="Cooldown"
                        value={luminarchAbilities[2][abilityIndex].cooldown}
                        onChange={(e) => updateLuminarchAbility(2, abilityIndex, 'cooldown', e.target.value)}
                        maxLength="50"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-actiontype"
                        placeholder="Action Type"
                        value={luminarchAbilities[2][abilityIndex].actionType}
                        onChange={(e) => updateLuminarchAbility(2, abilityIndex, 'actionType', e.target.value)}
                        maxLength="50"
                      />
                    </div>
                    <textarea
                      className="grimoire-spell-description"
                      placeholder="Description"
                      value={luminarchAbilities[2][abilityIndex].description}
                      onChange={(e) => updateLuminarchAbility(2, abilityIndex, 'description', e.target.value)}
                      maxLength="500"
                      rows="3"
                    />
                  </div>
                ))}
              </div>

              {/* Tier 3 Abilities */}
              <div className="grimoire-tier-section">
                <h4 className="grimoire-tier-title">Tier 3 Abilities</h4>
                {[0, 1, 2].map(abilityIndex => (
                  <div key={`lum-t3-${abilityIndex}`} className="grimoire-spell-inputs">
                    <div className="grimoire-spell-header">
                      <input
                        type="text"
                        className="grimoire-spell-name"
                        placeholder={`Ability ${abilityIndex + 1} Name`}
                        value={luminarchAbilities[3][abilityIndex].name}
                        onChange={(e) => updateLuminarchAbility(3, abilityIndex, 'name', e.target.value)}
                        maxLength="100"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-cooldown"
                        placeholder="Cooldown"
                        value={luminarchAbilities[3][abilityIndex].cooldown}
                        onChange={(e) => updateLuminarchAbility(3, abilityIndex, 'cooldown', e.target.value)}
                        maxLength="50"
                      />
                      <input
                        type="text"
                        className="grimoire-spell-actiontype"
                        placeholder="Action Type"
                        value={luminarchAbilities[3][abilityIndex].actionType}
                        onChange={(e) => updateLuminarchAbility(3, abilityIndex, 'actionType', e.target.value)}
                        maxLength="50"
                      />
                    </div>
                    <textarea
                      className="grimoire-spell-description"
                      placeholder="Description"
                      value={luminarchAbilities[3][abilityIndex].description}
                      onChange={(e) => updateLuminarchAbility(3, abilityIndex, 'description', e.target.value)}
                      maxLength="500"
                      rows="3"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleSection>
        )}
      </CollapsibleSection>
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

import React from 'react';
import { ATTRIBUTES, ICON_MAP } from '../config/attributes';
import { CollapsibleSection, TalentSection } from '../components';

const CharacterSheet = ({
  talents,
  setTalents,
  stats,
  virtuoso,
  updateTalent,
  updateTalentName,
  updateTalentSubclass,
  collapsedSections,
  toggleSection,
  characterName,
  setCharacterName,
  race,
  setRace,
  age,
  setAge,
  pronouns,
  setPronouns,
  sexuality,
  setSexuality,
  hairColor,
  setHairColor,
  skinColor,
  setSkinColor,
  eyeColor,
  setEyeColor,
  height,
  setHeight,
  weight,
  setWeight,
  clothingDescription,
  setClothingDescription,
  geneticMutations,
  setGeneticMutations,
  prosthetics,
  setProsthetics,
  bodyMods,
  setBodyMods
}) => {
  return (
    <div className="character-sheet">
      {/* Validation Warnings */}
      {stats.hasError && (
        <div className="alert alert-error">
          {React.createElement(ICON_MAP['AlertCircle'], { size: 20 })}
          <div>
            <strong>Virtuoso Permission Required!</strong>
            <p>You have {stats.tier3Count} talents at Tier 3. Enable Virtuoso permission or reduce talents to max 1 at Tier 3.</p>
          </div>
        </div>
      )}

      {stats.remaining < 0 && (
        <div className="alert alert-error">
          {React.createElement(ICON_MAP['AlertCircle'], { size: 20 })}
          <div>
            <strong>Over Budget!</strong>
            <p>You've allocated {Math.abs(stats.remaining)} more points than available.</p>
          </div>
        </div>
      )}

      {/* Character Information Section - Collapsible */}
      <div className="char-info-section char-info-collapsible section-character-info">
        <CollapsibleSection
          title="⚙ CHARACTER INFORMATION ⚙"
          isCollapsed={collapsedSections.characterInfo}
          onToggle={() => toggleSection('characterInfo')}
          icon={React.createElement(ICON_MAP['BookOpen'], { size: 28 })}
          displayValue={characterName}
          displayValueLabel="Character Name"
          onDisplayValueChange={(e) => setCharacterName(e.target.value)}
        >
          <div className="char-info-content">
            {/* Character Bio Fields */}
            <div className="char-bio-section">
              <div className="char-sheet-field">
                <label className="char-field-label">Race</label>
                <input
                  type="text"
                  value={race}
                  onChange={(e) => setRace(e.target.value)}
                  placeholder="e.g., Human, Elf..."
                  className="char-sheet-input"
                />
              </div>
              <div className="char-sheet-field">
                <label className="char-field-label">Age</label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g., 25"
                  className="char-sheet-input"
                />
              </div>
              <div className="char-sheet-field">
                <label className="char-field-label">Pronouns</label>
                <input
                  type="text"
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)}
                  placeholder="e.g., they/them"
                  className="char-sheet-input"
                />
              </div>
              <div className="char-sheet-field">
                <label className="char-field-label">Sexuality</label>
                <input
                  type="text"
                  value={sexuality}
                  onChange={(e) => setSexuality(e.target.value)}
                  placeholder="e.g., Pansexual"
                  className="char-sheet-input"
                />
              </div>
              <div className="char-sheet-field">
                <label className="char-field-label">Hair Color</label>
                <input
                  type="text"
                  value={hairColor}
                  onChange={(e) => setHairColor(e.target.value)}
                  placeholder="e.g., Auburn"
                  className="char-sheet-input"
                />
              </div>
              <div className="char-sheet-field">
                <label className="char-field-label">Skin Color</label>
                <input
                  type="text"
                  value={skinColor}
                  onChange={(e) => setSkinColor(e.target.value)}
                  placeholder="e.g., Tan"
                  className="char-sheet-input"
                />
              </div>
              <div className="char-sheet-field">
                <label className="char-field-label">Eye Color</label>
                <input
                  type="text"
                  value={eyeColor}
                  onChange={(e) => setEyeColor(e.target.value)}
                  placeholder="e.g., Green"
                  className="char-sheet-input"
                />
              </div>
              <div className="char-sheet-field">
                <label className="char-field-label">Height</label>
                <input
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g., 5'8&quot;"
                  className="char-sheet-input"
                />
              </div>
              <div className="char-sheet-field">
                <label className="char-field-label">Weight</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g., 160 lbs"
                  className="char-sheet-input"
                />
              </div>
              <div className="char-sheet-field char-field-wide">
                <label className="char-field-label">Clothing Description</label>
                <textarea
                  value={clothingDescription}
                  onChange={(e) => setClothingDescription(e.target.value)}
                  placeholder="Describe typical attire..."
                  className="char-sheet-input char-sheet-textarea"
                />
              </div>
              <div className="char-sheet-field char-field-narrow">
                <label className="char-field-label">Genetic Mutations</label>
                <textarea
                  value={geneticMutations}
                  onChange={(e) => setGeneticMutations(e.target.value)}
                  placeholder="Any notable mutations..."
                  className="char-sheet-input char-sheet-textarea"
                />
              </div>
              <div className="char-sheet-field char-field-narrow">
                <label className="char-field-label">Prosthetics</label>
                <textarea
                  value={prosthetics}
                  onChange={(e) => setProsthetics(e.target.value)}
                  placeholder="Cybernetic or mechanical enhancements..."
                  className="char-sheet-input char-sheet-textarea"
                />
              </div>
              <div className="char-sheet-field char-field-narrow">
                <label className="char-field-label">Tattoos, Piercings, or Body Modifications</label>
                <textarea
                  value={bodyMods}
                  onChange={(e) => setBodyMods(e.target.value)}
                  placeholder="Describe any body modifications..."
                  className="char-sheet-input char-sheet-textarea"
                />
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </div>

      {/* Skill Sections */}
      {Object.keys(ATTRIBUTES).map(attributeKey => (
        <TalentSection
          key={attributeKey}
          attributeKey={attributeKey}
          talents={talents}
          stats={stats}
          updateTalent={updateTalent}
          updateTalentName={updateTalentName}
          updateTalentSubclass={updateTalentSubclass}
          virtuoso={virtuoso}
          setTalents={setTalents}
        />
      ))}

      {/* Copyright Footer */}
      <footer className="copyright-footer">
        <div className="copyright-content">
          <p>&copy; {new Date().getFullYear()} A Gears of Galudon Character Calculator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CharacterSheet;

import React, { useMemo } from 'react';
import { ICON_MAP } from '../config/attributes';
import { WEAPON_DAMAGE_PROGRESSION } from '../config/weaponData';
import { getTalentsByCategory } from '../utils/calculations';
import { calculateFreeTiers } from '../utils/freeTiers';
import { consolidateSkillsByName, aggregateSkillsFromTalents, getMultiTierSkillNames } from '../utils/skillHelpers';
import {
  StatCard,
  SimpleTooltip,
  CollapsibleSection,
  TalentCard,
  TalentSkillCard
} from '../components';

const ReferencePage = ({
  talents,
  stats,
  characterName,
  primaryWeapon,
  setPrimaryWeapon,
  secondaryWeapon,
  setSecondaryWeapon,
  wieldingFinesse,
  setWieldingFinesse,
  wieldingHeavy,
  setWieldingHeavy,
  foreignNotorietyEnabled,
  foreignNotorietyName,
  foreignNotorietyDescription,
  customGrimoireEnabled,
  customGrimoireName,
  customGrimoireSourceLink,
  customGrimoireSpells,
  collapsedSections,
  toggleSection,
  expandedSkills,
  toggleSkill
}) => {
  // Get set of skills that can appear at multiple tiers (for showing tier indicators)
  const multiTierSkillNames = useMemo(() => getMultiTierSkillNames(), []);

  // Calculate highest tier with custom grimoire spells
  const customGrimoireHighestTier = useMemo(() => {
    if (!customGrimoireEnabled || !customGrimoireName) return 0;
    for (let tier = 3; tier >= 1; tier--) {
      const hasSpell = customGrimoireSpells[tier].some(spell => spell.name && spell.name.trim() !== '');
      if (hasSpell) return tier;
    }
    return 0;
  }, [customGrimoireEnabled, customGrimoireName, customGrimoireSpells]);

  return (
    <div className="reference-sheet">
      <div className="ref-header">
        <h2>⚙ CHARACTER REFERENCE ⚙</h2>
      </div>

      {/* Character Name with Error Indicator */}
      <div className="character-name-section">
        <h3 className="character-name-display">
          {characterName || 'Unnamed Character'}
          {(() => {
            const errors = [];
            if (stats.hasError) errors.push("Multiple Tier 3 talents require Virtuoso permission");
            if (stats.hasMysticsError) errors.push("Only 1 Mystic talent allowed");
            if (stats.hasCursesError) errors.push("Only 1 Curse allowed");

            const errorMessage = errors.join(" • ");

            return errors.length > 0 && (
              <SimpleTooltip content={errorMessage}>
                <span className="error-indicator">
                  {React.createElement(ICON_MAP['AlertCircle'], { size: 20 })}
                </span>
              </SimpleTooltip>
            );
          })()}
        </h3>
      </div>

      <div className="abilities-section">
        <h3 className="abilities-header">⚙ ABILITY TOTALS ⚙</h3>
        <div className="ref-stats">
          <StatCard
            attributeKey="constitution"
            total={stats.constitutionTotal}
            breakdown={stats.breakdowns.constitution}
          />
          <StatCard
            attributeKey="strength"
            total={stats.strengthTotal}
            breakdown={stats.breakdowns.strength}
            wieldingText="Wielding Heavy"
          />
          <StatCard
            attributeKey="dexterity"
            total={stats.dexterityTotal}
            breakdown={stats.breakdowns.dexterity}
            wieldingText="Wielding Finesse"
            lichCapText={stats.breakdowns.dexterity.lichCap ? `Lich Curse: Capped at ${stats.breakdowns.dexterity.lichCap}` : null}
          />
          <StatCard
            attributeKey="scrutiny"
            total={stats.scrutinyTotal}
            breakdown={stats.breakdowns.scrutiny}
          />
          <StatCard
            attributeKey="mystics"
            total={stats.mysticsTotal}
            breakdown={stats.breakdowns.mystics}
          />
          <StatCard
            attributeKey="cursed"
            total={stats.cursedTotal}
            breakdown={stats.breakdowns.cursed}
          />
        </div>
      </div>

      {/* Weapon Proficiencies Section */}
      <div className="weapons-section">
        <h3 className="section-header">⚙ WEAPON PROFICIENCIES ⚙</h3>

        <div className="subsection-label">Preferred Weapons</div>
        <div className="preferred-weapons-container">
          <div className="preferred-weapons-grid">
            <div className="weapon-input-group">
              <input
                type="text"
                value={primaryWeapon}
                onChange={(e) => setPrimaryWeapon(e.target.value)}
                placeholder="Primary Weapon (e.g., Longsword)"
                className="preferred-weapon-input"
              />
            </div>
            <div className="weapon-input-group">
              <input
                type="text"
                value={secondaryWeapon}
                onChange={(e) => setSecondaryWeapon(e.target.value)}
                placeholder="Secondary Weapon (e.g., Crossbow)"
                className="preferred-weapon-input"
              />
            </div>
          </div>

          {(talents.strength[0].tier > 0 || talents.strength[2].tier > 0) && (
            <div className="wielding-types">
              {talents.strength[0].tier > 0 && (
                <label className="wielding-badge">
                  <input
                    type="checkbox"
                    checked={wieldingFinesse}
                    onChange={(e) => setWieldingFinesse(e.target.checked)}
                    className="wielding-checkbox"
                  />
                  <div className="wielding-content">
                    <div className="wielding-label">Wielding</div>
                    <div className="wielding-type">Finesse</div>
                  </div>
                </label>
              )}
              {talents.strength[2].tier > 0 && (
                <label className="wielding-badge">
                  <input
                    type="checkbox"
                    checked={wieldingHeavy}
                    onChange={(e) => setWieldingHeavy(e.target.checked)}
                    className="wielding-checkbox"
                  />
                  <div className="wielding-content">
                    <div className="wielding-label">Wielding</div>
                    <div className="wielding-type">Heavy</div>
                  </div>
                </label>
              )}
            </div>
          )}
        </div>

        <div className="weapons-divider"></div>

        <div className="weapon-proficiencies">
          {talents.strength.map(weaponSkill => {
            const damages = WEAPON_DAMAGE_PROGRESSION[weaponSkill.id] || ['—', '—', '—', '—'];
            const currentDamage = damages[weaponSkill.tier];

            // Parse damage to separate dice from (disadv)
            const hasDisadvantage = currentDamage.includes('(disadv)');
            const diceOnly = currentDamage.replace(' (disadv)', '');

            return (
              <div
                key={weaponSkill.id}
                className={`weapon-card ${weaponSkill.tier > 0 ? 'proficient' : 'not-proficient'}`}
              >
                <div className="weapon-card-left">
                  <div className="weapon-name">{weaponSkill.name}</div>
                  <div className="weapon-status">
                    {weaponSkill.tier > 0 ? (
                      <>
                        {React.createElement(ICON_MAP['CheckCircle'], { size: 20 })}
                        <span>Tier {weaponSkill.tier}</span>
                      </>
                    ) : (
                      <span className="not-trained">Not Trained</span>
                    )}
                  </div>
                </div>
                <div className="weapon-card-right">
                  <div className="damage-display">
                    <div className="damage-label">Damage</div>
                    {hasDisadvantage && <div className="damage-disadvantage">(disadv)</div>}
                    <div className="damage-dice">{diceOnly}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="talents-categorized">
        {/* c: Talents - Constitution, Dexterity, Scrutiny, Mystics, and Curses */}
        {(() => {
          // Include talents with tiers > 0 OR talents with free tiers granted
          const constitutionTalents = getTalentsByCategory('constitution', talents);
          const dexterityTalents = getTalentsByCategory('dexterity', talents);
          const scrutinyTalents = getTalentsByCategory('scrutiny', talents);
          const mysticTalents = getTalentsByCategory('mystics', talents);
          const curseTalents = getTalentsByCategory('curses', talents);
          const allTalents = [...constitutionTalents, ...dexterityTalents, ...scrutinyTalents, ...mysticTalents, ...curseTalents];

          // Add custom grimoire talent if enabled and has spells
          if (customGrimoireHighestTier > 0) {
            allTalents.push({
              id: 'custom-grimoire',
              name: customGrimoireName,
              tier: customGrimoireHighestTier,
              isCustomGrimoire: true
            });
          }

          return allTalents.length > 0 && (
            <CollapsibleSection
              title="⚙ Talents"
              isCollapsed={collapsedSections.talents}
              onToggle={() => toggleSection('talents')}
              count={allTalents.length}
              customClassName="talents-section"
            >
              <div className="talents-list">
                {allTalents.map(talent => {
                  // Handle custom grimoire talent differently
                  if (talent.isCustomGrimoire) {
                    return (
                      <TalentCard
                        key={talent.id}
                        skill={talent}
                        freeTiers={{ count: 0 }}
                      />
                    );
                  }

                  // Determine category for this talent
                  let category = '';
                  if (constitutionTalents.includes(talent)) category = 'constitution';
                  else if (dexterityTalents.includes(talent)) category = 'dexterity';
                  else if (scrutinyTalents.includes(talent)) category = 'scrutiny';
                  else if (mysticTalents.includes(talent)) category = 'mystics';
                  else if (curseTalents.includes(talent)) category = 'curses';

                  const freeTiers = calculateFreeTiers(category, talent.id, talents);
                  return (
                    <TalentCard
                      key={talent.id}
                      skill={talent}
                      freeTiers={freeTiers}
                    />
                  );
                })}
              </div>
            </CollapsibleSection>
          );
        })()}

        {/* a: Active Skills - All non-passive skills */}
        {(() => {
          // Aggregate ALL skills from weapons, talents, and curses
          const allSkills = aggregateSkillsFromTalents(talents);

          // Filter to active skills only (non-passive cooldown)
          const activeSkills = allSkills.filter(entry =>
            entry.skill.cooldown && entry.skill.cooldown.toLowerCase() !== 'passive'
          );

          // Consolidate duplicates
          const { consolidated: consolidatedActiveSkills, tierCounts: activeSkillTierCounts } = consolidateSkillsByName(activeSkills);

          return consolidatedActiveSkills.length > 0 && (
            <CollapsibleSection
              title="⚔ Active Skills"
              isCollapsed={collapsedSections.activeSkills}
              onToggle={() => toggleSection('activeSkills')}
              count={consolidatedActiveSkills.length}
              customClassName="active-skills-section"
            >
              <div className="talents-list">
                {consolidatedActiveSkills.map(({ id, skill, talentName, tier, isCurse }) => {
                  return (
                    <TalentSkillCard
                      key={id}
                      skill={skill}
                      talentName={talentName}
                      tier={tier}
                      isExpanded={!!expandedSkills[id]}
                      onToggle={() => toggleSkill(id)}
                      showTierIndicator={multiTierSkillNames.has(skill.name)}
                      isCurse={isCurse}
                    />
                  );
                })}
              </div>
            </CollapsibleSection>
          );
        })()}

        {/* e: Grimoire - Mystic Spells Only */}
        {(() => {
          const mysticTalents = getTalentsByCategory('mystics', talents);
          const grimoireSkills = [];

          mysticTalents.forEach(talent => {
            for (let tier = 1; tier <= talent.tier; tier++) {
              const skillsList = talent.skills?.[tier] || [];
              skillsList.forEach((skill, idx) => {
                if (skill.name && skill.name.trim() !== '') {
                  grimoireSkills.push({
                    id: `mystic-${talent.id}-${tier}-${idx}`,
                    skill,
                    talentName: talent.name,
                    tier: tier
                  });
                }
              });
            }
          });

          // Add custom grimoire spells
          if (customGrimoireEnabled && customGrimoireName) {
            [1, 2, 3].forEach(tier => {
              customGrimoireSpells[tier].forEach((spell, idx) => {
                if (spell.name && spell.name.trim() !== '') {
                  grimoireSkills.push({
                    id: `custom-grimoire-${tier}-${idx}`,
                    skill: {
                      name: spell.name,
                      description: spell.description,
                      cooldown: spell.cooldown,
                      actionType: spell.actionType,
                      link: customGrimoireSourceLink || undefined
                    },
                    talentName: customGrimoireName,
                    tier: tier
                  });
                }
              });
            });
          }

          // Consolidate duplicates
          const { consolidated: consolidatedGrimoireSkills, tierCounts: grimoireSkillTierCounts } = consolidateSkillsByName(grimoireSkills);

          return consolidatedGrimoireSkills.length > 0 && (
            <CollapsibleSection
              title="📖 Spell Grimoire"
              isCollapsed={collapsedSections.grimoire}
              onToggle={() => toggleSection('grimoire')}
              count={consolidatedGrimoireSkills.length}
              customClassName="grimoire-mystics"
            >
              <div className="talents-list">
                {consolidatedGrimoireSkills.map(({ id, skill, talentName, tier }) => {
                  return (
                    <TalentSkillCard
                      key={id}
                      skill={skill}
                      talentName={talentName}
                      tier={tier}
                      isExpanded={!!expandedSkills[id]}
                      onToggle={() => toggleSkill(id)}
                      showTierIndicator={multiTierSkillNames.has(skill.name)}
                    />
                  );
                })}
              </div>
            </CollapsibleSection>
          );
        })()}

        {/* b: Passive Skills - All passive skills */}
        {(() => {
          // Aggregate ALL skills from weapons, talents, and curses
          const allSkills = aggregateSkillsFromTalents(talents);

          // Filter to passive skills only
          const passiveSkills = allSkills.filter(entry =>
            entry.skill.cooldown && entry.skill.cooldown.toLowerCase() === 'passive'
          );

          // Consolidate duplicates
          const { consolidated: consolidatedPassiveSkills, tierCounts: passiveSkillTierCounts } = consolidateSkillsByName(passiveSkills);

          // Include foreign notoriety in the count if enabled
          const totalPassiveCount = consolidatedPassiveSkills.length + (foreignNotorietyEnabled ? 1 : 0);

          return (consolidatedPassiveSkills.length > 0 || foreignNotorietyEnabled) && (
            <CollapsibleSection
              title="🛡 Passive Skills"
              isCollapsed={collapsedSections.passiveSkills}
              onToggle={() => toggleSection('passiveSkills')}
              count={totalPassiveCount}
              customClassName="passive-skills-section"
            >
              <div className="talents-list">
                {/* Foreign Notoriety - Custom Passive Ability */}
                {foreignNotorietyEnabled && foreignNotorietyName && (
                  <div className="talent-skill-card foreign-notoriety-card">
                    <div className="skill-header">
                      <div className="skill-name-tier">
                        <div className="skill-name">{foreignNotorietyName}</div>
                        <div className="skill-tier-badge foreign-notoriety-badge">Custom Passive</div>
                      </div>
                    </div>
                    <div className="skill-details">
                      <div className="skill-description">
                        {foreignNotorietyDescription || 'No description provided.'}
                      </div>
                    </div>
                  </div>
                )}

                {consolidatedPassiveSkills.map(({ id, skill, talentName, tier, isCurse }) => {
                  return (
                    <TalentSkillCard
                      key={id}
                      skill={skill}
                      talentName={talentName}
                      tier={tier}
                      isExpanded={!!expandedSkills[id]}
                      onToggle={() => toggleSkill(id)}
                      showTierIndicator={multiTierSkillNames.has(skill.name)}
                      isCurse={isCurse}
                    />
                  );
                })}
              </div>
            </CollapsibleSection>
          );
        })()}
      </div>

      {stats.hasError && (
        <div className="ref-warning">
          {React.createElement(ICON_MAP['AlertCircle'], { size: 20 })}
          <span>Multiple Tier 3 talents require Virtuoso permission</span>
        </div>
      )}

      {/* Copyright Footer */}
      <footer className="copyright-footer">
        <div className="copyright-content">
          <p>&copy; {new Date().getFullYear()} A Gears of Galudon Character Calculator. All rights reserved. </p>
        </div>
      </footer>
    </div>
  );
};

export default ReferencePage;

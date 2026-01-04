import React, { useState, useMemo, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { INITIAL_TALENTS, ABILITY_BONUSES, BASE_POINTS, FREE_TIERS } from './config/talents';
import { ICON_MAP } from './config/attributes';
import { ERROR_MESSAGES, ARTS_IDS, WARFARE_SKILL_MAP } from './config/constants';
import { WEAPON_DAMAGE_PROGRESSION } from './config/weaponData';
import {
  calculateAttributeTotal,
  calculateEffectiveTier,
  calculateTotalSpent,
  aggregateAllTalents,
  calculateTierBonuses,
  getTalentsByCategory,
  getTalentsWithTiers
} from './utils/calculations';
import {
  isArtsTalent,
  getWarfareGrantedTalentId,
  getArtsGrantedTalentIds
} from './utils/talentHelpers';
import { calculateFreeTiers, findTalentById } from './utils/freeTiers';
import { consolidateSkillsByName, aggregateSkillsFromTalents } from './utils/skillHelpers';
import {
  Navigation,
  StatTooltip,
  StatCard,
  CollapsibleSection,
  TalentSkillCard,
  TalentCard,
  SimpleTooltip,
  TalentRow,
  TalentSection
} from './components';
import { useTalentState, useStats, useCharacterData } from './hooks';
import { CharacterSheet, ReferencePage, SettingsPage } from './pages';
import './styles/index.css';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

function GaludonCalculator() {
  // Use custom hooks for state management
  const characterData = useCharacterData();
  const { talents, setTalents, updateTalent, updateTalentName, updateTalentSubclass } = useTalentState(characterData.extraPoints);

  // Destructure character data for easier access
  const {
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
    setCustomGrimoireSpells,
    updateCustomGrimoireSpell,
    enhancedCurseEnabled,
    setEnhancedCurseEnabled,
    enhancedCurseName,
    setEnhancedCurseName,
    enhancedCurseSourceLink,
    setEnhancedCurseSourceLink,
    enhancedCurseAbilities,
    setEnhancedCurseAbilities,
    updateEnhancedCurseAbility,
    enhancedMartialEnabled,
    setEnhancedMartialEnabled,
    enhancedMartialName,
    setEnhancedMartialName,
    enhancedMartialSourceLink,
    setEnhancedMartialSourceLink,
    enhancedMartialAbilities,
    setEnhancedMartialAbilities,
    updateEnhancedMartialAbility,
    luminarchEnabled,
    setLuminarchEnabled,
    luminarchName,
    setLuminarchName,
    luminarchSourceLink,
    setLuminarchSourceLink,
    luminarchAbilities,
    setLuminarchAbilities,
    updateLuminarchAbility,
    characterName,
    setCharacterName,
    primaryWeapon,
    setPrimaryWeapon,
    secondaryWeapon,
    setSecondaryWeapon,
    wieldingFinesse,
    setWieldingFinesse,
    wieldingHeavy,
    setWieldingHeavy,
    showResetSuccess,
    setShowResetSuccess,
    showImportSuccess,
    setShowImportSuccess,
    showImportError,
    setShowImportError,
    collapsedSections,
    toggleSection,
    expandedSkills,
    toggleSkill,
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
  } = characterData;

  // Calculate stats using custom hook
  const stats = useStats(
    talents,
    extraPoints,
    virtuoso,
    wieldingFinesse,
    wieldingHeavy,
    customGrimoireEnabled,
    customGrimoireSpells,
    enhancedCurseEnabled,
    enhancedCurseAbilities,
    enhancedMartialEnabled,
    enhancedMartialAbilities,
    luminarchEnabled,
    luminarchAbilities
  );

  const resetToDefaults = useCallback(() => {
    setTalents(INITIAL_TALENTS);
    setExtraPoints(0);
    setVirtuoso(false);
    setForeignNotorietyEnabled(false);
    setForeignNotorietyName('');
    setForeignNotorietyDescription('');
    setCustomGrimoireEnabled(false);
    setCustomGrimoireName('');
    setCustomGrimoireSourceLink('');
    setCustomGrimoireSpells({
      1: [
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' }
      ],
      2: [
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' }
      ],
      3: [
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' }
      ]
    });
    setEnhancedCurseEnabled(false);
    setEnhancedCurseName('');
    setEnhancedCurseSourceLink('');
    setEnhancedCurseAbilities({
      1: [
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' }
      ],
      2: [
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' }
      ],
      3: [
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' }
      ]
    });
    setEnhancedMartialEnabled(false);
    setEnhancedMartialName('');
    setEnhancedMartialSourceLink('');
    setEnhancedMartialAbilities({
      1: [
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' }
      ],
      2: [
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' }
      ],
      3: [
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' }
      ]
    });
    setLuminarchEnabled(false);
    setLuminarchName('');
    setLuminarchSourceLink('');
    setLuminarchAbilities({
      1: [
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' }
      ],
      2: [
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' }
      ],
      3: [
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' },
        { name: '', description: '', cooldown: '', actionType: '' }
      ]
    });
    setCharacterName('');
    setPrimaryWeapon('');
    setSecondaryWeapon('');
    setWieldingFinesse(false);
    setWieldingHeavy(false);

    // Reset character bio
    setRace('');
    setAge('');
    setPronouns('');
    setSexuality('');

    // Reset visual information
    setHairColor('');
    setSkinColor('');
    setEyeColor('');
    setHeight('');
    setWeight('');
    setClothingDescription('');
    setGeneticMutations('');
    setProsthetics('');
    setBodyMods('');

    // Show success modal
    setShowResetSuccess(true);
  }, []);

  const exportCharacter = useCallback(() => {
    // Find which Strength skill (if any) is granted by Warfare
    const warfareGrantedTalentId = getWarfareGrantedTalentId(talents);

    // Find which Academics skills (if any) are granted by The Arts
    const artsGrantedTalentIds = getArtsGrantedTalentIds(talents);

    // Export only skills with points invested (paid tiers > 0)
    const minimalSkills = {};
    Object.keys(talents).forEach(category => {
      minimalSkills[category] = talents[category]
        .filter(skill => {
          // Export if has paid tiers
          const effectiveTier = calculateEffectiveTier(skill, warfareGrantedTalentId, artsGrantedTalentIds);
          return effectiveTier > 0;
        })
        .map(skill => {
          // Calculate effective tier for export
          const exportTier = calculateEffectiveTier(skill, warfareGrantedTalentId, artsGrantedTalentIds);

          return {
            id: skill.id,
            tier: exportTier,
            ...(skill.name !== INITIAL_TALENTS[category].find(s => s.id === skill.id)?.name && { name: skill.name }), // Only if customized
            ...(skill.bonusTier && { bonusTier: skill.bonusTier }), // For Warfare/Arts
            ...(skill.subclass && { subclass: skill.subclass }) // For Curses
          };
        });
    });

    const characterData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      character: {
        name: characterName,
        bio: {
          race,
          age,
          pronouns,
          sexuality
        },
        appearance: {
          hairColor,
          skinColor,
          eyeColor,
          height,
          weight,
          clothingDescription,
          geneticMutations,
          prosthetics,
          bodyMods
        },
        skills: minimalSkills,
        weapons: {
          primary: primaryWeapon,
          secondary: secondaryWeapon
        },
        settings: {
          extraPoints,
          virtuoso,
          foreignNotoriety: foreignNotorietyEnabled ? {
            enabled: true,
            name: foreignNotorietyName,
            description: foreignNotorietyDescription
          } : { enabled: false },
          customGrimoire: customGrimoireEnabled ? {
            enabled: true,
            name: customGrimoireName,
            sourceLink: customGrimoireSourceLink,
            spells: customGrimoireSpells
          } : { enabled: false },
          enhancedCurse: enhancedCurseEnabled ? {
            enabled: true,
            name: enhancedCurseName,
            sourceLink: enhancedCurseSourceLink,
            abilities: enhancedCurseAbilities
          } : { enabled: false },
          enhancedMartial: enhancedMartialEnabled ? {
            enabled: true,
            name: enhancedMartialName,
            sourceLink: enhancedMartialSourceLink,
            abilities: enhancedMartialAbilities
          } : { enabled: false },
          luminarch: luminarchEnabled ? {
            enabled: true,
            name: luminarchName,
            sourceLink: luminarchSourceLink,
            abilities: luminarchAbilities
          } : { enabled: false }
        }
      }
    };

    const blob = new Blob([JSON.stringify(characterData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = characterName ? `${characterName.replace(/[^a-z0-9]/gi, '_')}_GoGChar.json` : 'character.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [characterName, race, age, pronouns, sexuality, hairColor, skinColor, eyeColor, height, weight, clothingDescription, geneticMutations, prosthetics, bodyMods, talents, primaryWeapon, secondaryWeapon, extraPoints, virtuoso, foreignNotorietyEnabled, foreignNotorietyName, foreignNotorietyDescription, customGrimoireEnabled, customGrimoireName, customGrimoireSourceLink, customGrimoireSpells, enhancedCurseEnabled, enhancedCurseName, enhancedCurseSourceLink, enhancedCurseAbilities, enhancedMartialEnabled, enhancedMartialName, enhancedMartialSourceLink, enhancedMartialAbilities, luminarchEnabled, luminarchName, luminarchSourceLink, luminarchAbilities]);

  const importCharacter = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);

        if (!data.character) {
          setShowImportError(true);
          return;
        }

        const char = data.character;

        // Import skills - reconstruct full skill objects from minimal export data
        let reconstructedTalents = {};
        if (char.skills) {
          Object.keys(INITIAL_TALENTS).forEach(category => {
            reconstructedTalents[category] = INITIAL_TALENTS[category].map(initialSkill => {
              const importedSkill = char.skills[category]?.find(s => s.id === initialSkill.id);
              return {
                ...initialSkill,
                tier: importedSkill?.tier || 0,
                ...(importedSkill?.name && { name: importedSkill.name }), // Restore custom name if present
                ...(importedSkill?.bonusTier && { bonusTier: importedSkill.bonusTier }), // Restore bonusTier for Warfare/Arts
                ...(importedSkill?.subclass && { subclass: importedSkill.subclass }) // Restore subclass for Curses
              };
            });
          });
        }

        // Validate points and tier 3 rules before applying import
        const allSkills = Object.values(reconstructedTalents).flat();

        // Count tier 3 talents
        const tier3Count = allSkills.filter(skill => skill.tier === 3).length;
        const importedVirtuoso = char.settings?.virtuoso || false;

        // Check tier 3 rules
        if (!importedVirtuoso && tier3Count >= 2) {
          // Without virtuoso, max 1 tier 3 talent
          setShowImportError(true);
          return;
        }
        if (importedVirtuoso && tier3Count >= 3) {
          // With virtuoso, max 2 tier 3 talents
          setShowImportError(true);
          return;
        }

        // Calculate points spent (this is already paid tiers only from export)
        // No need to exclude warfare/arts here because the export already did that
        const totalSpent = allSkills.reduce((sum, skill) => {
          const cost = skill.cost || 1;
          if (cost === 3 && skill.tier >= 1) {
            // Curses cost 3 points flat if tier >= 1
            return sum + 3;
          }
          return sum + (skill.tier * cost);
        }, 0);

        // Calculate custom grimoire cost
        let grimoireCost = 0;
        if (char.settings?.customGrimoire?.enabled && char.settings?.customGrimoire?.spells) {
          const spells = char.settings.customGrimoire.spells;
          for (let tier = 3; tier >= 1; tier--) {
            const hasSpell = spells[tier]?.some(spell => spell.name && spell.name.trim() !== '');
            if (hasSpell) {
              grimoireCost = tier;
              break;
            }
          }
        }

        // Calculate enhanced curse cost
        let enhancedCurseCost = 0;
        if (char.settings?.enhancedCurse?.enabled && char.settings?.enhancedCurse?.abilities) {
          const abilities = char.settings.enhancedCurse.abilities;
          for (let tier = 3; tier >= 1; tier--) {
            const hasAbility = abilities[tier]?.some(ability => ability.name && ability.name.trim() !== '');
            if (hasAbility) {
              enhancedCurseCost = tier;
              break;
            }
          }
        }

        // Calculate enhanced martial cost
        let enhancedMartialCost = 0;
        if (char.settings?.enhancedMartial?.enabled && char.settings?.enhancedMartial?.abilities) {
          const abilities = char.settings.enhancedMartial.abilities;
          for (let tier = 3; tier >= 1; tier--) {
            const hasAbility = abilities[tier]?.some(ability => ability.name && ability.name.trim() !== '');
            if (hasAbility) {
              enhancedMartialCost = tier;
              break;
            }
          }
        }

        // Calculate luminarch cost
        let luminarchCost = 0;
        if (char.settings?.luminarch?.enabled && char.settings?.luminarch?.abilities) {
          const abilities = char.settings.luminarch.abilities;
          for (let tier = 3; tier >= 1; tier--) {
            const hasAbility = abilities[tier]?.some(ability => ability.name && ability.name.trim() !== '');
            if (hasAbility) {
              luminarchCost = tier;
              break;
            }
          }
        }

        const importedExtraPoints = char.settings?.extraPoints || 0;
        const availablePoints = BASE_POINTS + importedExtraPoints;

        if (totalSpent + grimoireCost + enhancedCurseCost + enhancedMartialCost + luminarchCost > availablePoints) {
          setShowImportError(true);
          return;
        }

        // Import character name and bio
        setCharacterName(char.name || '');
        setRace(char.bio?.race || '');
        setAge(char.bio?.age || '');
        setPronouns(char.bio?.pronouns || '');
        setSexuality(char.bio?.sexuality || '');

        // Import appearance
        setHairColor(char.appearance?.hairColor || '');
        setSkinColor(char.appearance?.skinColor || '');
        setEyeColor(char.appearance?.eyeColor || '');
        setHeight(char.appearance?.height || '');
        setWeight(char.appearance?.weight || '');
        setClothingDescription(char.appearance?.clothingDescription || '');
        setGeneticMutations(char.appearance?.geneticMutations || '');
        setProsthetics(char.appearance?.prosthetics || '');
        setBodyMods(char.appearance?.bodyMods || '');

        // After reconstructing skills, add back warfare-granted and arts-granted tiers
        // Find Warfare and check if it has a bonusTier AND tier >= 1 to grant the bonus
        const warfare = reconstructedTalents.scrutiny?.find(s => s.id === 'warfare');
        if (warfare?.bonusTier && warfare.tier >= 1) {
          const grantedSkillId = WARFARE_SKILL_MAP[warfare.bonusTier];
          if (grantedSkillId) {
            reconstructedTalents.strength = reconstructedTalents.strength.map(s =>
              s.id === grantedSkillId ? { ...s, tier: s.tier + 1 } : s
            );
          }
        }

        // Find The Arts and check if they have bonusTier AND tier >= 2 to grant the bonus
        ARTS_IDS.forEach(artsId => {
          const arts = reconstructedTalents.constitution?.find(s => s.id === artsId);
          if (arts?.bonusTier && arts.tier >= 2 && (arts.bonusTier === 'academics-1' || arts.bonusTier === 'academics-2')) {
            reconstructedTalents.scrutiny = reconstructedTalents.scrutiny.map(s =>
              s.id === arts.bonusTier ? { ...s, tier: s.tier + 1 } : s
            );
          }
        });

        // Apply validated skills (with warfare and arts grants restored)
        setTalents(reconstructedTalents);

        // Import weapons
        setPrimaryWeapon(char.weapons?.primary || '');
        setSecondaryWeapon(char.weapons?.secondary || '');

        // Import settings
        setExtraPoints(char.settings?.extraPoints || 0);
        setVirtuoso(char.settings?.virtuoso || false);
        setForeignNotorietyEnabled(char.settings?.foreignNotoriety?.enabled || false);
        setForeignNotorietyName(char.settings?.foreignNotoriety?.name || '');
        setForeignNotorietyDescription(char.settings?.foreignNotoriety?.description || '');
        setCustomGrimoireEnabled(char.settings?.customGrimoire?.enabled || false);
        setCustomGrimoireName(char.settings?.customGrimoire?.name || '');
        setCustomGrimoireSourceLink(char.settings?.customGrimoire?.sourceLink || '');
        setCustomGrimoireSpells(char.settings?.customGrimoire?.spells || {
          1: [
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' }
          ],
          2: [
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' }
          ],
          3: [
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' }
          ]
        });
        setEnhancedCurseEnabled(char.settings?.enhancedCurse?.enabled || false);
        setEnhancedCurseName(char.settings?.enhancedCurse?.name || '');
        setEnhancedCurseSourceLink(char.settings?.enhancedCurse?.sourceLink || '');
        setEnhancedCurseAbilities(char.settings?.enhancedCurse?.abilities || {
          1: [
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' }
          ],
          2: [
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' }
          ],
          3: [
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' }
          ]
        });
        setEnhancedMartialEnabled(char.settings?.enhancedMartial?.enabled || false);
        setEnhancedMartialName(char.settings?.enhancedMartial?.name || '');
        setEnhancedMartialSourceLink(char.settings?.enhancedMartial?.sourceLink || '');
        setEnhancedMartialAbilities(char.settings?.enhancedMartial?.abilities || {
          1: [
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' }
          ],
          2: [
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' }
          ],
          3: [
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' }
          ]
        });
        setLuminarchEnabled(char.settings?.luminarch?.enabled || false);
        setLuminarchName(char.settings?.luminarch?.name || '');
        setLuminarchSourceLink(char.settings?.luminarch?.sourceLink || '');
        setLuminarchAbilities(char.settings?.luminarch?.abilities || {
          1: [
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' }
          ],
          2: [
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' }
          ],
          3: [
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' },
            { name: '', description: '', cooldown: '', actionType: '' }
          ]
        });

        setShowImportSuccess(true);
      } catch (error) {
        setShowImportError(true);
      }
    };
    reader.readAsText(file);

    // Reset the input value so the same file can be imported again
    event.target.value = '';
  }, []);

  const scrollToSection = (sectionClass) => {
    const section = document.querySelector(`.${sectionClass}`);
    if (section) {
      const yOffset = -80; // Offset for sticky menu height
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="galudon-calculator">

      <div className="calculator-container">
        <header className="app-header">
          <h1 className="app-title">⚙ GEARS OF GALUDON ⚙</h1>
          <p className="app-subtitle">◆ CHARACTER SKILL CALCULATOR ◆</p>
        </header>

        {/* Unified Menu - Consolidated for all tabs */}
        <Navigation stats={stats} extraPoints={extraPoints} scrollToSection={scrollToSection} />

        <Routes>
          <Route path="/" element={
            <CharacterSheet
              talents={talents}
              setTalents={setTalents}
              stats={stats}
              virtuoso={virtuoso}
              updateTalent={updateTalent}
              updateTalentName={updateTalentName}
              updateTalentSubclass={updateTalentSubclass}
              collapsedSections={collapsedSections}
              toggleSection={toggleSection}
              characterName={characterName}
              setCharacterName={setCharacterName}
              race={race}
              setRace={setRace}
              age={age}
              setAge={setAge}
              pronouns={pronouns}
              setPronouns={setPronouns}
              sexuality={sexuality}
              setSexuality={setSexuality}
              hairColor={hairColor}
              setHairColor={setHairColor}
              skinColor={skinColor}
              setSkinColor={setSkinColor}
              eyeColor={eyeColor}
              setEyeColor={setEyeColor}
              height={height}
              setHeight={setHeight}
              weight={weight}
              setWeight={setWeight}
              clothingDescription={clothingDescription}
              setClothingDescription={setClothingDescription}
              geneticMutations={geneticMutations}
              setGeneticMutations={setGeneticMutations}
              prosthetics={prosthetics}
              setProsthetics={setProsthetics}
              bodyMods={bodyMods}
              setBodyMods={setBodyMods}
            />
          } />
          <Route path="/reference" element={
            <ReferencePage
              talents={talents}
              stats={stats}
              characterName={characterName}
              primaryWeapon={primaryWeapon}
              setPrimaryWeapon={setPrimaryWeapon}
              secondaryWeapon={secondaryWeapon}
              setSecondaryWeapon={setSecondaryWeapon}
              wieldingFinesse={wieldingFinesse}
              setWieldingFinesse={setWieldingFinesse}
              wieldingHeavy={wieldingHeavy}
              setWieldingHeavy={setWieldingHeavy}
              foreignNotorietyEnabled={foreignNotorietyEnabled}
              foreignNotorietyName={foreignNotorietyName}
              foreignNotorietyDescription={foreignNotorietyDescription}
              customGrimoireEnabled={customGrimoireEnabled}
              customGrimoireName={customGrimoireName}
              customGrimoireSourceLink={customGrimoireSourceLink}
              customGrimoireSpells={customGrimoireSpells}
              collapsedSections={collapsedSections}
              toggleSection={toggleSection}
              expandedSkills={expandedSkills}
              toggleSkill={toggleSkill}
            />
          } />
          <Route path="/settings" element={
            <SettingsPage
              extraPoints={extraPoints}
              setExtraPoints={setExtraPoints}
              virtuoso={virtuoso}
              setVirtuoso={setVirtuoso}
              foreignNotorietyEnabled={foreignNotorietyEnabled}
              setForeignNotorietyEnabled={setForeignNotorietyEnabled}
              foreignNotorietyName={foreignNotorietyName}
              setForeignNotorietyName={setForeignNotorietyName}
              foreignNotorietyDescription={foreignNotorietyDescription}
              setForeignNotorietyDescription={setForeignNotorietyDescription}
              customGrimoireEnabled={customGrimoireEnabled}
              setCustomGrimoireEnabled={setCustomGrimoireEnabled}
              customGrimoireName={customGrimoireName}
              setCustomGrimoireName={setCustomGrimoireName}
              customGrimoireSourceLink={customGrimoireSourceLink}
              setCustomGrimoireSourceLink={setCustomGrimoireSourceLink}
              customGrimoireSpells={customGrimoireSpells}
              updateCustomGrimoireSpell={updateCustomGrimoireSpell}
              resetToDefaults={resetToDefaults}
              exportCharacter={exportCharacter}
              importCharacter={importCharacter}
            />
          } />
        </Routes>

        {/* Reset Success Modal */}
        {showResetSuccess && (
          <div className="modal-overlay">
            <div className="modal-dialog">
              <div className="modal-header">
                {React.createElement(ICON_MAP['CheckCircle'], { size: 28, className: 'modal-icon' })}
                <h2>Reset Successful</h2>
              </div>
              <div className="modal-body">
                <p>All values have been reset to defaults.</p>
              </div>
              <div className="modal-footer">
                <button className="modal-btn" onClick={() => setShowResetSuccess(false)}>
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Import Success Modal */}
        {showImportSuccess && (
          <div className="modal-overlay">
            <div className="modal-dialog">
              <div className="modal-header">
                {React.createElement(ICON_MAP['CheckCircle'], { size: 28, className: 'modal-icon' })}
                <h2>Import Successful</h2>
              </div>
              <div className="modal-body">
                <p>Character imported successfully!</p>
              </div>
              <div className="modal-footer">
                <button className="modal-btn" onClick={() => setShowImportSuccess(false)}>
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Import Error Modal */}
        {showImportError && (
          <div className="modal-overlay">
            <div className="modal-dialog modal-error">
              <div className="modal-header">
                {React.createElement(ICON_MAP['AlertCircle'], { size: 28, className: 'modal-icon' })}
                <h2>Import Failed</h2>
              </div>
              <div className="modal-body">
                <p>Malformed Character File</p>
              </div>
              <div className="modal-footer">
                <button className="modal-btn" onClick={() => setShowImportError(false)}>
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Wrap with BrowserRouter
export default function App() {
  return (
    <BrowserRouter basename="/Galudon-Character-Calculator">
      <GaludonCalculator />
    </BrowserRouter>
  );
}

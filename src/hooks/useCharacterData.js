import { useState, useCallback } from 'react';

/**
 * Custom hook for managing character bio and UI state
 * Handles character name, weapons, bio fields, and collapsible sections
 */
export function useCharacterData() {
  const [extraPoints, setExtraPoints] = useState(0);
  const [virtuoso, setVirtuoso] = useState(false);
  const [foreignNotorietyEnabled, setForeignNotorietyEnabled] = useState(false);
  const [foreignNotorietyName, setForeignNotorietyName] = useState('');
  const [foreignNotorietyDescription, setForeignNotorietyDescription] = useState('');
  const [customGrimoireEnabled, setCustomGrimoireEnabled] = useState(false);
  const [customGrimoireName, setCustomGrimoireName] = useState('');
  const [customGrimoireSourceLink, setCustomGrimoireSourceLink] = useState('');
  const [customGrimoireSpells, setCustomGrimoireSpells] = useState({
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

  // Enhanced Curse
  const [enhancedCurseEnabled, setEnhancedCurseEnabled] = useState(false);
  const [enhancedCurseName, setEnhancedCurseName] = useState('');
  const [enhancedCurseSourceLink, setEnhancedCurseSourceLink] = useState('');
  const [enhancedCurseAbilities, setEnhancedCurseAbilities] = useState({
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

  // Enhanced Martial
  const [enhancedMartialEnabled, setEnhancedMartialEnabled] = useState(false);
  const [enhancedMartialName, setEnhancedMartialName] = useState('');
  const [enhancedMartialSourceLink, setEnhancedMartialSourceLink] = useState('');
  const [enhancedMartialAbilities, setEnhancedMartialAbilities] = useState({
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

  // Luminarch
  const [luminarchEnabled, setLuminarchEnabled] = useState(false);
  const [luminarchName, setLuminarchName] = useState('');
  const [luminarchSourceLink, setLuminarchSourceLink] = useState('');
  const [luminarchAbilities, setLuminarchAbilities] = useState({
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

  const [characterName, setCharacterName] = useState('');
  const [primaryWeapon, setPrimaryWeapon] = useState('');
  const [secondaryWeapon, setSecondaryWeapon] = useState('');
  const [wieldingFinesse, setWieldingFinesse] = useState(false);
  const [wieldingHeavy, setWieldingHeavy] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showImportSuccess, setShowImportSuccess] = useState(false);
  const [showImportError, setShowImportError] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    talents: false,
    activeSkills: false,
    grimoire: false,
    passiveSkills: false,
    characterInfo: false
  });

  const [expandedSkills, setExpandedSkills] = useState({});

  // Character bio fields
  const [race, setRace] = useState('');
  const [age, setAge] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [sexuality, setSexuality] = useState('');

  // Visual information fields
  const [hairColor, setHairColor] = useState('');
  const [skinColor, setSkinColor] = useState('');
  const [eyeColor, setEyeColor] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [clothingDescription, setClothingDescription] = useState('');
  const [geneticMutations, setGeneticMutations] = useState('');
  const [prosthetics, setProsthetics] = useState('');
  const [bodyMods, setBodyMods] = useState('');

  const toggleSection = useCallback((sectionKey) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  }, []);

  const toggleSkill = useCallback((skillId) => {
    setExpandedSkills(prev => ({
      ...prev,
      [skillId]: !prev[skillId]
    }));
  }, []);

  const updateCustomGrimoireSpell = useCallback((tier, spellIndex, field, value) => {
    setCustomGrimoireSpells(prev => ({
      ...prev,
      [tier]: prev[tier].map((spell, idx) =>
        idx === spellIndex ? { ...spell, [field]: value } : spell
      )
    }));
  }, []);

  const updateEnhancedCurseAbility = useCallback((tier, abilityIndex, field, value) => {
    setEnhancedCurseAbilities(prev => ({
      ...prev,
      [tier]: prev[tier].map((ability, idx) =>
        idx === abilityIndex ? { ...ability, [field]: value } : ability
      )
    }));
  }, []);

  const updateEnhancedMartialAbility = useCallback((tier, abilityIndex, field, value) => {
    setEnhancedMartialAbilities(prev => ({
      ...prev,
      [tier]: prev[tier].map((ability, idx) =>
        idx === abilityIndex ? { ...ability, [field]: value } : ability
      )
    }));
  }, []);

  const updateLuminarchAbility = useCallback((tier, abilityIndex, field, value) => {
    setLuminarchAbilities(prev => ({
      ...prev,
      [tier]: prev[tier].map((ability, idx) =>
        idx === abilityIndex ? { ...ability, [field]: value } : ability
      )
    }));
  }, []);

  return {
    // Settings state
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

    // Character info
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

    // UI state
    showResetSuccess,
    setShowResetSuccess,
    showResetConfirm,
    setShowResetConfirm,
    showImportSuccess,
    setShowImportSuccess,
    showImportError,
    setShowImportError,
    collapsedSections,
    toggleSection,
    expandedSkills,
    toggleSkill,

    // Bio fields
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
  };
}

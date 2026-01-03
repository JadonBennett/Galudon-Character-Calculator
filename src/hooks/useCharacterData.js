import { useState, useCallback } from 'react';

/**
 * Custom hook for managing character bio and UI state
 * Handles character name, weapons, bio fields, and collapsible sections
 */
export function useCharacterData() {
  const [extraPoints, setExtraPoints] = useState(0);
  const [virtuoso, setVirtuoso] = useState(false);
  const [characterName, setCharacterName] = useState('');
  const [primaryWeapon, setPrimaryWeapon] = useState('');
  const [secondaryWeapon, setSecondaryWeapon] = useState('');
  const [wieldingFinesse, setWieldingFinesse] = useState(false);
  const [wieldingHeavy, setWieldingHeavy] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);
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

  return {
    // Settings state
    extraPoints,
    setExtraPoints,
    virtuoso,
    setVirtuoso,

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

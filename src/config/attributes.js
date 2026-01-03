import { User, Sword, Wind, BookOpen, Sparkles, Skull, Plus, Minus, AlertCircle, CheckCircle, Settings, Cog, ChevronUp, ChevronDown } from 'lucide-react';

// Icon mapping for lucide-react icons
export const ICON_MAP = {
  'User': User,
  'Sword': Sword,
  'Wind': Wind,
  'BookOpen': BookOpen,
  'Sparkles': Sparkles,
  'Skull': Skull,
  'Plus': Plus,
  'Minus': Minus,
  'AlertCircle': AlertCircle,
  'CheckCircle': CheckCircle,
  'Settings': Settings,
  'Cog': Cog,
  'ChevronUp': ChevronUp,
  'ChevronDown': ChevronDown
};

// Attribute configuration - single source of truth for all attributes
export const ATTRIBUTES = {
  constitution: {
    key: 'constitution',
    label: 'Constitution',
    icon: 'User',
    baseValue: 15,
    cap: 20,
    abilityBonusFormula: (tier) => 2 * tier - 1,
    sectionTitle: '⚙ CONSTITUTION TALENTS ⚙',
    sectionId: 'section-constitution',
    abbreviation: 'CON',
    colors: {
      primary: '#f4e066',
      secondary: '#e0cc54',
      gradientStart: '#d4c45f',
      gradientMid: '#b8a84e',
      gradientEnd: '#9e8e3d'
    }
  },
  strength: {
    key: 'strength',
    label: 'Strength',
    icon: 'Sword',
    baseValue: 6,
    cap: 20,
    abilityBonusFormula: (tier) => 2 * tier - 1,
    sectionTitle: '⚙ STRENGTH TALENTS ⚙',
    sectionId: 'section-strength',
    abbreviation: 'STR',
    wieldingBonus: 2, // for heavy weapons
    colors: {
      primary: '#ed9f4a',
      secondary: '#d98f3f',
      gradientStart: '#d49a5a',
      gradientMid: '#b8814a',
      gradientEnd: '#9e6e3e'
    }
  },
  dexterity: {
    key: 'dexterity',
    label: 'Dexterity',
    icon: 'Wind',
    baseValue: 6,
    cap: 20,
    lichCap: 8,
    abilityBonusFormula: (tier) => 2 * tier - 1,
    sectionTitle: '⚙ DEXTERITY TALENTS ⚙',
    sectionId: 'section-dexterity',
    abbreviation: 'DEX',
    wieldingBonus: 2, // for finesse weapons
    colors: {
      primary: '#ed5a5a',
      secondary: '#d94747',
      gradientStart: '#d46d6d',
      gradientMid: '#b85555',
      gradientEnd: '#9e4242'
    }
  },
  scrutiny: {
    key: 'scrutiny',
    label: 'Scrutiny',
    icon: 'BookOpen',
    baseValue: 6,
    cap: 20,
    abilityBonusFormula: (tier) => 2 * tier - 1,
    sectionTitle: '⚙ SCRUTINY TALENTS ⚙',
    sectionId: 'section-scrutiny',
    abbreviation: 'SCR',
    colors: {
      primary: '#c47d5e',
      secondary: '#b06d4e',
      gradientStart: '#a86b4f',
      gradientMid: '#8e5740',
      gradientEnd: '#754632'
    }
  },
  mystics: {
    key: 'mystics',
    label: 'Mystics',
    icon: 'Sparkles',
    baseValue: 0,
    cap: 20,
    abilityBonusFormula: (tier) => Math.floor(tier * 4.5 + 0.5),
    sectionTitle: '⚙ MYSTIC ARTS ⚙',
    sectionId: 'section-mystics',
    abbreviation: 'MYS',
    colors: {
      primary: '#d47dba',
      secondary: '#c06ba3',
      gradientStart: '#b870a3',
      gradientMid: '#9e5c8a',
      gradientEnd: '#844a72'
    }
  },
  cursed: {
    key: 'curses',
    label: 'Cursed',
    icon: 'Skull',
    baseValue: 0,
    cap: 20,
    abilityBonusFormula: (tier) => tier > 0 ? 20 : 0, // flat 20 for any tier > 0
    sectionTitle: '⚙ Wretched Curses ⚙',
    sectionId: 'section-cursed',
    abbreviation: 'CUR',
    colors: {
      primary: '#9f82d6',
      secondary: '#8b6ec2',
      gradientStart: '#8872b8',
      gradientMid: '#705da0',
      gradientEnd: '#5a4a88'
    }
  }
};

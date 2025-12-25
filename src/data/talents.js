// ============================================================================
// TALENTS DATA
// ============================================================================
// This file consolidates all skill/talent data and their attribute bonuses.
// Edit this file to add new skills or modify bonuses.

// Base point budget for character creation
export const BASE_POINTS = 8;

// ============================================================================
// SKILLS CONFIGURATION
// ============================================================================

// Constitution Skills
export const CONSTITUTION_SKILLS = [
    {
        id: 'gardening',
        name: 'Gardening',
        tier: 0,
        tierBonuses: {
            1: { dexterity: 1 },
            2: { strength: 1 }
        },
        abilities: {
            1: [],
            2: [],
            3: [
                { name: "Discern Rare Plant", description: "After a lengthy time expenditure, your character easily recognises rare plants and how to utilize them." },
                { name: "Medicine Talent Point", description: "An extra Talent Point in the Medicine subcategory under Scrutiny." }
            ]
        }
    },
    {
        id: 'sports',
        name: 'Sports',
        tier: 0,
        tierBonuses: {
            1: { dexterity: 1 },
            3: { dexterity: 2 }
        },
        abilities: {
            1: [],
            2: [
                { name: "Disengage Skill", description: "Knows the Disengage Skill" }
            ],
            3: [
                { name: "Reknown Sportsman", description: "Renowned multi-kingdom sportsperson with celebrity status (usable in backstory), automatic Magnate System access (pending application)" },
                { name: "Evasive Footwork Skill", description: "Learns Evasive Footwork Skill" }
            ]
        }
    },
    {
    id: 'animal-husbandry',
    name: 'Animal Husbandry',
    tier: 0,
    tierBonuses: {
      2: { dexterity: 1 }
    },
    abilities: {
      1: [
        { name: "Animal Companion", description: "Companion obeys non-combat commands, has 6 health, respawns after 24 hours if killed (common animal, dog-sized maximum)" }
      ],
      2: [
        { name: "Calm Wild Animal", description: "Character can calm animals with d20 roll (12+ succeeds), forcing passivity and combat exit (once per scenario)" }
      ],
      3: [
        { name: "Call Wild Animal", description: "Ferocious combat animal with character's constitution, 8 Strength/8 Dexterity, deals 1d6 damage" },
        { name: "Heal Animal", description: "Character heals creatures to maximum HP once daily" },
        { name: "Exotic Animal Owner", description: "Exotic animal ownership grants Magnate System event access (not system itself)" }
      ]
    }
  }, 
  {
      id: 'wayfarer',
      name: 'Wayfarer',
      tier: 0,
      tierBonuses: {
        1: { dexterity: 1 },
        2: { strength: 1 },
        3: { dexterity: 1 }
      },
      abilities: {
        1: [
            { name: "Traverse Rough Terrain", description: "Terrain traversal and quiet movement mastery. Character tracks easily, finds way in progressions/newslets" },
            { name: "Stumble onto Map", description: "Small treasure map discovery chance" }
        ],
        2: [
            { name: "Stumble onto Map", description: "Medium treasure map discovery chance" }
        ],
        3: [
            { name: "Master Tracker", description: "Master wayfarer with reliable tracking/navigation in progressions" },
            { name: "Traveled Guide", description: "Character guides groups" },
            { name: "Cartographer", description: "Acts as cartographer" },
            { name: "Perception Talent Point", description: "Bonus Talent Point in Perception subcategory (capped at 2 total)" },
            { name: "Stumble onto Map", description: "High treasure map discovery chance" }
        ]
      }
    },
    {
        id: 'smithing',
        name: 'Smithing',
        tier: 0,
        tierBonuses: {
            1: { strength: 1 }
        },
        abilities: {
            1: [
                { name: "Forge Non-Tech Weapons", description: "Character forges non-tech weapons for self/others" }
            ],
            2: [
                { name: "Known Smithy", description: "Well-known blacksmith status (backstory-usable)" },
                { name: "Identify and Utilize Metals", description: "Character identifies metals, understands machine utilization" },
                { name: "Engineering Talent Point", description: "Bonus Talent Point in Engineering subcategory under Dexterity (respects 3-point limit)" }
            ],
            3: [
                { name: "Improvised Weapon", description: "Character wields Forge Hammer as weapon (third weapon if two already specified). Benefit: +4 to Attack Rolls, deals 1d8 damage on success" },
                { name: "Known Smithy", description: "Smithing business grants automatic Magnate System access (pending application)" }
            ]
        }
    },
  {
    id: 'arts-1',
    name: 'The Arts',
    placeholder: 'Subject 1',
    tier: 0,
    editable: true,
    tierBonuses: {
      1: { scrutiny: 1 }
    },
    abilities: {
      1: [],
      2: [
        { name: "Academics Talent Point", description: "Bonus Talent Point in Academics (free path selection, respects 3-point limit)" }
      ],
      3: [
        { name: "World Famous Artist", description: "Character becomes famous for artistic discipline (backstory-usable). Easier dignitary access abroad in progressions/newslets for potential currency rewards" },
        { name: "High Society Access", description: "Automatic High Society event access without Magnate membership" }
      ]
    }
  },
  {
    id: 'arts-2',
    name: 'The Arts',
    placeholder: 'Subject 2',
    tier: 0,
    editable: true,
    tierBonuses: {
      1: { scrutiny: 1 }
    },
    abilities: {
      1: [],
      2: [
        { name: "Academics Talent Point", description: "Bonus Talent Point in Academics (free path selection, respects 3-point limit)" }
      ],
      3: [
        { name: "World Famous Artist", description: "Character becomes famous for artistic discipline (backstory-usable). Easier dignitary access abroad in progressions/newslets for potential currency rewards" },
        { name: "High Society Access", description: "Automatic High Society event access without Magnate membership" }
      ]
    }
  },
  {
    id: 'cooking',
    name: 'Cooking',
    tier: 0,
        tierBonuses: {
        1: {},
        2: {},
        3: {}
      },
        abilities: {
      1: [
        { name: "Create Alcohol", description: "Character brews beer/cider, creates wine/spirits, prepares above-average meals, develops recipes for factory production" },
        { name: "Perception Talent Point", description: "Bonus Talent Point in Perception subcategory under Scrutiny (respects 3-point limit)" }
      ],
      2: [
        { name: "World Famous Chef", description: "Renowned chef with town's best restaurant. Gains name recognition for bottled/peddled goods" },
        { name: "Medicine/Alchemy Talent Point", description: "Bonus Talent Point in Medicine/Alchemy subcategory under Scrutiny (respects 3-point limit)" },
        { name: "Trade Access Foreign Food", description: "Character trades with foreign merchants for Slimefun goods (Discord ticket required)" },
        { name: "Listen for World Affairs Major", description: "Participates in progressions/dignitaries with medium information-gathering chance" }
      ],
      3: [
        { name: "World Famous Chef", description: "Character sells products abroad for fame, Character gains international fame (backstory-usable)" },
        { name: "Trade Access Foreign Food", description: "Exports consumable Slimefun products for substantial currency (Discord ticket required)" },
        { name: "Listen for World Affairs Major", description: "Attends dignitaries/foreign galas in progressions with high information-gathering chance" }
      ]
    }
  }
];

// Strength Skills (Weapon Types)
export const STRENGTH_SKILLS = [
  {
    id: 'finesse-weapons',
    name: 'Finesse Weapons',
    tier: 0,
        tierBonuses: {
        1: {},
        2: {},
        3: {}
      },
        abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'ranged-firearms',
    name: 'Firearms',
    tier: 0,
        tierBonuses: {
        1: {},
        2: {},
        3: {}
      },
        abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'heavy-weapons',
    name: 'Heavy Weapons',
    tier: 0,
        tierBonuses: {
        1: {},
        2: {},
        3: {}
      },
        abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'improvised-unarmed',
    name: 'Improvised/Unarmed',
    tier: 0,
        tierBonuses: {
        1: {},
        2: {},
        3: {}
      },
        abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'martial-weapons',
    name: 'Martial Weapons',
    tier: 0,
        tierBonuses: {
        1: {},
        2: {},
        3: {}
      },
        abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'ranged-traditional',
    name: 'Traditional Ranged',
    tier: 0,
        tierBonuses: {
        1: {},
        2: {},
        3: {}
      },
        abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  }
];

// Dexterity Skills
export const DEXTERITY_SKILLS = [
  {
    id: 'sleight-of-hand',
    name: 'Sleight of Hand',
    tier: 0,
        tierBonuses: {
        1: {},
        2: {},
        3: {}
      },
        abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'stealth',
    name: 'Stealth',
    tier: 0,
        tierBonuses: {
        1: {},
        2: {},
        3: {}
      },
        abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'gymnastics',
    name: 'Gymnastics',
    tier: 0,
    tierBonuses: {
      2: { strength: 1 }
    },
    abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'engineering',
    name: 'Engineering',
    tier: 0,
    tierBonuses: {
      2: { strength: 1 }
    },
    abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'mining',
    name: 'Mining',
    tier: 0,
    tierBonuses: {
      1: { strength: 1 }
    },
    abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'shielding',
    name: 'Shielding',
    tier: 0,
    tierBonuses: {
      1: { strength: 1 },
      2: { strength: 1 },
      3: { constitution: 3 }
    },
    abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  }
];

// Scrutiny Skills
export const SCRUTINY_SKILLS = [
  {
    id: 'perception',
    name: 'Perception',
    tier: 0,
        tierBonuses: {
        1: {},
        2: {},
        3: {}
      },
        abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'academics-1',
    name: 'Academics',
    placeholder: 'Subject 1',
    tier: 0,
    editable: true,
    abilities: {
      1: [],
      2: [],
      3: []
    }
  },
  {
    id: 'academics-2',
    name: '',
    placeholder: 'Academics Subject 2',
    tier: 0,
    editable: true,
    abilities: {
      1: [],
      2: [],
      3: []
    }
  },
  {
    id: 'medicine-alchemy',
    name: 'Medicine/Alchemy',
    tier: 0,
        tierBonuses: {
        1: {},
        2: {},
        3: {}
      },
        abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'navigation',
    name: 'Navigation',
    tier: 0,
        tierBonuses: {
        1: {},
        2: {},
        3: {}
      },
        abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'warfare',
    name: 'Warfare',
    tier: 0,
        tierBonuses: {
        1: {},
        2: {},
        3: {}
      },
        abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'black-market-knowledge',
    name: 'Black Market Knowledge',
    tier: 0,
        tierBonuses: {
        1: {},
        2: {},
        3: {}
      },
        abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'arcane-knowledge',
    name: 'Arcane Knowledge',
    tier: 0,
        tierBonuses: {
        1: {},
        2: {},
        3: {}
      },
        abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  }
];

// Mystic Arts
export const MYSTIC_SKILLS = [
  { id: 'chaosweaver', name: 'Chaosweaver', tier: 0, cost: 1, abilities: { 1: [
        { name: "", description: "" }
      ], 2: [
        { name: "", description: "" }
      ], 3: [
        { name: "", description: "" }
      ] } },
  { id: 'dreadbinding', name: 'Dreadbinding', tier: 0, cost: 1, abilities: { 1: [
        { name: "", description: "" }
      ], 2: [
        { name: "", description: "" }
      ], 3: [
        { name: "", description: "" }
      ] } },
  { id: 'hellcaster', name: 'Hellcaster', tier: 0, cost: 1, abilities: { 1: [
        { name: "", description: "" }
      ], 2: [
        { name: "", description: "" }
      ], 3: [
        { name: "", description: "" }
      ] } },
  { id: 'galecaster', name: 'Galecaster', tier: 0, cost: 1, abilities: { 1: [
        { name: "", description: "" }
      ], 2: [
        { name: "", description: "" }
      ], 3: [
        { name: "", description: "" }
      ] } },
  { id: 'gladewalker', name: 'Gladewalker', tier: 0, cost: 1, abilities: { 1: [
        { name: "", description: "" }
      ], 2: [
        { name: "", description: "" }
      ], 3: [
        { name: "", description: "" }
      ] } },
  { id: 'rythmagia', name: 'Rythmagia', tier: 0, cost: 1, abilities: { 1: [
        { name: "", description: "" }
      ], 2: [
        { name: "", description: "" }
      ], 3: [
        { name: "", description: "" }
      ] } },
  { id: 'somaturgy', name: 'Somaturgy', tier: 0, cost: 1, abilities: { 1: [
        { name: "", description: "" }
      ], 2: [
        { name: "", description: "" }
      ], 3: [
        { name: "", description: "" }
      ] } },
  { id: 'spellbinder', name: 'Spellbinder', tier: 0, cost: 1, abilities: { 1: [
        { name: "", description: "" }
      ], 2: [
        { name: "", description: "" }
      ], 3: [
        { name: "", description: "" }
      ] } },
  { id: 'technomancer', name: 'Technomancer', tier: 0, cost: 1, abilities: { 1: [
        { name: "", description: "" }
      ], 2: [
        { name: "", description: "" }
      ], 3: [
        { name: "", description: "" }
      ] } },
  { id: 'thanotic-sorcery', name: 'Thanotic Sorcery', tier: 0, cost: 1, abilities: { 1: [
        { name: "", description: "" }
      ], 2: [
        { name: "", description: "" }
      ], 3: [
        { name: "", description: "" }
      ] } },
  { id: 'last-remnant', name: 'The Last Remnant', tier: 0, cost: 1, abilities: { 1: [
        { name: "", description: "" }
      ], 2: [
        { name: "", description: "" }
      ], 3: [
        { name: "", description: "" }
      ] } },
  { id: 'tundrathurgy', name: 'Tundrathurgy', tier: 0, cost: 1, abilities: { 1: [
        { name: "", description: "" }
      ], 2: [
        { name: "", description: "" }
      ], 3: [
        { name: "", description: "" }
      ] } },
  { id: 'virotechnia', name: 'Virotechnia', tier: 0, cost: 1, abilities: { 1: [
        { name: "", description: "" }
      ], 2: [
        { name: "", description: "" }
      ], 3: [
        { name: "", description: "" }
      ] } }
];

// Curses
export const CURSE_SKILLS = [
  {
    id: 'Aurumvitae',
    name: 'Aurumvitae',
    tier: 0,
    cost: 3,
    subclass: '',
    subclassOptions: ['Phantomize', 'Revelance', 'Mischivra', 'Shardance'],
    subclassPrompt: 'Select Taint Line',
    abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'vampire',
    name: 'Vampire',
    tier: 0,
    cost: 3,
    subclass: '',
    subclassOptions: ['Lucent, Domination', 'Alasanne, Trickster', 'Silva, Warmaker'],
    subclassPrompt: 'Select Bloodline',
    abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'werewolf',
    name: 'Werewolf',
    tier: 0,
    cost: 3,
    subclass: '',
    subclassOptions: ['Shadowfang', 'Bloodpelt', 'Bigban', 'Warhowler', 'Silvermoon'],
    subclassPrompt: 'Select Pack Breed',
    abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'lich',
    name: 'Lich',
    tier: 0,
    cost: 3,
    subclass: '',
    subclassOptions: ['Mortanum', 'Hollow Throne', 'Black Sun', 'Crimson Tome', 'Biting Blade', 'Burning Library', 'Ashen Halo'],
    subclassPrompt: 'Select Dark Pact',
    tierBonuses: {
      3: { mystics: 4 }
    },
    abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  },
  {
    id: 'empyrean',
    name: 'Empyrean',
    tier: 0,
    cost: 3,
    subclass: '',
    subclassOptions: ['Path of the Blade', 'Path of the Ward', 'Path of the Hand', 'Path of the Fallen'],
    subclassPrompt: 'Choose Enlightened Path',
    abilities: {
      1: [
        { name: "", description: "" }
      ],
      2: [
        { name: "", description: "" }
      ],
      3: [
        { name: "", description: "" }
      ]
    }
  }
];

// ============================================================================
// EXPORTS
// ============================================================================

// Export in the format expected by App.jsx
export const INITIAL_SKILLS = {
  constitution: CONSTITUTION_SKILLS,
  strength: STRENGTH_SKILLS,
  dexterity: DEXTERITY_SKILLS,
  scrutiny: SCRUTINY_SKILLS,
  mystics: MYSTIC_SKILLS,
  curses: CURSE_SKILLS
};

// Generate TIER_BONUSES map from skill data
// This extracts tierBonuses from all skills into the old format for compatibility
export const TIER_BONUSES = {};

const allSkillArrays = [
  CONSTITUTION_SKILLS,
  STRENGTH_SKILLS,
  DEXTERITY_SKILLS,
  SCRUTINY_SKILLS,
  MYSTIC_SKILLS,
  CURSE_SKILLS
];

allSkillArrays.forEach(skillArray => {
  skillArray.forEach(skill => {
    if (skill.tierBonuses) {
      TIER_BONUSES[skill.id] = skill.tierBonuses;
    }
  });
});

// ============================================================================
// UNIFIED TALENTS LOOKUP
// ============================================================================
// Optional: Use this if you want to look up any talent by ID across all categories

export const ALL_TALENTS = {};

Object.entries(INITIAL_SKILLS).forEach(([category, skills]) => {
  skills.forEach(skill => {
    ALL_TALENTS[skill.id] = {
      ...skill,
      category
    };
  });
});

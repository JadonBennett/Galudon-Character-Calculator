// ============================================================================
// TALENTS DATA
// ============================================================================
// This file consolidates all skill/talent data and their attribute bonuses.
// Edit this file to add new skills or modify bonuses.

// Base point budget for character creation
export const BASE_POINTS = 8;

// ============================================================================
// TALENTS CONFIGURATION
// ============================================================================

// Constitution Talents
const CONSTITUTION_TALENTS = [
    {
        id: 'gardening',
        name: 'Gardening',
        tier: 0,
        abilityBonuses: {
            1: { dexterity: 1 },
            2: { strength: 1 }
        },
        freeTiers: {
            3: { category: 'scrutiny', talentId: 'medicine-alchemy' }
        },
        skills: {
            1: [],
            2: [],
            3: [
                {   name: "Discern Rare Plant", 
                    description: "After a lengthy time expenditure, your character easily recognises rare plants and how to utilize them.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Gardening" 
                },
                {   name: "Medicine Talent Point", 
                    description: "An extra Talent Point in Medicine/Alchemy.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Gardening" 
                }
            ]

        }
    },
    {
        id: 'sports',
        name: 'Sports',
        tier: 0,
        abilityBonuses: {
            1: { dexterity: 1 },
            3: { dexterity: 2 }
        },
        skills: {
            1: [],
            2: [
                {   name: "Disengage", 
                    description: "After some time, your character’s experience has provided them knowledge in how to Disengage from combat scenarios. A person with the Disengage skill always has an Advantage on Flee rolls.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Sports" 
                }
            ],
            3: [
                {   name: "Reknown Sportsman", 
                    description: "Renowned multi-kingdom sportsperson with celebrity status that's usable in backstory.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Sports" 
                },
                {   name: "Evasive Footwork", 
                    description: "Years of training has given your character a highly agile body. When targeted by an attack or ability, you can use your impressive footwork to deny them from landing. This is used instead of rolling to dodge, and cannot be used if you have already rolled.", 
                    cooldown: "Once per Combat",
                    actionType: "Reaction", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Sports" 
                }
            ]

        }
    },
    {
    id: 'animal-husbandry',
    name: 'Animal Husbandry',
    tier: 0,
    abilityBonuses: {
      2: { dexterity: 1 }
    },
    skills: {
            1: [
                {   name: "Animal Companion", 
                    description: "Companion obeys non-combat commands, has 6 health, respawns after 24 hours if killed (common animal, automaton, or magical familiar, dog-sized maximum)", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Animal_Husbandry" 
                }
            ],
            2: [
                {   name: "Calm Wild Animal", 
                    description: "Character can roll a d20 and any roll higher than 12 calms the animal and forces it to be passive, and forces it to exit combat.", 
                    cooldown: "Once per Combat",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Animal_Husbandry" 
                }
            ],
            3: [
                {   name: "Call Wild Animal", 
                    description: "Your character can call in assistance from a ferocious animal in combat scenarios. Animal uses character's constitution, has 8 Strength/8 Dexterity, and deals 1d6 damage", 
                    cooldown: "Once per Combat",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Animal_Husbandry" 
                },
                {   name: "Heal Animal", 
                    description: "Your character can greatly heal hurt creatures, for example, animals, beasts and even Curses. They can heal them to maximum Hit Points once per day.", 
                    cooldown: "1 per Day",
                    actionType: "Extended Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Animal_Husbandry" 
                },
                {   name: "Exotic Animal Owner", 
                    description: "Your character also owns exotic animals, and this notoriety grants them access to Magnate System events, but not to the System itself.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Animal_Husbandry" 
                }
            ]

    }
  },
  {
      id: 'wayfarer',
      name: 'Wayfarer',
      tier: 0,
      abilityBonuses: {
        1: { dexterity: 1 },
        2: { strength: 1 },
        3: { dexterity: 1 }
      },
      freeTiers: {
        3: { category: 'scrutiny', talentId: 'perception' }
      },
      skills: {
            1: [
                {   name: "Traverse Rough Terrain", 
                    description: "Your character is able to traverse rough terrain with ease, and quietly if necessary. In progressions/newslets, you can easily track people, beasts and find your way easily.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Wayfarer" 
                },
                {   name: "Stumble onto Map", 
                    description: "Your character has a small chance of stumbling onto treasure maps in Newslets/Progressions.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Wayfarer" 
                }
            ],
            2: [
                {   name: "Stumble onto Map", 
                    description: "Your character has a medium chance of stumbling onto treasure maps in Newslets/Progressions.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Wayfarer" 
                }
            ],
            3: [
                {   name: "Master Tracker", 
                    description: "Your character is a master at Wayfaring and will rarely fail in progressions/newslets when tracking people, beasts, or finding their way.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Wayfarer" 
                },
                {   name: "Traveled Guide", 
                    description: "Your character can guide groups in these Newslets/Progressions to their desired location with ease and without getting lost.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Wayfarer" 
                },
                {   name: "Cartographer", 
                    description: "Your character can act as a cartographer to map areas accurately and efficiently.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Wayfarer" 
                },
                {   name: "Perception Talent Point", 
                    description: "Bonus Talent Point in Perception.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Wayfarer" 
                },
                {   name: "Stumble onto Map", 
                    description: "Your character has a high chance of stumbling onto treasure maps in Newslets/Progressions.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Wayfarer" 
                }
            ]

      }
    },
    {
        id: 'smithing',
        name: 'Smithing',
        tier: 0,
        abilityBonuses: {
            1: { strength: 1 }
        },
        freeTiers: {
            2: { category: 'dexterity', talentId: 'engineering' }
        },
        skills: {
            1: [
                {   name: "Forge Weapons", 
                    description: "Your character can forge their own weapons (non-tech related) for themselves or others.", 
                    cooldown: "Passive",
                    actionType: "Extended Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Smithing" 
                }
            ],
            2: [
                {   name: "Smithy", 
                    description: "Your character is a well-known blacksmith and you can use that information in your character’s backstory.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Smithing" 
                },
                {   name: "Identify and Utilize Metals", 
                    description: "Your Character can identify metals easily and have enough knowledge on how to utilize them in machines.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Smithing" 
                },
                {   name: "Engineering Talent Point", 
                    description: "Bonus Talent Point in Engineering.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Smithing" 
                }
            ],
            3: [
                {   name: "Improvised Weapon", 
                    description: "Wielding a hammer during their work has given your character the unique ability to use it as a weapon. If your character has already specified two weapons as their preferred weapons, you may add Forge Hammer as a third. When using your Forge Hammer as your weapon, you gain a +4 to Attack Rolls. Upon a Successful Roll, roll 1d8 for Damage.", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Smithing" 
                },
                {   name: "Smithy", 
                    description: "Your character’s Smithing business also has public notoriety and can be used in backstories.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Smithing" 
                }
            ]

        }
    },
  {
    id: 'arts-1',
    name: 'The Arts',
    placeholder: 'Subject 1',
    tier: 0,
    editable: true,
    bonusTier: '',
    bonusTierOptions: ['Academics Subject 1', 'Academics Subject 2'],
    bonusTierPrompt: 'Select Academics Talent',
    abilityBonuses: {
      1: { scrutiny: 1 }
    },
    freeTiers: {
      2: {
        type: 'bonusTier-dependent',
        bonusTierMap: {
          'academics-1': { category: 'scrutiny', talentId: 'academics-1' },
          'academics-2': { category: 'scrutiny', talentId: 'academics-2' }
        }
      }
    },
    skills: {
            1: [],
            2: [
                {   name: "Art History Minor", 
                    description: "Your character’s knowledge for their discipline continues to expand, even into the areas of its origins and related events, historical or otherwise.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#The_Arts" 
                },
                {   name: "Academics Talent Point", 
                    description: "Your character has invested in honing their artistic talent which has given them a greater mind for their craft and knowledge surrounding it. They are awarded an extra Talent point in Academics", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#The_Arts" 
                }
            ],
            3: [
                {   name: "World Famous Artist", 
                    description: "After much trial and tribulation, your character has become quite notable not just in Galudon but also further abroad for their works. They are considered famous for their Arts Discipline and this can be written into their backstory. ", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#The_Arts" 
                },
                {   name: "High Society Access", 
                    description: "Your character’s notoriety grants them automatic access to High Society events without being part of the Magnate system and can even find themselves having easier access attending dignitaries abroad in Progressions/Newslets.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#The_Arts" 
                }
            ]

    }
  },
  {
    id: 'arts-2',
    name: 'The Arts',
    placeholder: 'Subject 2',
    tier: 0,
    editable: true,
    bonusTier: '',
    bonusTierOptions: ['Academics Subject 1', 'Academics Subject 2'],
    bonusTierPrompt: 'Select Academics Talent',
    abilityBonuses: {
      1: { scrutiny: 1 }
    },
    freeTiers: {
      2: {
        type: 'bonusTier-dependent',
        bonusTierMap: {
          'academics-1': { category: 'scrutiny', talentId: 'academics-1' },
          'academics-2': { category: 'scrutiny', talentId: 'academics-2' }
        }
      }
    },
    skills: {
            1: [],
            2: [
                {   name: "Art History Minor", 
                    description: "Your character’s knowledge for their discipline continues to expand, even into the areas of its origins and related events, historical or otherwise.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#The_Arts" 
                },
                {   name: "Academics Talent Point", 
                    description: "Your character has invested in honing their artistic talent which has given them a greater mind for their craft and knowledge surrounding it. They are awarded an extra Talent point in Academics", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#The_Arts" 
                }
            ],
            3: [
                {   name: "World Famous Artist", 
                    description: "Character becomes famous for artistic discipline (backstory-usable). Easier dignitary access abroad in progressions/newslets for potential currency rewards", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#The_Arts" 
                },
                {   name: "High Society Access", 
                    description: "Automatic High Society event access without Magnate membership", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#The_Arts" 
                }
            ]

    }
  },
  {
    id: 'cooking',
    name: 'Cooking',
    tier: 0,
        abilityBonuses: {
        1: {},
        2: {},
        3: {}
      },
        freeTiers: {
        1: { category: 'scrutiny', talentId: 'perception' },
        2: { category: 'scrutiny', talentId: 'medicine-alchemy' }
      },
        skills: {
            1: [
                {   name: "Create Alcohol", 
                    description: "Your character is capable of brewing beer and cider, creating wines, and distilling spirits.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Cooking" 
                },
                {   name: "Chef", 
                    description: "Your character can create above average meals, or creating recipes for factory production.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Cooking" 
                },
                {   name: "Perception Talent Point", 
                    description: "Bonus Talent Point in Perception.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Cooking" 
                }
            ],
            2: [
                {   name: "Chef", 
                    description: "Your character is a renowned chef. Your restaurant will be considered one of the best in town. Your character may also have name recognition for anything they bottle or peddle to the masses of Ironhurst.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Cooking" 
                },
                {   name: "Medicine/Alchemy Talent Point", 
                    description: "Bonus Talent Point in Medicine/Alchemy.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Cooking" 
                },
                {   name: "Trade Access", 
                    description: "At the cost of in-game currency, your character can Buy and Sell with Foreign Merchants outside of Galudon for Slimefun food-related goods. Make a ticket to organize the sale/trade and get a quote as to the cost.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Cooking" 
                },
                {   name: "Listen for World Affairs", 
                    description: "Your character can participate in Progressions/Newslets to attend dignitary meetings, foreign galas, and important locations. They have a medium chance of getting important information relating to ongoing world affairs.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Cooking" 
                }
            ],
            3: [
                {   name: "Chef", 
                    description: "Your character may sell their products abroad for fame in Progressions/Newslets. Your name goes beyond the shores of Galudon as a famous producer of fine food or beverages, your character is considered famous and this can be written into their backstory.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Cooking" 
                },
                {   name: "Trade Access Foreign Food", 
                    description: "Your consumable slimefun products can be exported for large amounts of in-game currency. To sell your goods, make a ticket on the Discord Ticket Bot and detail what you’re attempting to sell.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Cooking" 
                },
                {   name: "Listen for World Affairs", 
                    description: "Your character can use this to potentially get into dignitary meetings, foreign galas, and important locations in Progressions/Newslets, and they have a high chance of gaining important information relating to ongoing world affairs.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Constitution#Cooking" 
                }
            ]

    }
  }
];

// Strength Talents (Weapon Types)
const STRENGTH_TALENTS = [
  {
    id: 'finesse-weapons',
    name: 'Finesse Weapons',
    tier: 0,
        abilityBonuses: {
        1: { dexterity: 2 },
        2: {},
        3: {}
      },
        freeTiers: {
        3: { category: 'dexterity', talentId: 'gymnastics' }
      },
        skills: {
      1: [
        {   name: "Finesse Weapon", 
                    description: "Your character has become apt in wielding light weapons. Their attacks no longer require a Disadvantage Roll with their chosen Finesse weapon", 
                    cooldown: "Passive",
                    actionType: "Passive",
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Finesse_Melee-Combat" 
                },
        {   name: "Agile Movement", 
                    description: "This grants an overall +2 to your character’s Dexterity Ability total when they are actively wielding a finesse melee-combat weapon.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Finesse_Melee-Combat" 
                },
        {   name: "Precision Attack", 
                    description: "Roll 1d10 after a successful attack. If you roll a 6 or above you can target a specific appendage on the target you hit and apply the Disabled (Limb) Condition for 2 turns.", 
                    cooldown: "Once per Combat",
                    actionType: "Reaction", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Finesse_Melee-Combat" 
                }
      ],
      2: [
        {   name: "Finesse Weapon", 
                    description: "Your character’s proficiency in Finesse weapons have grown considerably, and they’re now extremely versatile in the varying combat maneuvers one would expect from light weaponry. Attacks that successfully hit your opponent with your chosen Finesse weapon do 1d10 of damage.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Finesse_Melee-Combat" 
                },
        {   name: "Disarming Strike", 
                    description: "Roll 1d10 after a successful attack. If you roll a 6 or above instead of dealing damage you disarm your target. If failing the roll, the damage takes effect and the Skill is not consumed.", 
                    cooldown: "Twice per Combat",
                    actionType: "Reaction", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Finesse_Melee-Combat" 
                }
      ],
      3: [
        {   name: "Finesse Weapon", 
                    description: "After many, many years of practice and study, your character is practically a master with Finesse weapons. Attacks that successfully hit your opponent with your chosen Finesse weapon do 1d14 of damage.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Finesse_Melee-Combat" 
                },
        {   name: "Gymnastic Talent Point", 
                    description: "Bonus talent point in Gynmastics", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Finesse_Melee-Combat" 
                },
        {   name: "Blade's Lariat", 
                    description: "Learns Blade's Lariat skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Finesse_Melee-Combat" 
                }
      ]

    }
  },
  {
    id: 'ranged-firearms',
    name: 'Firearms',
    tier: 0,
        abilityBonuses: {
        1: {},
        2: {},
        3: {}
      },
        skills: {
      1: [
        {   name: "Firearms Proficiency", 
                    description: "Basic accuracy training with revolvers, pistols, etc. Deals 1d8 damage", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Firearms" 
                },
        {   name: "Gunwhip", 
                    description: "Learns Gunwhip skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Firearms" 
                }
      ],
      2: [
        {   name: "Firearms Proficiency", 
                    description: "Extended training improves handling. Damage increases to 1d12", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Firearms" 
                },
        {   name: "Disarming Shot", 
                    description: "Learns Disarming Shot skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Firearms" 
                }
      ],
      3: [
        {   name: "Firearms Mastery", 
                    description: "Skilled gunslinger level. Attacks that successfully hit your opponent when using your chosen Firearm do 1d16 of damage", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Firearms" 
                },
        {   name: "Trigger Happy", 
                    description: "Learns Trigger Happy skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Firearms" 
                }
      ]

    }
  },
  {
    id: 'heavy-weapons',
    name: 'Heavy Weapons',
    tier: 0,
        abilityBonuses: {
        1: {},
        2: {},
        3: {}
      },
        skills: {
      1: [
        {   name: "Heavy Weapon Proficiency", 
                    description: "Two-handed heavy weapons focus (greatswords, warhammers, etc.). Deals 1d10 damage", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Heavy_Melee-Combat" 
                },
        {   name: "Dexterity Penalty", 
                    description: "Imposes -2 to Dexterity", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Heavy_Melee-Combat" 
                },
        {   name: "Stagger", 
                    description: "Learns Stagger skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Heavy_Melee-Combat" 
                }
      ],
      2: [
        {   name: "Heavy Weapon Proficiency", 
                    description: "Better understanding of weapon control. Damage increases to 1d14", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Heavy_Melee-Combat" 
                },
        {   name: "Crushing Blow", 
                    description: "Learns Crushing Blow skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Heavy_Melee-Combat" 
                }
      ],
      3: [
        {   name: "Heavy Weapon Mastery", 
                    description: "Mastered heavy weaponry. Attacks that successfully hit your opponent with your chosen Martial Weapon do 1d18 of damage", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Heavy_Melee-Combat" 
                },
        {   name: "Trembling Might", 
                    description: "Learns Trembling Might skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Heavy_Melee-Combat" 
                }
      ]

    }
  },
  {
    id: 'brawn-unarmed',
    name: 'Brawn (Unarmed)',
    tier: 0,
        abilityBonuses: {
        1: {},
        2: {},
        3: {}
      },
        skills: {
      1: [
        {   name: "Unarmed Combat", 
                    description: "Physical fitness focus for utility. Attacks that successfully hit your opponent using Unarmed Combat do 1d5 of damage", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Brawn_.28Unarmed.29" 
                },
        {   name: "Throw", 
                    description: "Learns Throw skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Brawn_.28Unarmed.29" 
                }
      ],
      2: [
        {   name: "Unarmed Combat", 
                    description: "Weak spot knowledge developed. Damage increases to 1d8", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Brawn_.28Unarmed.29" 
                },
        {   name: "Unyielding Brawn", 
                    description: "Learns Unyielding Brawn skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Brawn_.28Unarmed.29" 
                }
      ],
      3: [
        {   name: "Unarmed Combat", 
                    description: "Bare-fists mastery. Damage becomes 1d12", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Brawn_.28Unarmed.29" 
                },
        {   name: "Improvised Weaponry", 
                    description: "Can use improvised weaponry (1d10+4 damage) with first attack gaining Advantage", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Brawn_.28Unarmed.29" 
                }
      ]

    }
  },
  {
    id: 'martial-weapons',
    name: 'Martial Weapons',
    tier: 0,
        abilityBonuses: {
        1: {},
        2: {},
        3: {}
      },
        skills: {
      1: [
        {   name: "Martial Weapon Proficiency", 
                    description: "Character trained in medium weapons (longswords, battle-axes, etc.). Deals 1d8 damage", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Martial_Melee-Combat" 
                },
        {   name: "Ruthless Attack", 
                    description: "Learns Ruthless Attack skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Martial_Melee-Combat" 
                }
      ],
      2: [
        {   name: "Martial Weapon Proficiency", 
                    description: "Extensive study of techniques. Damage increases to 1d12", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Martial_Melee-Combat" 
                },
        {   name: "Counter Attack", 
                    description: "Learns Counter Attack skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Martial_Melee-Combat" 
                }
      ],
      3: [
        {   name: "Martial Weapon Mastery", 
                    description: "Practical mastery achieved. Attacks that successfully hit your opponent with your chosen Martial Weapon do 1d16 of damage", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Martial_Melee-Combat" 
                },
        {   name: "Rally", 
                    description: "Learns Rally skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Martial_Melee-Combat" 
                }
      ]

    }
  },
  {
    id: 'ranged-traditional',
    name: 'Traditional Ranged',
    tier: 0,
        abilityBonuses: {
        1: {},
        2: {},
        3: {}
      },
        skills: {
      1: [
        {   name: "Traditional Ranged Proficiency", 
                    description: "Basic competency with bows, crossbows, etc. Deals 1d6 damage", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Traditional_Ranged_Combat" 
                },
        {   name: "Hamstrung", 
                    description: "Learns Hamstrung skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Traditional_Ranged_Combat" 
                }
      ],
      2: [
        {   name: "Traditional Ranged Proficiency", 
                    description: "Extended training increases accuracy. Damage increases to 1d10", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Traditional_Ranged_Combat" 
                },
        {   name: "Disarming Shot", 
                    description: "Learns Disarming Shot skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Traditional_Ranged_Combat" 
                }
      ],
      3: [
        {   name: "Traditional Ranged Mastery", 
                    description: "Master accuracy achieved. Attacks that successfully hit your opponent when using your chosen Traditional Ranged weapon do 1d14 of damage", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Traditional_Ranged_Combat" 
                },
        {   name: "Tri-shot", 
                    description: "Learns Tri-shot skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Strength#Traditional_Ranged_Combat" 
                }
      ]

    }
  }
];

// Dexterity Talents
const DEXTERITY_TALENTS = [
  {
    id: 'sleight-of-hand',
    name: 'Sleight of Hand',
    tier: 0,
        abilityBonuses: {
        1: {},
        2: {},
        3: {}
      },
        skills: {
            1: [
                {   name: "Lockpicking", 
                    description: "Characters learn lockpicking. Lockpicking requires staff DM, rolling 1d10 above 8, with 3 attempts maximum before character name becomes public", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Sleight_of_Hand" 
                },
                {   name: "PickPocketing", 
                    description: "Pickpocket rolls require 1d10 above 8 for success with one free retry", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Sleight_of_Hand" 
                }
            ],
            2: [
                {   name: "Lockpicking", 
                    description: "Improved success thresholds reduce to above 6 for lockpicking", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Sleight_of_Hand" 
                },
                {   name: "PickPocketing", 
                    description: "Success threshold reduces to above 6 for pickpocketing", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Sleight_of_Hand" 
                }
            ],
            3: [
                {   name: "Lockpicking", 
                    description: "Master-level proficiency with success threshold of above 4 for lockpicking attempts", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Sleight_of_Hand" 
                },
                {   name: "PickPocketing", 
                    description: "Master-level proficiency with success threshold of above 4 for pickpocketing attempts", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Sleight_of_Hand" 
                }
            ]

    }
  },
  {
    id: 'stealth',
    name: 'Stealth',
    tier: 0,
        abilityBonuses: {
        1: {},
        2: {},
        3: {}
      },
        skills: {
            1: [
                {   name: "Concealment", 
                    description: "Characters learn to move quietly. Roll 1d10, any number above 8 is a successful sneak attempt. Perception users can counter with higher rolls", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Stealth" 
                }
            ],
            2: [
                {   name: "Concealment", 
                    description: "Improved stealth to above 6 threshold, with same Perception counter mechanics", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Stealth" 
                }
            ],
            3: [
                {   name: "Concealment", 
                    description: "Expert espionage mastery lowers threshold to above 4, allowing characters to blend seamlessly in social situations", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Stealth" 
                }
            ]

    }
  },
  {
    id: 'gymnastics',
    name: 'Gymnastics',
    tier: 0,
    abilityBonuses: {
      2: { strength: 1 }
    },
    skills: {
            1: [
                {   name: "Parkour", 
                    description: "Basic agility training enables parkour over ground obstacles", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Gymnastics" 
                },
                {   name: "Disengage", 
                    description: "Learns the Disengage Skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Gymnastics" 
                }
            ],
            2: [
                {   name: "Strength Bonus", 
                    description: "Adds +1 to Strength", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Gymnastics" 
                },
                {   name: "Evasive Footwork", 
                    description: "Grants Evasive Footwork Skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Gymnastics" 
                }
            ],
            3: [
                {   name: "Access to a Base", 
                    description: "Master gymnasts gain free rooftop bases (freerunners) or circus caravans (performers), plus custom bases for other archetypes", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Gymnastics" 
                }
            ]

    }
  },
  {
    id: 'engineering',
    name: 'Engineering',
    tier: 0,
    abilityBonuses: {
      2: { strength: 1 }
    },
    skills: {
            1: [
                {   name: "Device Creation", 
                    description: "Design small backpack-sized devices requiring staff approval before selling", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Engineering" 
                }
            ],
            2: [
                {   name: "Device Creation", 
                    description: "Create horse-sized devices", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Engineering" 
                },
                {   name: "Strength Bonus", 
                    description: "Adds +1 to Strength Ability Total", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Engineering" 
                }
            ],
            3: [
                {   name: "Successful Engineering Company", 
                    description: "stand in", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Engineering" 
                }
            ]

    }
  },
  {
    id: 'mining',
    name: 'Mining',
    tier: 0,
    abilityBonuses: {
      1: { strength: 1 }
    },
    skills: {
            1: [
                {   name: "Strength Bonus", 
                    description: "Adds +1 to Strength", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Mining" 
                },
                {   name: "Foreign Trader Access, Mining", 
                    description: "Trade generic materials through Discord tickets", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Mining" 
                }
            ],
            2: [
                {   name: "Access to a Mining Militia", 
                    description: "Gain 30-person militia", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Mining" 
                },
                {   name: "Discern Rare Materials", 
                    description: "Identify rare ores including Cymrinite", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Mining" 
                }
            ],
            3: [
                {   name: "Renowned Miner", 
                    description: "Establish new mining operations", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Mining" 
                },
                {   name: "Mining Company Owner", 
                    description: "stand in", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Mining" 
                }
            ]

    }
  },
  {
    id: 'shielding',
    name: 'Shielding',
    tier: 0,
    abilityBonuses: {
      1: { strength: 1 },
      2: { strength: 1 },
      3: { constitution: 3 }
    },
    skills: {
            1: [
                {   name: "Shield Combat", 
                    description: "Learn shield combat basics", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Shielding" 
                },
                {   name: "Shield Bash", 
                    description: "Learns Shield Bash Skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Shielding" 
                }
            ],
            2: [
                {   name: "Improved Blocking", 
                    description: "Improved blocking technique", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Shielding" 
                },
                {   name: "Evasive Footwork", 
                    description: "Learns Evasive Footwork Skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Shielding" 
                }
            ],
            3: [
                {   name: "Master Blocking", 
                    description: "Master blocking technique", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Shielding" 
                },
                {   name: "Constitution Bonus", 
                    description: "Adds +3 to Constitution", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Shielding" 
                },
                {   name: "Shield Toss", 
                    description: "Learns Shield Toss Skill", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dexterity#Shielding" 
                }
            ]

    }
  }
];

// Scrutiny Talents
const SCRUTINY_TALENTS = [
  {
    id: 'perception',
    name: 'Perception',
    tier: 0,
        abilityBonuses: {
        1: {},
        2: {},
        3: {}
      },
        skills: {
            1: [
                {   name: "Awareness", 
                    description: "Character gains improved situational awareness. Notices strange but small details more easily in progressions", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Perception" 
                },
                {   name: "Counter Pickpocket", 
                    description: "Pickpocket attempts can be countered with a d10 roll above 5", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Perception" 
                }
            ],
            2: [
                {   name: "Awareness", 
                    description: "High attention to detail enables character to detect individuals attempting to use Stealth to gain entry. Roll d10 above 5 to catch stealth users even if their roll succeeds", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Perception" 
                }
            ],
            3: [
                {   name: "Awareness", 
                    description: "High attention to detail enables character to detect individuals attempting to use Stealth to gain entry. Roll d10 above 5 to catch stealth users even if their roll succeeds", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Perception" 
                },
                {   name: "Identify Forgery", 
                    description: "Expert-level perception allows detection of forgeries", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Perception" 
                },
                {   name: "Pickpocket proof", 
                    description: "Immunity to pickpocketing and automatic detection of stealth attempts. Can notice things in Progressions that may be slightly off including hidden injuries and troop compositions", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Perception" 
                }
            ]

    }
  },
  {
    id: 'academics-1',
    name: 'Academics',
    placeholder: 'Subject 1',
    tier: 0,
    editable: true,
    skills: {
            1: [
                {   name: "Progression Research", 
                    description: "Character becomes a consultant in chosen academic discipline", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Academics" 
                },
                {   name: "Archives Access", 
                    description: "May access Archives via Discord ticket for field-specific research", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Academics" 
                }
            ],
            2: [
                {   name: "Progression Research", 
                    description: "Enhanced research capabilities with higher odds of discovering deep lore knowledge", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Academics" 
                },
                {   name: "Archives Access", 
                    description: "Access to Royal Archives with much higher odds of discovering deep lore knowledge", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Academics" 
                },
                {   name: "Professor Cert", 
                    description: "Eligible for Adjunct Professorship (one class per two weeks, 40 pounds/month salary)", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Academics" 
                }
            ],
            3: [
                {   name: "Progression Research", 
                    description: "Leading expert research capabilities. Can endorse research", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Academics" 
                },
                {   name: "Archives Access", 
                    description: "Access to Hidden Archives", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Academics" 
                },
                {   name: "Professor Cert", 
                    description: "Full Professor status (minimum one class per two weeks, advise two students, 90 pounds/month). Considered a leading expert on discipline", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Academics" 
                }
            ]

    }
  },
  {
    id: 'academics-2',
    name: '',
    placeholder: 'Academics Subject 2',
    tier: 0,
    editable: true,
    skills: {
            1: [
                {   name: "Progression Research", 
                    description: "Character becomes a consultant in chosen academic discipline", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Academics" 
                },
                {   name: "Archives Access", 
                    description: "May access Archives via Discord ticket for field-specific research", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Academics" 
                }
            ],
            2: [
                {   name: "Progression Research", 
                    description: "Enhanced research capabilities with higher odds of discovering deep lore knowledge", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Academics" 
                },
                {   name: "Archives Access", 
                    description: "Access to Royal Archives with much higher odds of discovering deep lore knowledge", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Academics" 
                },
                {   name: "Professor Cert", 
                    description: "Eligible for Adjunct Professorship (one class per two weeks, 40 pounds/month salary)", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Academics" 
                }
            ],
            3: [
                {   name: "Progression Research", 
                    description: "Leading expert research capabilities. Can endorse research", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Academics" 
                },
                {   name: "Archives Access", 
                    description: "Access to Hidden Archives", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Academics" 
                },
                {   name: "Professor Cert", 
                    description: "Full Professor status (minimum one class per two weeks, advise two students, 90 pounds/month). Considered a leading expert on discipline", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Academics" 
                }
            ]

    }
  },
  {
    id: 'medicine-alchemy',
    name: 'Medicine & Alchemy',
    tier: 0,
        abilityBonuses: {
        1: {},
        2: {},
        3: {}
      },
        skills: {
            1: [
                {   name: "Healing", 
                    description: "Heal up to 6 HP with 45 minutes of medical roleplay (once per day)", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Medicine.2FAlchemy" 
                },
                {   name: "Alchemical Concotions", 
                    description: "Access Level 1 alchemical concoctions", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Medicine.2FAlchemy" 
                }
            ],
            2: [
                {   name: "Healing", 
                    description: "Heal up to 12 HP with 30 minutes of medical roleplay (once per day)", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Medicine.2FAlchemy" 
                },
                {   name: "Alchemical Concotions", 
                    description: "Access Level 2 concoctions", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Medicine.2FAlchemy" 
                },
                {   name: "Professor Cert", 
                    description: "Eligible for Adjunct Professorship", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Medicine.2FAlchemy" 
                },
                {   name: "Get Hospital Office", 
                    description: "Office at Ironhurst Hospital", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Medicine.2FAlchemy" 
                }
            ],
            3: [
                {   name: "Healing", 
                    description: "Full healing capability varies by target HP threshold. Fully Heal players for 30 mins if above 5 HP; 1 hour if below 5 HP; full hospitalization day if at 0 HP", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Medicine.2FAlchemy" 
                },
                {   name: "Alchemical Concotions", 
                    description: "Access Level 3 concoctions", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Medicine.2FAlchemy" 
                },
                {   name: "Professor Cert", 
                    description: "Professor-eligible", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Medicine.2FAlchemy" 
                }
            ]

    }
  },
  {
    id: 'navigation',
    name: 'Navigation',
    tier: 0,
        abilityBonuses: {
        1: {},
        2: {},
        3: {}
      },
        skills: {
            1: [
                {   name: "Water or Air Vessel", 
                    description: "Own small leisure-class water or air vessel for transportation and military scouting", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Navigation" 
                }
            ],
            2: [
                {   name: "Water or Air Vessel", 
                    description: "Own medium-class vessel with crew and combat capability", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Navigation" 
                },
                {   name: "Professor Cert", 
                    description: "Eligible for Adjunct Professorship", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Navigation" 
                }
            ],
            3: [
                {   name: "Access to an in-game Vessel", 
                    description: "Expert navigator with custom-built staff-designed vessel. Expertly manned in progressions with state of the art artillery", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Navigation" 
                },
                {   name: "Water or Air Vessel", 
                    description: "Own medium-class vessel with crew and combat capability", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Navigation" 
                },
                {   name: "Navy Rank", 
                    description: "Eligible for Navy rank", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Navigation" 
                },
                {   name: "Professor Cert", 
                    description: "Professor-eligible", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Navigation" 
                }
            ]

    }
  },
  {
    id: 'warfare',
    name: 'Warfare',
    tier: 0,
    bonusTier: '',
    bonusTierOptions: ['Finesse Weapons', 'Firearms', 'Heavy Weapons', 'Brawn (Unarmed)', 'Martial Weapons', 'Traditional Ranged'],
    bonusTierPrompt: 'Select Bonus Talent',
        abilityBonuses: {
        1: {},
        2: {},
        3: {}
      },
      freeTiers: {
        1: {
          type: 'bonusTier-dependent',
          bonusTierMap: {
            'Finesse Weapons': { category: 'strength', talentId: 'finesse-weapons' },
            'Firearms': { category: 'strength', talentId: 'ranged-firearms' },
            'Heavy Weapons': { category: 'strength', talentId: 'heavy-weapons' },
            'Brawn (Unarmed)': { category: 'strength', talentId: 'brawn-unarmed' },
            'Martial Weapons': { category: 'strength', talentId: 'martial-weapons' },
            'Traditional Ranged': { category: 'strength', talentId: 'ranged-traditional' }
          }
        }
      },
        skills: {
            1: [
                {   name: "Combat Talent Point", 
                    description: "Gain additional Talent Point in any Combat discipline", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Warfare" 
                },
                {   name: "Warfare Rank", 
                    description: "Study of battle tactics qualifies character as skilled officer", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Warfare" 
                }
            ],
            2: [
                {   name: "Platoon of Personal Troops", 
                    description: "Command personal platoon of 50 troops/housecarls", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Warfare" 
                },
                {   name: "Professor Cert", 
                    description: "Eligible for Adjunct Professorship", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Warfare" 
                }
            ],
            3: [
                {   name: "Platoon of Personal Troops", 
                    description: "Command platoon of 300 troops", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Warfare" 
                },
                {   name: "Access to an in-game Barracks", 
                    description: "Can apply for custom barracks (requires active character status)", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Warfare" 
                },
                {   name: "Warfare Rank", 
                    description: "Practical genius in the art of Field Warfare", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Warfare" 
                },
                {   name: "Professor Cert", 
                    description: "Professor-eligible", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Warfare" 
                }
            ]

    }
  },
  {
    id: 'black-market-knowledge',
    name: 'Black Market Info',
    tier: 0,
        abilityBonuses: {
        1: {},
        2: {},
        3: {}
      },
        skills: {
            1: [
                {   name: "Forging", 
                    description: "Forge low-level documents (letters without official seals)", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Black_Market_Knowledge" 
                },
                {   name: "Access to Black Market Contacts", 
                    description: "Call upon Black Market contacts for access to low-security areas", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Black_Market_Knowledge" 
                }
            ],
            2: [
                {   name: "Forging", 
                    description: "Forge medium-level documents (government mandates, warrants)", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Black_Market_Knowledge" 
                },
                {   name: "Access to Criminal Fence", 
                    description: "Access international Fence Ring via Discord ticket for selling stolen goods", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Black_Market_Knowledge" 
                }
            ],
            3: [
                {   name: "Forging", 
                    description: "Forge high-level documents (Royal summons, pardons, access passes)", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Black_Market_Knowledge" 
                },
                {   name: "Smuggling", 
                    description: "Run smuggling operations with expertise", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Black_Market_Knowledge" 
                },
                {   name: "Legal Business Front", 
                    description: "Run criminal enterprise with legal front.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Black_Market_Knowledge" 
                },
                {   name: "Access to Spy Ring", 
                    description: "Operate spy ring which they can use to clandestinely source information", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Black_Market_Knowledge" 
                }
            ]

    }
  },
  {
    id: 'arcane-knowledge',
    name: 'Arcane Knowledge',
    tier: 0,
        abilityBonuses: {
        1: {},
        2: {},
        3: {}
      },
        skills: {
            1: [
                {   name: "Magic Sense", 
                    description: "Understand magic basics. Investigate magical sites and uncover secrets via Discord ticket questions", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Arcane_Knowledge" 
                },
                {   name: "Arcane Archives Access", 
                    description: "Basic access to magical archives", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Arcane_Knowledge" 
                }
            ],
            2: [
                {   name: "Magic Sense", 
                    description: "Detect magical sites; identify magical items and history", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Arcane_Knowledge" 
                },
                {   name: "Artificing, and Enchanting", 
                    description: "Create minor enchanted objects (2 uses) using Cymrinite base", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Arcane_Knowledge" 
                },
                {   name: "Arcane Archives Access", 
                    description: "Full archives access", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Arcane_Knowledge" 
                },
                {   name: "Professor Cert", 
                    description: "Adjunct Professorship-eligible", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Arcane_Knowledge" 
                }
            ],
            3: [
                {   name: "Magic Sense", 
                    description: "Impeccable supernatural knowledge. Locate high-magic areas and Cymrinite concentrations", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Arcane_Knowledge" 
                },
                {   name: "Artificing, and Enchanting", 
                    description: "Create greater enchanted objects (5 uses)", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Arcane_Knowledge" 
                },
                {   name: "Professor Cert", 
                    description: "Professor-eligible with full arcane expertise", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Arcane_Knowledge" 
                },
                {   name: "Arcane Archives Access", 
                    description: "Full archives access", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Scrutiny#Arcane_Knowledge" 
                }
            ]

    }
  }
];

// Mystic Arts
const MYSTIC_TALENTS = [
  { id: 'chaosweaver', name: 'Chaosweaver', tier: 0, cost: 1, skills: {
            1: [
                {   name: "Attuned", 
                    description: "All users of the Mystical Arts gain access to this passive ability that allows the caster to create a plethora of aesthetic effects. Limited by imagination; must align with school theme and investment tier; non-combat use only; no cooldown", 
                    cooldown: "None",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Chaosweaver" 
                },
                {   name: "Imp Familiar", 
                    description: "A diminutive two-foot imp familiar that cannot participate in combat but excels in mundane tasks, such as toggling lights, fetching drinks from the bar, and performing household chores.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Chaosweaver" 
                },
                {   name: "Plasma Transfiguration", 
                    description: "The caster transforms withering objects into dark crystal melee weapons, encasing their hands and preventing spellcasting. Strikes made by these crystalized weapons are performed by rolling your Mystics Total dealing 1d8 damage.", 
                    cooldown: "1 hour",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Chaosweaver" 
                },
                {   name: "Chiaroscuro Barrier", 
                    description: "Creates a shimmering 3x3 block wall that can absorb all incoming ranged attacks while the caster remains unaffected. Lasts three combat turns.", 
                    cooldown: "1 hour",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Chaosweaver" 
                }
            ],
            2: [
                {   name: "Borealis Blasts", 
                    description: "Shoots five light and dark energy blasts at targets within range. Roll their Mystic Ability Total against the opponent's Dexterity Ability Total for each shot, dealing 1d3 damage on hits.", 
                    cooldown: "Once per day",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Chaosweaver" 
                },
                {   name: "Dusk of Despair", 
                    description: "Unleashes dense smoke across an 8x8 block area, applying the Blinded Status Effect to all except the caster for three turns.", 
                    cooldown: "3 hours",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Chaosweaver" 
                },
                {   name: "Lure of Chaos", 
                    description: "Hand placement allows imposing commands on others. Target must then roll their Scrutiny ability against the Caster's Mystic ability. Cannot compel heinous acts or self-harm without out-of-character consent.", 
                    cooldown: "Once per week",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Chaosweaver" 
                }
            ],
            3: [
                {   name: "Brood Master", 
                    description: "Conjures three battle-ready imps within 3x3 block range with 5 HP each, dealing 1d4 damage. The caster cannot participate in combat or utilize other abilities until all imps are defeated.", 
                    cooldown: "Once per 3 days",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Chaosweaver" 
                },
                {   name: "Screams of the Fey", 
                    description: "Opens a dimensional rift emitting deafening sounds within seven-block radius, inflicting Disadvantage on their next 2 rolls.", 
                    cooldown: "Once per 3 days",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Chaosweaver" 
                },
                {   name: "Beacon of Peace", 
                    description: "Unleashes a radiant beacon. Targets within seven blocks must roll their Scrutiny Ability Totals. Failing to score above a 5 compels targets to drop to their knees. Lasts five turns while hands remain raised.", 
                    cooldown: "Once per day",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Chaosweaver" 
                }
            ]

    }
  },
  { id: 'dreadbinding', name: 'Dreadbinding', tier: 0, cost: 1, skills: {
  1: [
    {   name: "Attuned", 
                    description: "All users of the Mystical Arts gain access to this passive ability that allows the caster to create a plethora of aesthetic effects. Limited by imagination; must align with school theme and investment tier; non-combat use only; no cooldown", 
                    cooldown: "None",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dreadbinding" 
                },
    {   name: "Undying March", 
                    description: "Creates a Revenant standing up to 6'6\" tall with 15 HP dealing 1d8 damage. Wights may also graft new body parts onto their person, either to replace existing ones or to add new features altogether for aesthetic purposes only.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dreadbinding" 
                },
    {   name: "Vitae Bond", 
                    description: "Costs 4 HP to heal an ally for 4 HP through the runic heart connection. Action, No cooldown", 
                    cooldown: "None",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dreadbinding" 
                },
    {   name: "Dead Weight", 
                    description: "When an enemy tries to move, their movement distance can be halved for a single turn. Reaction, Four-turn cooldown", 
                    cooldown: "1 Turn",
                    actionType: "Reaction", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dreadbinding" 
                }
  ],
  2: [
    {   name: "Grave's Grasp", 
                    description: "Revenant pulls enemies within emote range up to 5 blocks closer. Revenant height increases to 7'6\", HP to 20, damage to 1d12. Free action, Once per combat", 
                    cooldown: "Once per combat",
                    actionType: "Free Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dreadbinding" 
                },
    {   name: "Ravenous Strike", 
                    description: "Marks an ally's weapon with dread runes, adding 2d3 bonus damage on hit. Healing equals half the bonus damage rounded up. Action, Once per day", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dreadbinding" 
                },
    {   name: "Runic Aegis", 
                    description: "Ranged attacks made against the Dreadbinder will instead target the Revenant, magically redirected in midair when the Revenant is present.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dreadbinding" 
                }
  ],
  3: [
    {   name: "Reaper's Toll", 
                    description: "Revenant swings weapon in an arc hitting up to 3 enemies within 3 blocks, dealing regular damage plus 1d6 additional. Revenant reaches 8'6\" height, 25 HP, 1d16 damage per hit. Action, Once per combat", 
                    cooldown: "Once per combat",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dreadbinding" 
                },
    {   name: "Enervating Pall", 
                    description: "All enemy rolls within a 5x5 block area centered on the Revenant suffer a -2 penalty for four turns. Action, Once per combat", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dreadbinding" 
                },
    {   name: "Eternal Vigil", 
                    description: "Maintains two weak husks that automatically absorb the first two attacks against the Dreadbinder without rolling. Allows raising larger husk quantities under DM discretion.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Dreadbinding" 
                }
  ]
    }
  },
  { id: 'hellcasters', name: 'Hellcasters', tier: 0, cost: 1, skills: {
  1: [
    {   name: "Attuned", 
                    description: "All users of the Mystical Arts gain access to this passive ability that allows the caster to create a plethora of aesthetic effects. Limited by imagination; must align with school theme and investment tier; non-combat use only; no cooldown", 
                    cooldown: "None",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Hellcasters" 
                },
    {   name: "Ring of Fire", 
                    description: "Creates a 3x3 fire circle lasting two turns. Anyone entering the circle or those already within it bar the caster inside the ring is hit with 1d8 of damage on the first turn of contact. Caster movement halves while active.", 
                    cooldown: "1 hour",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Hellcasters" 
                },
    {   name: "Lightbringer", 
                    description: "Conjures a floating fire shape for illumination or to light objects. Can be directed at opponents (rolling Mystics vs Dexterity for 1d5 damage). Removes darkness in a 2x2 area, eliminating blindness.", 
                    cooldown: "30 minutes",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Hellcasters" 
                },
    {   name: "Devil in the Details", 
                    description: "The caster may illuminate fingerprints, scratches from lockpicking, or words written on paper over a flat surface using hellfire, visible for five minutes. No cooldown", 
                    cooldown: "None",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Hellcasters" 
                }
  ],
  2: [
    {   name: "Fire in the Hole", 
                    description: "Shoots a concentrated fireball from a balled fist. Burns the victim for a few seconds for 1d10 of damage. Requires Mystics roll against opponent's Dexterity. No cooldown", 
                    cooldown: "None",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Hellcasters" 
                },
    {   name: "Smoking Earth", 
                    description: "Boils ground moisture into steam within a 5x5 area up to 15 blocks away. Anyone who enters or walks through the area is hit with 1d8 damage per turn. Lasts three turns; traversable only by Infernals and caster.", 
                    cooldown: "Twice daily",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Hellcasters" 
                },
    {   name: "Fiery Forge", 
                    description: "Enchants ally attacks with non-damaging flames for 2 turns, adding 1d5 damage per strike.", 
                    cooldown: "Twice daily",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Hellcasters" 
                }
  ],
  3: [
    {   name: "All Along the Watchtower", 
                    description: "The caster can shoot a tower of flame up to forty feet high serving as a beacon visible for miles. Requires concentration to maintain. Can melt ice but not solid structures.", 
                    cooldown: "Once daily",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Hellcasters" 
                },
    {   name: "Guiding Embers", 
                    description: "Uses a map to summon glowing embers locating previously visited places or clearly marked locations. No cooldown", 
                    cooldown: "None",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Hellcasters" 
                },
    {   name: "Deal at the Crossroads", 
                    description: "Summons a demonic entity at crossroads for negotiation and bargains (staff-played). The demonic entity may ask for something in exchange for services rendered.", 
                    cooldown: "Once monthly",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Hellcasters" 
                }
  ]
    }
  },
  { id: 'gladewalkers', name: 'Gladewalkers', tier: 0, cost: 1, skills: {
  1: [
    {   name: "Attuned", 
                    description: "All users of the Mystical Arts gain access to this passive ability that allows the caster to create a plethora of aesthetic effects. Limited by imagination; must align with school theme and investment tier; non-combat use only; no cooldown", 
                    cooldown: "None",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Gladewalkers" 
                },
    {   name: "Tangle Grasp", 
                    description: "Casters grow floral tendrils from their arms, shooting them to bind a target in place for two turns. The target rolls Dexterity against the caster's Mystic Total to resist. During binding, targets have disadvantage on Dexterity rolls.", 
                    cooldown: "Once per combat",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Gladewalkers" 
                },
    {   name: "Canopy Cloak", 
                    description: "The caster transforms into animals (Small/Medium/Large sizes or hybrid forms). Cannot use other abilities while transformed and attack using Mystic Total. Small forms deal 1d4 damage with +3 Dexterity and 5HP; Medium forms deal 1d8 with 10HP; Large forms deal 1d10 with -4 Dexterity and 15HP. Damage transfers to original form.", 
                    cooldown: "Once per day",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Gladewalkers" 
                },
    {   name: "Roots of Renewal", 
                    description: "Casters repair broken objects, machinery, and buildings for 24 hours temporarily. Can heal one character 5 hit points. Only the combat healing function triggers cooldown.", 
                    cooldown: "12 hours",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Gladewalkers" 
                }
  ],
  2: [
    {   name: "Fury of the Forests", 
                    description: "Local fauna attack up to two targets. Roll Mystic Total versus target Dexterity to hit. Successful hits deal 1d8 damage per target.", 
                    cooldown: "Once per combat",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Gladewalkers" 
                },
    {   name: "Solar Flare", 
                    description: "The caster harnesses the radiant energy of the sun, unleashing a potent surge of solar light. Lasts 6 hours out of combat or six turns in combat. Within 2x2 area, melee attackers take 1d4 damage and get pushed back 2 blocks. Disables machinery for 10 minutes (empowers Soltech instead). No other actions allowed.", 
                    cooldown: "6 hours",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Gladewalkers" 
                },
    {   name: "Thornweave Shield", 
                    description: "Summons a 5-block wide, 8-block tall wall of floral matter with 15HP. Wall is climbable and can block strikes or seal passageways.", 
                    cooldown: "Once per day",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Gladewalkers" 
                }
  ],
  3: [
    {   name: "Grovemother's Wrath", 
                    description: "Caster transforms into a nature entity with +4 Mystic Total boost for four turns. Attacks with vines deal 1d12 damage; gains advantage on defense rolls. After transformation ends, caster loses 5HP. Caster and transformation share one health pool.", 
                    cooldown: "Once per week",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Gladewalkers" 
                },
    {   name: "Bloom Cascade", 
                    description: "Purges disease/blight and renews barren areas. In combat, heals up to 3 allies within 10 blocks for 8HP each.", 
                    cooldown: "Once per day",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Gladewalkers" 
                },
    {   name: "Crown of Thorns", 
                    description: "Caster gains emerald-glowing eyes and controls plant life within 6-block radius. Can bind up to 4 opponents (roll Mystic Total vs. Dexterity), preventing movement and adding attack disadvantage. Each plant binding has 3HP.", 
                    cooldown: "2 days",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Gladewalkers" 
                }
  ]
    }
  },
  { id: 'rhythmagia', name: 'Rhythmagia', tier: 0, cost: 1, skills: {
  1: [
    {   name: "Attuned", 
                    description: "All users of the Mystical Arts gain access to this passive ability that allows the caster to create a plethora of aesthetic effects. Limited by imagination; must align with school theme and investment tier; non-combat use only; no cooldown", 
                    cooldown: "None",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Rhythmagia" 
                },
    {   name: "Scorching Words", 
                    description: "Magically infused insults that physically hurt one's opponent. The caster rolls Mystic Total against opponent's Dexterity Total. Damage scales from 1d3 (1 Arts point) to 1d9 (3 Arts points).", 
                    cooldown: "1 turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Rhythmagia" 
                },
    {   name: "Echo of Heroism", 
                    description: "Inspires allies with feats of heroism from days gone by, increasing their rolls by +1 to +4 depending on Arts investment (1-3 points). Effect lasts one turn for inspired allies.", 
                    cooldown: "Once per combat",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Rhythmagia" 
                },
    {   name: "Cacophony of Discouragement", 
                    description: "Targets up to two enemies, inflicting a sense of woe and hopelessness that decreases rolls by -1 to -4 based on Arts investment. Lasts one turn.", 
                    cooldown: "Once per combat",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Rhythmagia" 
                }
  ],
  2: [
    {   name: "Bo-healying Rhapsody", 
                    description: "Heals up to two allies through words giving heart to the broken, the beaten and the damned. Healing ranges from 2d3 to 4d3 depending on Arts investment.", 
                    cooldown: "Twice per combat",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Rhythmagia" 
                },
    {   name: "Dance of the Winds", 
                    description: "Either increases movement by 2 blocks for three targets for two turns, or attacks enemies with wind gusts (1d6 to 1d10 damage, potentially causing prone status).", 
                    cooldown: "Twice per combat",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Rhythmagia" 
                },
    {   name: "Harmonize", 
                    description: "Soothes beasts and NPCs. Higher Arts investment grants better persuasion chances and can stun opponents in combat via the Dazed Condition.", 
                    cooldown: "Once per combat",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Rhythmagia" 
                }
  ],
  3: [
    {   name: "Fugue of Madness", 
                    description: "Unleashes melodious madness dealing 10 damage on successful hit. Causes 1d4 self-damage regardless of outcome.", 
                    cooldown: "Once per combat",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Rhythmagia" 
                },
    {   name: "Melody of the Wilds", 
                    description: "Area-of-effect attack dealing 1d8 damage in 3x3 radius. Rolls Mystic Total versus opponent Dexterity.", 
                    cooldown: "Once per combat",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Rhythmagia" 
                },
    {   name: "Song of Reckoning", 
                    description: "Requires one turn preparation. Deals 2d8 damage on successful strike against Constitution (halved), or 1d8 damage on miss if caster has 2+ Arts points.", 
                    cooldown: "Once per combat",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Rhythmagia" 
                }
  ]
    }
  },
  { id: 'somaturgy', name: 'Somaturgy', tier: 0, cost: 1, skills: {
  1: [
    {   name: "Attuned", 
                    description: "All users of the Mystical Arts gain access to this passive ability that allows the caster to create a plethora of aesthetic effects. Limited by imagination; must align with school theme and investment tier; non-combat use only; no cooldown", 
                    cooldown: "None",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Somaturgy" 
                },
    {   name: "Somatic Genesis", 
                    description: "Creates fresh Husks from the Cradle. Create 1 Husk for a cost of 3 HP or with Medicine/Alchemy 2, summon 2 Husks for 4 HP instead. Action, No cooldown", 
                    cooldown: "None",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Somaturgy" 
                },
    {   name: "Peristaltic Advance", 
                    description: "Repositions the Cradle and its Husks. Range scales with Medicine/Alchemy: 3 blocks (1 point), 4 blocks (2 points), or 5 blocks (3 points). At 3 points, the Cradle can move twice per turn once per combat. Action, One turn cooldown", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Somaturgy" 
                },
    {   name: "Necrotic Bile", 
                    description: "At the end of each round, half of the active Husks (rounded up) extrude corrosive spit at nearest enemies outside the zone, rolling Mystic versus Dexterity. Deals 1d6 damage on hit.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Somaturgy" 
                }
  ],
  2: [
    {   name: "Living Bastion", 
                    description: "Merges nearby Husks into a combined mass for 2 turns, disabling attacks but automatically intercepting all attacks targeting allies. Action, Once per combat", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Somaturgy" 
                },
    {   name: "Catalytic Infusion", 
                    description: "Grants advantage on attack rolls (1 point), attack and defense rolls (2 points), or automatic defense success (3 points) within two turns. Action, Twice per combat", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Somaturgy" 
                },
    {   name: "Viscera Charge", 
                    description: "Launches a volatile flesh mass with 10 HP that detonates after one turn, dealing 1d12 damage within 3 blocks. At 2 points, targets become Blinded. Action, Two turn cooldown", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Somaturgy" 
                }
  ],
  3: [
    {   name: "Aberrant Overdrive", 
                    description: "Transforms target into berserker for 3 turns, forcing attacks on nearest creature. Damage/stat bonuses scale by Medicine/Alchemy points (1d6 to 2d6 damage, +4 to +8 STR/DEX, +5 to +15 HP). Action, Once per week", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Somaturgy" 
                },
    {   name: "Necrochemical Decay", 
                    description: "Releases enzyme cloud at chosen foe. Effects escalate: Blinded (1 point), Dazed (2 points), or Dazed for 2 turns (3 points). Action, Once per combat", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Somaturgy" 
                },
    {   name: "Bio-Singularity", 
                    description: "Expands zone to 9×9 for 2 turns, creating 4 temporary Husklings. Terrain becomes Difficult. At 3 points, all units gain +2 HP and +1 damage. Action, Once per week", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Somaturgy" 
                }
  ]
    }
  },
  { id: 'spellbinders', name: 'Spellbinders', tier: 0, cost: 1, skills: {
  1: [
    {   name: "Attuned", 
                    description: "All users of the Mystical Arts gain access to this passive ability that allows the caster to create a plethora of aesthetic effects. Limited by imagination; must align with school theme and investment tier; non-combat use only; no cooldown", 
                    cooldown: "None",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Spellbinders" 
                },
    {   name: "Off the Page", 
                    description: "Spellbinders can cause ink collected in written work to temporarily leap off the page and splatter over a person's face. Roll Mystic Total vs. Opponent's Dexterity Total. Success applies blindness for two turns.", 
                    cooldown: "Once per combat",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Spellbinders" 
                },
    {   name: "Runic Mastery", 
                    description: "The caster summons three flying runic manifestations targeting up to three different opponents. Roll Mystic Total vs. Dexterity Total; each hit deals 1d4 damage.", 
                    cooldown: "1 hour",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Spellbinders" 
                },
    {   name: "Library Nook", 
                    description: "Each Spellbinder has access to a single pocket dimension, a sprawling library for storing items book-sized or smaller. This passive ability is exclusive to the caster.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Spellbinders" 
                }
  ],
  2: [
    {   name: "At Your Fingertips", 
                    description: "Grants access to Royal Archives of Ironhurst. The caster retrieves sought knowledge by thinking deeply of what they're after, holding out their hands.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Spellbinders" 
                },
    {   name: "Nom de Plume", 
                    description: "Identifies document authors by revealing their name on paper that burns away after three emotes. Detects Tier Two forgeries.", 
                    cooldown: "Once per day",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Spellbinders" 
                },
    {   name: "Lost in a Book", 
                    description: "A rune blanket immobilizes opponents within 10 blocks. Roll Mystic Total vs. Strength Total each turn. Caster cannot use other abilities while maintaining this spell.", 
                    cooldown: "Once per day",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Spellbinders" 
                }
  ],
  3: [
    {   name: "A Thousand Cuts", 
                    description: "Two effects available: (1) Attack dealing 2d8 damage (Mystic Total vs. Dexterity), or (2) Copy one spell from another mystic user.", 
                    cooldown: "2 days",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Spellbinders" 
                },
    {   name: "The Magic Word", 
                    description: "Allows two mystic casters collaborating to create custom spells. Requires submitted request ticket and roleplay demonstrating spell creation. Tier partner determines spell strength.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Spellbinders" 
                },
    {   name: "Potentia's Portal", 
                    description: "Opens a 15-block range portal via Library Nook grimoire, transporting allies through obstacles for two turns. Blocks unwanted entry. Once per combat in battle; unlimited outside combat (cannot breach buildings)", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Spellbinders" 
                }
  ]
    }
  },
  { id: 'technomancy', name: 'Technomancy', tier: 0, cost: 1, skills: {
  1: [
    {   name: "Attuned", 
                    description: "All users of the Mystical Arts gain access to this passive ability that allows the caster to create a plethora of aesthetic effects. Limited by imagination; must align with school theme and investment tier; non-combat use only; no cooldown", 
                    cooldown: "None",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Technomancy" 
                },
    {   name: "Steam Shield", 
                    description: "Manipulates internal warmth and surrounding technology to deflect ranged attacks via steam. At 1-Point Engineering: immunity for two turns with -2 Dexterity penalty. At 2-Point: four turns immunity. At 3-Point: four turns immunity plus 1d4 damage to enemies within 2 blocks.", 
                    cooldown: "Once per combat",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Technomancy" 
                },
    {   name: "Bass Blast", 
                    description: "The Caster is able to manipulate the metal around their body and their tools, shifting the creation into two speakers. Unleashes soundwaves in an area. 1-Point affects 2-block radius; 2-Point affects 5-block radius; 3-Point affects 5-block radius with 3-block knockback. Targets becoming dazed depend on Constitution rolls.", 
                    cooldown: "Once per combat",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Technomancy" 
                },
    {   name: "Magnet Rise", 
                    description: "Hover using metal manipulation to avoid ground-based effects and traps for three turns.", 
                    cooldown: "2 hours",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Technomancy" 
                }
  ],
  2: [
    {   name: "Bionic Booster", 
                    description: "Overexerts prosthetic limbs for two turns. Upper body grants Strength bonuses (+2 to +4 depending on engineering level); lower body grants Dexterity bonuses. 3-Point also grants advantage on attack or defense rolls.", 
                    cooldown: "1 hour",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Technomancy" 
                },
    {   name: "Shift Gear", 
                    description: "Surrounds self with sharpened scrap metal to target up to two opponents. Damage ranges from 1d8 to 1d10 depending on engineering level. 3-Point causes bleeding and disadvantage.", 
                    cooldown: "1 turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Technomancy" 
                },
    {   name: "Blackout", 
                    description: "Induce a temporary malfunction in all machinery within emote distance for three turns, disabling prosthetics. 3-Point blocks other Technomancy users' abilities.", 
                    cooldown: "Once per day",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Technomancy" 
                }
  ],
  3: [
    {   name: "Mechanized Madness", 
                    description: "Constructs armored mechanized suit lasting four turns. Grants +2 to +6 Mystic bonus, deals 1d10-1d12 damage, increases HP by 5-10, and provides attack immunities at higher levels.", 
                    cooldown: "Once per week",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Technomancy" 
                },
    {   name: "Master of Magnetism", 
                    description: "Summons scrap metal to grab and move 1-3 allies or enemies 3-9 blocks away within 16-block range.", 
                    cooldown: "One day",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Technomancy" 
                },
    {   name: "Overclocked", 
                    description: "Grants advantage on all invention creation rolls and can override machine safety protocols.", 
                    cooldown: "Once per two months",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Technomancy" 
                }
  ]
    }
  },
  { id: 'thanotic-sorcery', name: 'Thanotic Sorcery', tier: 0, cost: 1, skills: {
  1: [
    {   name: "Attuned", 
                    description: "All users of the Mystical Arts gain access to this passive ability that allows the caster to create a plethora of aesthetic effects. Limited by imagination; must align with school theme and investment tier; non-combat use only; no cooldown", 
                    cooldown: "None",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Thanotic_Sorcery" 
                },
    {   name: "Grave Bound", 
                    description: "The caster draws chains of cold iron from the ground below, binding them in place and cancelling the movement when an enemy moves. Reaction, 3-turn cooldown", 
                    cooldown: "1 Turn",
                    actionType: "Reaction", 
                    link: "https://gearsofgaludonwiki.com/index.php/Thanotic_Sorcery" 
                },
    {   name: "Veil Walker", 
                    description: "Transforms into a wraith form, allowing passage through small openings and possession of others (with consent). Can dodge a single incoming attack by passing through it ethereally. Transformation appearance varies by caster but remains identifiable and consistent unless disguised. Reaction, Once per combat", 
                    cooldown: "1 Turn",
                    actionType: "Reaction", 
                    link: "https://gearsofgaludonwiki.com/index.php/Thanotic_Sorcery" 
                },
    {   name: "Echo of the Lost", 
                    description: "Creates a spectral familiar up to dog-sized or animates a skeleton. The bound echo has a simple personality and can communicate, but always follows commands. Deals 1d6 damage on successful attack (Mystic vs Dexterity roll). Action, Once per combat", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Thanotic_Sorcery" 
                }
  ],
  2: [
    {   name: "Shadow Surge", 
                    description: "Creates a 5x5 shadowed zone dealing 1d6 damage to any enemies entering it or starting their turn inside it and halves movement distance. Lasts three turns. Action, 24-hour cooldown", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Thanotic_Sorcery" 
                },
    {   name: "Ebon Ward", 
                    description: "Reduces damage taken by 1d8 for two turns on self or ally. Cannot reduce damage below 1. Action, Two charges, refreshes after combat", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Thanotic_Sorcery" 
                },
    {   name: "Wraith's Wail", 
                    description: "Summons a phantom dealing -3 Strength debuff. Rolls Mystic vs Scrutiny; repeats at target's turn end until failure. Action, Once per combat", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Thanotic_Sorcery" 
                }
  ],
  3: [
    {   name: "Beyond the Black Gate", 
                    description: "Transforms into an Eidolon form, gaining +4 Mystic. Grants two charges for empowered spell variants with enhanced effects. Same spell can only be empowered once per combat. Action, One-week cooldown", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Thanotic_Sorcery" 
                },
    {   name: "Soul Binding", 
                    description: "Temporarily binds a deceased spirit to answer five questions. Can restore fallen character to 1 HP (requires NPC approval or PC consent). Action, One-week cooldown", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Thanotic_Sorcery" 
                },
    {   name: "Undying Legion", 
                    description: "Summons two shades with Mystic-equivalent stats dealing 1d4 damage each, lasting up to three turns or until dispelled. Action, 12-hour cooldown", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Thanotic_Sorcery" 
                }
  ]
    }
  },
  { id: 'last-remnant', name: 'The Last Remnant', tier: 0, cost: 1, skills: {
  1: [
    {   name: "Attuned", 
                    description: "All users of the Mystical Arts gain access to this passive ability that allows the caster to create a plethora of aesthetic effects. Limited by imagination; must align with school theme and investment tier; non-combat use only; no cooldown", 
                    cooldown: "None",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/The_Last_Remnant" 
                },
    {   name: "Acolyte's Shield", 
                    description: "Creates a potentia barrier granting immunity to magical ranged attacks and temporarily disenchanting struck items. Becomes immune to all Magical Ranged Attacks for two turns. Action, Once per combat", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/The_Last_Remnant" 
                },
    {   name: "Startling Throw", 
                    description: "Ranged potentia strike within 5-block radius. Base form deals 1d5 damage using Mystic vs. Dexterity rolls. Includes Triple variant (3 attacks at 1d3 each, usable twice) and Uppercut variant (applies Prone status, usable twice). Action, No cooldown", 
                    cooldown: "None",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/The_Last_Remnant" 
                },
    {   name: "Hold", 
                    description: "Immobilizes magic users and cursed beings requiring Scrutiny 5+ to resist. Demands unbroken line of sight and caster concentration; ends after five turns or if caster takes damage or acts. Action, Once per combat", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/The_Last_Remnant" 
                }
  ],
  2: [
    {   name: "Quake", 
                    description: "Ground shockwave in 6x6 block area. Targets roll Dexterity vs. caster's Mystic; success deals 1d5 damage and inflicts Prone. Action, Once per combat", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/The_Last_Remnant" 
                },
    {   name: "Heightened Step", 
                    description: "Escape ability granting caster Advantage and opponents Disadvantage on Flee rolls using potentia concealment. Free action, Once per day", 
                    cooldown: "1 Turn",
                    actionType: "Free Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/The_Last_Remnant" 
                },
    {   name: "Sense Potentia", 
                    description: "Detects concentrated potentia sources (Cymrinite, cursed beings, magic users) within 5-block radius through sensations; causes goosebumps proximally and burning sensations when pinpointing direction.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/The_Last_Remnant" 
                }
  ],
  3: [
    {   name: "Absorb Magic", 
                    description: "Dispels incoming spells and grants three options: restore half spell's damage as healing, empower Startling Throw with Advantage and 1d8 damage, or recharge Acolyte's Shield with deflection bonus. Reaction, Two turns cooldown", 
                    cooldown: "1 Turn",
                    actionType: "Reaction", 
                    link: "https://gearsofgaludonwiki.com/index.php/The_Last_Remnant" 
                },
    {   name: "Siphon", 
                    description: "Creates 10x10 block anti-magic field preventing all spell casting within or into the zone. No magic can be cast within it, and no magic can be cast into it; ends if caster takes damage. Action, Once per day", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/The_Last_Remnant" 
                },
    {   name: "The Ritual of Touch", 
                    description: "Ten-turn meditation ritual requiring contact with restrained target's chest. Successful completion suppresses target's magical and supernatural abilities for 24 hours. Non-combat, Once per week", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/The_Last_Remnant" 
                }
  ]
    }
  },
  { id: 'tundrathurgy', name: 'Tundrathurgy', tier: 0, cost: 1, skills: {
  1: [
    {   name: "Attuned", 
                    description: "All users of the Mystical Arts gain access to this passive ability that allows the caster to create a plethora of aesthetic effects. Limited by imagination; must align with school theme and investment tier; non-combat use only; no cooldown", 
                    cooldown: "None",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Tundrathurgy" 
                },
    {   name: "Cryoquill Blast", 
                    description: "The caster extends both hands forward and shoots an icy blast of wind filled with small shards of ice. Rolls Mystic Total against opponent's Dexterity, dealing 1d6 damage at 5-block range. Creates slippery ground requiring Dexterity check or Prone status. No cooldown", 
                    cooldown: "None",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Tundrathurgy" 
                },
    {   name: "Snowflake Serenade", 
                    description: "Summons snowfall over a 6x6 block area lasting three turns. Those failing a Dexterity check take 1d4 damage and become Prone. Non-Tundrathurgists suffer -2 Movement Penalty in the affected zone.", 
                    cooldown: "6 hours",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Tundrathurgy" 
                },
    {   name: "Frostcallers Touch", 
                    description: "Passive ability allowing the caster to freeze water surfaces for traversal. Ice melts immediately after the caster leaves. Can passively cool Hellcasters for comfort.", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Tundrathurgy" 
                }
  ],
  2: [
    {   name: "Arctic Mirage", 
                    description: "The caster can create a doppelganger made entirely from aurora borealis light that confuses enemies for two turns. Redirects all attacks to the mirage, which survives 2 hits before dissipating.", 
                    cooldown: "6 hours",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Tundrathurgy" 
                },
    {   name: "Polar Resonance", 
                    description: "Creates manipulable ice structures (ladders, bridges, walls up to 4 blocks wide/5 tall) for utility or decoration. Structures take 10+ HP damage to destroy. Infernals touching them suffer 1d4 damage. Usable freely outside combat. Once per combat", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Tundrathurgy" 
                },
    {   name: "Shiverstrike", 
                    description: "Exhales freezing wind that dazes targets for two turns if Mystics Total beats Scrutiny Total. Dazed creatures cannot attack. Both parties reroll each turn to determine if daze breaks. Once per combat", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Tundrathurgy" 
                }
  ],
  3: [
    {   name: "Crystalline Shardstorm", 
                    description: "Fires up to five icicles at three opponents. Rolls Mystic Total against Dexterity Total; each success deals 1d4 damage. Once per combat", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Tundrathurgy" 
                },
    {   name: "Armored Permafrost", 
                    description: "Envelops caster in protective ice providing 5 temporary HP and +5 Dexterity Bonus for three turns. Fire attacks bypass this armor entirely. Once per combat", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Tundrathurgy" 
                },
    {   name: "Absolute-Zero Tempest", 
                    description: "Creates a 10x10 block blizzard centered on caster lasting three turns. Non-allies suffer -4 penalty on all rolls and 1d8 damage per turn. Requires unbroken concentration; any strike ends it. Once per day", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Tundrathurgy" 
                }
  ]
    }
  },
  { id: 'virotechnia', name: 'Virotechnia', tier: 0, cost: 1, freeTiers: { 2: { category: 'scrutiny', talentId: 'medicine-alchemy' } }, skills: {
  1: [
    {   name: "Attuned", 
                    description: "All users of the Mystical Arts gain access to this passive ability that allows the caster to create a plethora of aesthetic effects. Limited by imagination; must align with school theme and investment tier; non-combat use only; no cooldown", 
                    cooldown: "None",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Virotechnia" 
                },
    {   name: "Aether Hex-Cast", 
                    description: "A Tech-foci bonds with a wounded individual, creating a cast of potentia to compensate for the fractured and injured limb. Restores 1d4 HP and grants +2 to target's next Defense roll. Costs one Tech-foci, usable twice per combat as an action", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Virotechnia" 
                },
    {   name: "Reconstitution", 
                    description: "The caster collects broken aether tech pieces and rapidly reforms them into up to 3 functional Tech-foci. This process creates tremendous strain on the caster causing them to take 1d6 Damage from the exertion. No cooldown, costs one action", 
                    cooldown: "None",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Virotechnia" 
                },
    {   name: "Stabilize Vitae", 
                    description: "Deploys a Tech-foci projecting a barrier of potentia around a target, stabilizing their condition and preventing further deterioration. Target enters stasis, unable to act or move. Conscious targets may roll Scrutiny (4+ succeeds) to resist. Costs one Tech-foci, once per combat, usable unlimited times outside combat", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Virotechnia" 
                }
  ],
  2: [
    {   name: "Surge Mend", 
                    description: "Overcharges one Tech-foci to repair significant damage. Target heals 2d4 HP per turn for 2 turns but suffers -2 penalty on next Attack Roll per turn due to exhaustion. Costs one Tech-foci, once per combat", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Virotechnia" 
                },
    {   name: "Stasis Coat", 
                    description: "A Tech-foci emits a coating of potentia providing 4 points of damage reduction for 4 turns. Requires intense caster focus (-4 penalty on Mystic Rolls). Costs two Tech-foci, once per day", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Virotechnia" 
                },
    {   name: "Mind Meld", 
                    description: "Establishes a temporary sensory link with a willing ally, allowing them to feel and diagnose the exact nature of internal injuries and diseases. Grants +1d4 to next Virotechnia ability and one free Talent Point in Medicine/Alchemy. Costs one Tech-foci, once per combat, free action", 
                    cooldown: "1 Turn",
                    actionType: "Free Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Virotechnia" 
                }
  ],
  3: [
    {   name: "Sustain", 
                    description: "Channels potentia through all 3 Tech-foci to heal an injured ally 3d6 HP per turn for 3 turns. Caster can redirect up to 2 foci to new targets (reducing healing pool by 1d6 each). Target gains Disadvantage on next Attack Roll. Costs three Tech-foci, once per combat", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Virotechnia" 
                },
    {   name: "Rubedo", 
                    description: "Attaches a Tech-foci to recently deceased ally (within 10 minutes) patching up the fatal injuries and restoring them to life with 1 HP. Target remains weakened for 24 hours. Non-instant death only. Costs one Tech-foci, once per week", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Virotechnia" 
                },
    {   name: "Aethernetic Domination", 
                    description: "Forges a bond with target using three Tech-foci. Unwilling targets roll Scrutiny (6+ resists); can reroll each turn. Lasts 4 turns. Target receives stasis coat, +4 to Dexterity/Strength, focusing on protecting the caster. Upon spell end, target suffers -4 penalty to those stats for 24 hours. Once per week", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Virotechnia" 
                }
  ]
    }
  }
];

// Curses
const CURSE_TALENTS = [
  {
    id: 'aurumvitae',
    name: 'Aurumvitae',
    tier: 0,
    cost: 3,
    subclass: '',
    subclassOptions: ['Phantomize', 'Revelance', 'Mischivra', 'Shardance'],
    subclassPrompt: 'Select Taint Line',
    skills: {
  1: [
    {   name: "Extended Lifespan", 
                    description: "Those cursed with Aurumvitae experience an elongated existence beyond their race's normal lifespan", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Aurumvitae" 
                },
    {   name: "Increased Scrutiny", 
                    description: "+2 bonus to Scrutiny Ability Total", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Aurumvitae" 
                },
    {   name: "Fey Essence Perception", 
                    description: "Detect fey connections within 10-block radius; toggleable by user", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Aurumvitae" 
                },
    {   name: "Lord Ritual", 
                    description: "Knowledge to contact their Fey Lord via Discord ticket", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Aurumvitae" 
                },
    {   name: "Malevolent Influence", 
                    description: "Cause subtle disruptions to enchantments and technology within 10 blocks", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Aurumvitae" 
                },
    {   name: "Feyshift Transformation", 
                    description: "Transform into fey-touched form lasting 1-2 hours", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Aurumvitae" 
                },
    {   name: "Involuntary Transformation", 
                    description: "Forced shift during solar eclipses, fey energy surges, or Gladewalker magic", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Aurumvitae" 
                }
  ],
  2: [],
  3: []
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
    skills: {
            1: [
                {   name: "Immortality",
                    description: "Can revive at an altar of their choice after 24 hours of death",
                    cooldown: "Passive",
                    actionType: "Passive",
                    link: "https://gearsofgaludonwiki.com/index.php/Vampires"
                },
                {   name: "Incognito", 
                    description: "Appear as base race when using only passive abilities; trait visibility manifests during feeding", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Vampires" 
                },
                {   name: "Sunshy", 
                    description: "Direct sunlight causes weakness, -4 penalty to rolls, nullifies vampiric abilities", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Vampires" 
                },
                {   name: "Increased Strength", 
                    description: "+2 bonus to strength-related rolls", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Vampires" 
                },
                {   name: "Increased Stamina", 
                    description: "+2 bonus to dexterity-related rolls", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Vampires" 
                },
                {   name: "Blood Rite", 
                    description: "Feed without fangs; victim must be incapacitated", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Vampires" 
                },
                {   name: "Chaos Coil", 
                    description: "Launch two dark magic projectiles up to 5 blocks; roll 2d6 (misses below 3); 1d3 damage each", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Vampires" 
                },
                {   name: "Feeding Requirement", 
                    description: "Must feed weekly on non-NPC characters from arteries. Fed-upon victims experience extreme fatigue for 12 hours (-2 to rolls)", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Vampires" 
                },
                {   name: "Revival Penalty", 
                    description: "Abilities are nullified for 48 hours after successful revival", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Vampires" 
                }
            ],
            2: [],
            3: []

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
    skills: {
            1: [
                {   name: "Extended Lifespan", 
                    description: "Those infected with lycanthropy receive an extended lifespan often living well beyond what is considered their racial norm", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Werewolves" 
                },
                {   name: "Increased Constitution", 
                    description: "+4 to Constitution Ability Total; grants additional 4 Hit Points", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Werewolves" 
                },
                {   name: "Increased Strength", 
                    description: "+2 to Strength Ability Total", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Werewolves" 
                },
                {   name: "Infection", 
                    description: "Transmit curse via neck bite; requires 24-hour gestation period before full infection", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Werewolves" 
                },
                {   name: "Lycanthrope Transformation", 
                    description: "Take the Werewolf form of their chosen Werewolf Pack Breed; lasts 1-2 hours minimum", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Werewolves" 
                },
                {   name: "Direwolf Transformation", 
                    description: "Cosmetic wolf form with +2 Strength and +3 Dexterity rolls; detect Vampires within 3 blocks", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Werewolves" 
                },
                {   name: "Indiscriminate Rage", 
                    description: "Attack non-Werewolves unprovoked; roll Scrutiny above 5 to resist targeting specific individuals", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Werewolves" 
                },
                {   name: "Arcane Inept", 
                    description: "Cannot use magic while transformed (exception: Silvermoon breed)", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Werewolves" 
                },
                {   name: "Pack Tactics", 
                    description: "3+ Werewolves gain +5 temporary HP and +2 Strength Ability Total", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Werewolves" 
                },
                {   name: "Willful Transformation", 
                    description: "Transform once daily at will; lasts maximum 2 hours; voluntary reversion allowed", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Werewolves" 
                },
                {   name: "Involuntary Transformation", 
                    description: "Triggered by full moon, excessive blood exposure (3+ bleeding individuals), or dropping below 50% HP", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Werewolves" 
                }
            ],
            2: [],
            3: []

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
    abilityBonuses: {
      3: { mystics: 4 }
    },
    skills: {
            1: [
                {   name: "Without End", 
                    description: "All Liches have a Phylactery, an object imbued with their accursed soul. Upon incapacitation, they reform at the phylactery's location with maximum health reduced to 1 for 24 hours", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Liches" 
                },
                {   name: "Arise Anew", 
                    description: "Liches can seal an arcane pact with another character to transform them into a Mortanum, granting them undead servant mechanics", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Liches" 
                },
                {   name: "Masters of Darkness", 
                    description: "Requires at least one point in a magic school. Dreadbinder Liches may use abilities during combat while the Revenant fights", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Liches" 
                },
                {   name: "Immortal Remains", 
                    description: "Unable to take Strength talents or increase Dexterity above 8. Grants +4 to Mystic stat permanently", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Liches" 
                },
                {   name: "Behold the Infinite", 
                    description: "Once weekly, Liches achieve Apotheosis by forcing their presence into their vessel as a free action, lasting combat duration with pact-specific effects. Limited to 10' height", 
                    cooldown: "1 Turn",
                    actionType: "Free Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Liches" 
                },
                {   name: "The Old Hunger", 
                    description: "Siphon magical energy from incapacitated mages (-2 Mystic for 48 hours). Grants bonuses based on consumed magic school for two weeks. Only one bonus active at a time", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Liches" 
                },
                {   name: "Sovereign Presence", 
                    description: "Multiple Liches fighting together suffer -4 Mystic and cannot enter Apotheosis", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Liches" 
                }
            ],
            2: [],
            3: []

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
    skills: {
            1: [
                {   name: "The Soul Consigned", 
                    description: "Upon death, the souls of Empyreans return to the Well after 24 hours, resurrectable by Triune members", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Empyreans" 
                },
                {   name: "The Dawn's Spear", 
                    description: "Concentrated radiance attack; 1d14 melee (1-3 blocks) or 1d12 ranged (4-15 blocks)", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Empyreans" 
                },
                {   name: "The Divine Arms", 
                    description: "+2 bonus to all attack and defense rolls", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Empyreans" 
                },
                {   name: "The Nameless Foe", 
                    description: "In complete darkness: -4 malus to all attack/defense rolls", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Empyreans" 
                },
                {   name: "The Vigil's Call", 
                    description: "Must fulfill duty via judgment, persuasion, or keeper quests for respites", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Empyreans" 
                },
                {   name: "The Three-as-One", 
                    description: "+5 temporary HP when Triune starts combat together", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Empyreans" 
                },
                {   name: "The Penitent Flame", 
                    description: "Penance debuff deals damage equal to stack count at turn start", 
                    cooldown: "1 Turn",
                    actionType: "Action", 
                    link: "https://gearsofgaludonwiki.com/index.php/Empyreans" 
                },
                {   name: "The Flesh Forsaken", 
                    description: "Change forms at will (requires Vigil maintenance)", 
                    cooldown: "Passive",
                    actionType: "Passive", 
                    link: "https://gearsofgaludonwiki.com/index.php/Empyreans" 
                }
            ],
            2: [],
            3: []
        
    }
  }
];

// ============================================================================
// EXPORTS
// ============================================================================

// Export in the format expected by App.jsx
export const INITIAL_TALENTS = {
  constitution: CONSTITUTION_TALENTS,
  strength: STRENGTH_TALENTS,
  dexterity: DEXTERITY_TALENTS,
  scrutiny: SCRUTINY_TALENTS,
  mystics: MYSTIC_TALENTS,
  curses: CURSE_TALENTS
};

// Generate ABILITY_BONUSES map from talent data
// This extracts abilityBonuses from all talents into the old format for compatibility
export const ABILITY_BONUSES = {};

const allTalentArrays = [
  CONSTITUTION_TALENTS,
  STRENGTH_TALENTS,
  DEXTERITY_TALENTS,
  SCRUTINY_TALENTS,
  MYSTIC_TALENTS,
  CURSE_TALENTS
];

allTalentArrays.forEach(talentArray => {
  talentArray.forEach(talent => {
    if (talent.abilityBonuses) {
      ABILITY_BONUSES[talent.id] = talent.abilityBonuses;
    }
  });
});

// Generate FREE_TIERS map from talent data
// This extracts freeTiers from all talents
export const FREE_TIERS = {};

allTalentArrays.forEach(talentArray => {
  talentArray.forEach(talent => {
    if (talent.freeTiers) {
      FREE_TIERS[talent.id] = talent.freeTiers;
    }
  });
});

// ============================================================================
// UNIFIED TALENTS LOOKUP
// ============================================================================
// Optional: Use this if you want to look up any talent by ID across all categories

const ALL_TALENTS = {};

Object.entries(INITIAL_TALENTS).forEach(([category, talents]) => {
  talents.forEach(talent => {
    ALL_TALENTS[talent.id] = {
      ...talent,
      category
    };
  });
});

import React, { useState, useMemo, useCallback } from 'react';
import { Plus, Minus, AlertCircle, CheckCircle, BookOpen, User, Skull, Sword, Wind, Settings, Cog, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { INITIAL_SKILLS, TIER_BONUSES, BASE_POINTS } from './data/talents';

// Character Calculator Data Structure (imported from ./data/talents.js)

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================

// Attribute configuration - single source of truth for all attributes
const ATTRIBUTES = {
  constitution: {
    key: 'constitution',
    label: 'Constitution',
    icon: 'User',
    baseValue: 15,
    cap: 20,
    skillBonus: (tier) => 2 * tier - 1,
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
    skillBonus: (tier) => 2 * tier - 1,
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
    skillBonus: (tier) => 2 * tier - 1,
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
    skillBonus: (tier) => 2 * tier - 1,
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
    skillBonus: (tier) => Math.floor(tier * 4.5 + 0.5),
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
    skillBonus: (tier) => tier > 0 ? 20 : 0, // flat 20 for any tier > 0
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

// Error messages
const ERROR_MESSAGES = {
  MULTIPLE_MYSTICS: "A character can only know one Mystic path at a time.",
  MULTIPLE_CURSES: "A character can only suffer one curse at a time.",
  MULTIPLE_TIER3: "Multiple talents at Tier 3 require Virtuoso permission"
};

// Weapon damage progression by tier [0, 1, 2, 3]
const WEAPON_DAMAGE_PROGRESSION = {
  'finesse-weapons': ['1d6 (disadv)', '1d6', '1d10', '1d14'],
  'martial-weapons': ['1d8 (disadv)', '1d8', '1d12', '1d16'],
  'heavy-weapons': ['1d10 (disadv)', '1d10', '1d14', '1d18'],
  'improvised-unarmed': ['1d5 (disadv)', '1d5', '1d8', '1d10'],
  'ranged-traditional': ['1d6 (disadv)', '1d6', '1d10', '1d14'],
  'ranged-firearms': ['1d8 (disadv)', '1d8', '1d12', '1d16']
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Calculate attribute total with detailed breakdown
function calculateAttributeTotal(config, skillsArray, tierBonus, wieldingBonus = 0, lichActive = false) {
  const skillDetails = skillsArray
    .filter(s => s.tier > 0 && s.tier <= 3)
    .map(s => ({
      name: s.name,
      tier: s.tier,
      bonus: config.skillBonus(s.tier)
    }));

  const fromSkills = skillDetails.reduce((sum, s) => sum + s.bonus, 0);
  const raw = config.baseValue + fromSkills + tierBonus + wieldingBonus;

  // Apply caps (handle Lich dexterity special case)
  let cap = config.cap;
  if (lichActive && config.lichCap) {
    cap = config.lichCap;
  }

  const total = Math.min(cap, raw);

  return {
    total,
    raw,
    skillDetails,
    fromSkills,
    tierBonus,
    wieldingBonus,
    capped: raw > cap,
    cap,
    lichCap: lichActive && config.lichCap ? config.lichCap : null
  };
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

// CollapsibleSection - Reusable collapsible section for reference sheet
const CollapsibleSection = React.memo(({ title, isCollapsed, onToggle, children, count, icon, displayValue, displayValueLabel, onDisplayValueChange }) => {
  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="collapsible-section">
      <div className="collapsible-header" onClick={onToggle}>
        <h3 className="collapsible-title">
          {icon && <span className="collapsible-icon">{icon}</span>}
          {title}
          {count !== undefined && <span className="section-count"> ({count})</span>}
        </h3>
        <div className="collapsible-header-right">
          {displayValue !== undefined && onDisplayValueChange && (
            <div className="collapsible-display-value" onClick={handleInputClick}>
              {displayValueLabel && <label className="collapsible-input-label">{displayValueLabel}</label>}
              <input
                type="text"
                value={displayValue}
                onChange={onDisplayValueChange}
                onClick={handleInputClick}
                placeholder="Enter name"
                className="collapsible-input"
              />
            </div>
          )}
          <div className="collapse-icon">
            {isCollapsed ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
          </div>
        </div>
      </div>
      {!isCollapsed && (
        <div className="collapsible-content">
          {children}
        </div>
      )}
    </div>
  );
});

// StatTooltip - Reusable tooltip for attribute breakdowns
const StatTooltip = React.memo(({ breakdown, wieldingText = null, lichCapText = null }) => (
  <div className="section-tooltip">
    <div className="tooltip-row">Base: {breakdown.base}</div>
    {breakdown.skillDetails && breakdown.skillDetails.length > 0 && (
      <>
        <div className="tooltip-row">From Skills: +{breakdown.fromSkills}</div>
        {breakdown.skillDetails.map((detail, i) => (
          <div key={i} className="tooltip-subrow">
            • {detail.name}, T{detail.tier}: +{detail.bonus}
          </div>
        ))}
      </>
    )}
    {breakdown.tierBonuses > 0 && (
      <>
        <div className="tooltip-row">Tier Bonuses: +{breakdown.tierBonuses}</div>
        {breakdown.tierDetails && breakdown.tierDetails.map((detail, i) => (
          <div key={i} className="tooltip-subrow">
            • {detail.name}, T{detail.tier}: +{detail.bonus}
          </div>
        ))}
      </>
    )}
    {wieldingText && breakdown.wielding > 0 && (
      <div className="tooltip-row">{wieldingText}: +{breakdown.wielding}</div>
    )}
    {lichCapText && (
      <div className="tooltip-row tooltip-warning">{lichCapText}</div>
    )}
    {breakdown.capped && (
      <div className="tooltip-row tooltip-warning">
        Capped at {breakdown.lichCap || breakdown.cap || 20}
      </div>
    )}
  </div>
));

// StatCard - Reusable stat card for reference sheet
const StatCard = React.memo(({ attributeKey, total, breakdown, wieldingText = null, lichCapText = null }) => {
  const config = ATTRIBUTES[attributeKey];

  return (
    <div className={`stat-card stat-card-${attributeKey}`}>
      <div className="stat-label">{config.label}</div>
      <div className="stat-value">{total}</div>
      <div className="stat-tooltip">
        <StatTooltip
          breakdown={breakdown}
          wieldingText={wieldingText}
          lichCapText={lichCapText}
        />
      </div>
    </div>
  );
});

// TalentCard - Simple display of talent name and tier
const TalentCard = React.memo(({ skill }) => {
  return (
    <div className="talent-card">
      <div className="talent-name">
        {skill.name}
        {skill.subclass && <span className="talent-subclass"> - {skill.subclass}</span>}
      </div>
      <div className="talent-tier">
        <div className="tier-dots">
          {[1, 2, 3].map(i => (
            <span key={i} className={`dot ${i <= skill.tier ? 'filled' : ''}`} />
          ))}
        </div>
        <span className="tier-text">Tier {skill.tier}</span>
      </div>
    </div>
  );
});

// SkillAbilityCard - Displays individual skill with talent source
const SkillAbilityCard = ({ ability, talentName, tier, isExpanded, onToggle }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <div className="skill-ability-card">
      <div className="skill-ability-header" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <div className="skill-ability-main">
          <div className="skill-ability-name">{ability.name}</div>
          <div className="skill-ability-source">From: {talentName} T{tier}</div>
        </div>
        <div className="skill-expand-icon">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isExpanded && (
        <div className="skill-ability-content">
          <div className="skill-ability-description">{ability.description}</div>
        </div>
      )}
    </div>
  );
};

// SkillSection - Reusable section component for each attribute
const SkillSection = React.memo(({
  attributeKey,
  skills,
  stats,
  updateSkill,
  updateSkillName,
  updateSkillSubclass,
  virtuoso
}) => {
  const config = ATTRIBUTES[attributeKey];

  // Map icon names to actual icon components
  const IconComponent = {
    'User': User,
    'Sword': Sword,
    'Wind': Wind,
    'BookOpen': BookOpen,
    'Sparkles': Sparkles,
    'Skull': Skull
  }[config.icon];

  const breakdown = stats.breakdowns[attributeKey];
  const total = stats[`${attributeKey}Total`];
  const categorySkills = skills[config.key];

  // Determine special tooltip text
  let wieldingText = null;
  if (attributeKey === 'strength' && breakdown.wielding > 0) {
    wieldingText = 'Wielding Heavy';
  } else if (attributeKey === 'dexterity' && breakdown.wielding > 0) {
    wieldingText = 'Wielding Finesse';
  }

  const lichCapText = attributeKey === 'dexterity' && breakdown.lichCap
    ? `Lich Curse: Capped at ${breakdown.lichCap}`
    : null;

  return (
    <section className={`skill-section section-${attributeKey}`}>
      <h2>
        <IconComponent size={24} />
        {config.sectionTitle}
        <span className="section-total-wrapper">
          <span className="section-total">
            <span className="section-total-label">Total:</span>
            <span className="section-total-value">{total}</span>
          </span>
          <StatTooltip
            breakdown={breakdown}
            wieldingText={wieldingText}
            lichCapText={lichCapText}
          />
        </span>
      </h2>
      <div className="skills-grid">
        {categorySkills.map(skill => {
          const cost = skill.cost || 1;
          const canAffordIncrease = stats.remaining >= cost;
          return (
            <SkillRow
              key={skill.id}
              skill={skill}
              category={config.key}
              updateSkill={updateSkill}
              updateSkillName={updateSkillName}
              updateSkillSubclass={updateSkillSubclass}
              tier3Count={stats.tier3Count}
              canAffordIncrease={canAffordIncrease}
              virtuoso={virtuoso}
              hasMysticsError={stats.hasMysticsError}
              hasCursesError={stats.hasCursesError}
              mysticsWithTiersCount={stats.mysticsWithTiersCount}
              cursesWithTiersCount={stats.cursesWithTiersCount}
            />
          );
        })}
      </div>
    </section>
  );
});

// SkillRow component - moved outside to prevent recreation on each render
const SkillRow = React.memo(({ skill, category, updateSkill, updateSkillName, updateSkillSubclass, tier3Count, canAffordIncrease, virtuoso, hasMysticsError, hasCursesError, mysticsWithTiersCount, cursesWithTiersCount }) => {
  const hasTier3Error = skill.tier >= 3 && tier3Count > 1 && !virtuoso;
  const isMystic = category === 'mystics';
  const isCurse = skill.cost === 3;
  const hasMysticError = isMystic && skill.tier > 0 && hasMysticsError;
  const hasCurseError = isCurse && skill.tier > 0 && hasCursesError;
  const hasAnyError = hasTier3Error || hasMysticError || hasCurseError;
  const cost = skill.cost || 1;

  // Disable increase button if at limit and this skill has no tiers
  const isBlockedByMysticLimit = isMystic && skill.tier === 0 && mysticsWithTiersCount >= 2;
  const isBlockedByCurseLimit = isCurse && skill.tier === 0 && cursesWithTiersCount >= 2;

  const handleSubclassChange = useCallback((e) => {
    updateSkillSubclass(category, skill.id, e.target.value);
  }, [category, skill.id, updateSkillSubclass]);

  // Parse editable skill names to separate prefix from subject
  const getEditableParts = (name) => {
    // If name is empty, use placeholder to determine prefix
    if (!name && skill.placeholder) {
      const match = skill.placeholder.match(/^(The Arts|Academics)\s+(.*)$/);
      if (match) {
        return { prefix: match[1], subject: '' };
      }
    }
    // Match pattern like "The Arts Subject 1" or "Academics Subject 1"
    const match = name.match(/^(The Arts|Academics)\s+(.+)$/);
    if (match) {
      return { prefix: match[1], subject: match[2].trim() };
    }
    // If just "The Arts" or "Academics" without subject, return empty subject
    if (name === 'The Arts' || name.trim() === 'The Arts') {
      return { prefix: 'The Arts', subject: '' };
    }
    if (name === 'Academics' || name.trim() === 'Academics') {
      return { prefix: 'Academics', subject: '' };
    }
    return { prefix: '', subject: name };
  };

  const parts = getEditableParts(skill.name);
  const [localSubject, setLocalSubject] = React.useState(parts.subject);

  // Update local state when skill.name changes from external source
  React.useEffect(() => {
    setLocalSubject(parts.subject);
  }, [skill.name]);

  const handleSubjectChange = (e) => {
    setLocalSubject(e.target.value);
  };

  const saveChanges = () => {
    const trimmedSubject = localSubject.trim();
    // Don't save if subject is empty - revert to original
    if (!trimmedSubject) {
      setLocalSubject(parts.subject);
      return;
    }
    const newName = `${parts.prefix} ${trimmedSubject}`;
    if (newName !== skill.name) {
      updateSkillName(category, skill.id, newName);
    }
  };

  const handleBlur = () => {
    saveChanges();
  };

  const handleKeyDown = React.useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedSubject = localSubject.trim();
      // Don't save if subject is empty - revert to original
      if (!trimmedSubject) {
        setLocalSubject(parts.subject);
        e.target.blur();
        return;
      }
      const newName = `${parts.prefix} ${trimmedSubject}`;
      if (newName !== skill.name) {
        updateSkillName(category, skill.id, newName);
      }
      e.target.blur();
    }
  }, [parts.prefix, parts.subject, localSubject, skill.name, skill.id, category, updateSkillName]);

  const handleDecreaseClick = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    updateSkill(category, skill.id, -1);
  }, [category, skill.id, updateSkill]);

  const handleIncreaseClick = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    updateSkill(category, skill.id, 1);
  }, [category, skill.id, updateSkill]);

  // Generate error message for tooltip
  const getErrorMessage = () => {
    if (hasMysticError) {
      return ERROR_MESSAGES.MULTIPLE_MYSTICS;
    }
    if (hasCurseError) {
      return ERROR_MESSAGES.MULTIPLE_CURSES;
    }
    if (hasTier3Error) {
      return ERROR_MESSAGES.MULTIPLE_TIER3;
    }
    return "";
  };

  return (
    <div className={`skill-row ${hasAnyError ? 'error' : ''} ${skill.tier > 0 ? 'active' : ''}`}>
      <div className="skill-name-container">
        <div className="skill-name">
          {skill.editable ? (
            <>
              <span>{parts.prefix} </span>
              <input
                type="text"
                value={localSubject}
                onChange={handleSubjectChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="skill-name-input"
                placeholder={skill.placeholder ? skill.placeholder.replace(/^(The Arts|Academics)\s+/, '') : "Enter subject"}
              />
            </>
          ) : (
            <span>{skill.name}</span>
          )}
          {cost > 1 && <span className="skill-cost">({cost} pts)</span>}
        </div>
        {isCurse && skill.subclassOptions && skill.tier > 0 && (
          <div className="skill-subclass-wrapper">
            <span className="skill-subclass-arrow">└</span>
            <select
              value={skill.subclass}
              onChange={handleSubclassChange}
              className="skill-subclass-select"
            >
              <option value="">{skill.subclassPrompt || 'Select Subclass...'}</option>
              {skill.subclassOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      {hasAnyError && (
        <div className="skill-error-tooltip">
          {getErrorMessage()}
        </div>
      )}

      <div className="skill-controls">
        <div className={`skill-tier ${skill.tier > 0 ? 'has-points' : ''}`}>
          <span className="tier-label">Tier</span>
          <span className="tier-value">{skill.tier}</span>
        </div>

        <button
          type="button"
          onClick={handleDecreaseClick}
          disabled={skill.tier === 0}
          className="skill-btn"
          aria-label="Decrease"
        >
          <Minus size={16} />
        </button>

        <button
          type="button"
          onClick={handleIncreaseClick}
          disabled={skill.tier === 3 || !canAffordIncrease || isBlockedByMysticLimit || isBlockedByCurseLimit}
          className="skill-btn"
          aria-label="Increase"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for React.memo
  // Return true if props are equal (don't re-render)
  // Return false if props are different (do re-render)
  return (
    prevProps.skill.id === nextProps.skill.id &&
    prevProps.skill.name === nextProps.skill.name &&
    prevProps.skill.tier === nextProps.skill.tier &&
    prevProps.skill.cost === nextProps.skill.cost &&
    prevProps.skill.editable === nextProps.skill.editable &&
    prevProps.skill.placeholder === nextProps.skill.placeholder &&
    prevProps.skill.subclass === nextProps.skill.subclass &&
    prevProps.category === nextProps.category &&
    prevProps.tier3Count === nextProps.tier3Count &&
    prevProps.canAffordIncrease === nextProps.canAffordIncrease &&
    prevProps.virtuoso === nextProps.virtuoso &&
    prevProps.hasMysticsError === nextProps.hasMysticsError &&
    prevProps.hasCursesError === nextProps.hasCursesError &&
    prevProps.mysticsWithTiersCount === nextProps.mysticsWithTiersCount &&
    prevProps.cursesWithTiersCount === nextProps.cursesWithTiersCount &&
    prevProps.updateSkill === nextProps.updateSkill &&
    prevProps.updateSkillName === nextProps.updateSkillName &&
    prevProps.updateSkillSubclass === nextProps.updateSkillSubclass
  );
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function GaludonCalculator() {
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [extraPoints, setExtraPoints] = useState(0);
  const [virtuoso, setVirtuoso] = useState(false);
  const [characterName, setCharacterName] = useState('');
  const [activeTab, setActiveTab] = useState('character');
  const [primaryWeapon, setPrimaryWeapon] = useState('');
  const [secondaryWeapon, setSecondaryWeapon] = useState('');
  const [wieldingFinesse, setWieldingFinesse] = useState(false);
  const [wieldingHeavy, setWieldingHeavy] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({
    activeWeapon: false,
    passiveWeapon: false,
    talents: false,
    talentSkills: false,
    scrutinySkills: false,
    magicGrimoire: false,
    cursedTraits: false,
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

  // Calculate stats
  const stats = useMemo(() => {
    const allSkills = [...skills.constitution, ...skills.strength, ...skills.dexterity, ...skills.scrutiny, ...skills.mystics, ...skills.curses];

    // Calculate total spent - curses cost 3 points flat if tier >= 1
    const totalSpent = allSkills.reduce((sum, skill) => {
      const cost = skill.cost || 1;
      // Curses (cost = 3) are all-or-nothing: 3 points if tier >= 1, 0 otherwise
      if (cost === 3 && skill.tier >= 1) {
        // Lich with Mortanum subclass costs 0 points
        if (skill.id === 'lich' && skill.subclass === 'Mortanum') {
          return sum;
        }
        return sum + 3;
      }
      return sum + (skill.tier * cost);
    }, 0);

    const remaining = BASE_POINTS + extraPoints - totalSpent;
    const tier3Count = allSkills.filter(s => s.tier >= 3).length;
    const hasError = tier3Count > 1 && !virtuoso;

    // Count mystics and curses with tiers
    const mysticsWithTiersCount = skills.mystics.filter(s => s.tier > 0).length;
    const cursesWithTiersCount = skills.curses.filter(s => s.tier > 0).length;
    const hasMysticsError = mysticsWithTiersCount > 1;
    const hasCursesError = cursesWithTiersCount > 1;

    // Calculate tier bonuses for all skills with detailed breakdown
    const calculateTierBonuses = () => {
      const bonuses = {
        constitution: 0,
        strength: 0,
        dexterity: 0,
        scrutiny: 0,
        mystics: 0
      };
      const breakdowns = {
        constitution: [],
        strength: [],
        dexterity: [],
        scrutiny: [],
        mystics: []
      };

      allSkills.forEach(skill => {
        if (skill.tier > 0 && TIER_BONUSES[skill.id]) {
          const tierBonus = TIER_BONUSES[skill.id][skill.tier];
          if (tierBonus) {
            Object.keys(tierBonus).forEach(attr => {
              bonuses[attr] += tierBonus[attr];
              breakdowns[attr].push({ name: skill.name, tier: skill.tier, bonus: tierBonus[attr] });
            });
          }
        }
      });

      return { bonuses, breakdowns };
    };

    const { bonuses: tierBonuses, breakdowns: tierBreakdowns } = calculateTierBonuses();

    // Check if Lich curse is active
    const lichCurse = skills.curses.find(c => c.id === 'lich');
    const isLichActive = lichCurse && lichCurse.tier > 0;

    // Calculate ability totals using helper function
    const constitutionResult = calculateAttributeTotal(
      ATTRIBUTES.constitution,
      skills.constitution,
      tierBonuses.constitution
    );
    const constitutionTotal = constitutionResult.total;
    const constitutionSkillDetails = constitutionResult.skillDetails;
    const constitutionFromSkills = constitutionResult.fromSkills;
    const constitutionRaw = constitutionResult.raw;

    const strengthResult = calculateAttributeTotal(
      ATTRIBUTES.strength,
      skills.strength,
      tierBonuses.strength,
      wieldingHeavy ? 2 : 0
    );
    const strengthTotal = strengthResult.total;
    const strengthSkillDetails = strengthResult.skillDetails;
    const strengthFromSkills = strengthResult.fromSkills;
    const strengthRaw = strengthResult.raw;
    const strengthWieldingBonus = strengthResult.wieldingBonus;

    const dexterityResult = calculateAttributeTotal(
      ATTRIBUTES.dexterity,
      skills.dexterity,
      tierBonuses.dexterity,
      wieldingFinesse ? 2 : 0,
      isLichActive
    );
    const dexterityTotal = dexterityResult.total;
    const dexteritySkillDetails = dexterityResult.skillDetails;
    const dexterityFromSkills = dexterityResult.fromSkills;
    const dexterityRaw = dexterityResult.raw;
    const dexterityWieldingBonus = dexterityResult.wieldingBonus;

    const scrutinyResult = calculateAttributeTotal(
      ATTRIBUTES.scrutiny,
      skills.scrutiny,
      tierBonuses.scrutiny
    );
    const scrutinyTotal = scrutinyResult.total;
    const scrutinySkillDetails = scrutinyResult.skillDetails;
    const scrutinyFromSkills = scrutinyResult.fromSkills;
    const scrutinyRaw = scrutinyResult.raw;

    const mysticsResult = calculateAttributeTotal(
      ATTRIBUTES.mystics,
      skills.mystics,
      tierBonuses.mystics
    );
    const mysticsTotal = mysticsResult.total;
    const mysticsSkillDetails = mysticsResult.skillDetails;
    const mysticsFromSkills = mysticsResult.fromSkills;
    const mysticsRaw = mysticsResult.raw;

    const cursedResult = calculateAttributeTotal(
      ATTRIBUTES.cursed,
      skills.curses,
      0  // curses don't get tier bonuses
    );
    const cursedTotal = cursedResult.total;
    const cursedSkillDetails = cursedResult.skillDetails;
    const cursedFromSkills = cursedResult.fromSkills;

    return {
      totalSpent,
      remaining,
      tier3Count,
      hasError,
      mysticsWithTiersCount,
      cursesWithTiersCount,
      hasMysticsError,
      hasCursesError,
      constitutionTotal,
      strengthTotal,
      dexterityTotal,
      scrutinyTotal,
      mysticsTotal,
      cursedTotal,
      canSpend: remaining > 0,
      // Breakdowns for tooltips
      breakdowns: {
        constitution: {
          base: ATTRIBUTES.constitution.baseValue,
          fromSkills: constitutionFromSkills,
          skillDetails: constitutionSkillDetails,
          tierBonuses: tierBonuses.constitution,
          tierDetails: tierBreakdowns.constitution,
          total: constitutionTotal,
          capped: constitutionResult.capped,
          cap: constitutionResult.cap
        },
        strength: {
          base: ATTRIBUTES.strength.baseValue,
          fromSkills: strengthFromSkills,
          skillDetails: strengthSkillDetails,
          tierBonuses: tierBonuses.strength,
          tierDetails: tierBreakdowns.strength,
          wielding: strengthWieldingBonus,
          total: strengthTotal,
          capped: strengthResult.capped,
          cap: strengthResult.cap
        },
        dexterity: {
          base: ATTRIBUTES.dexterity.baseValue,
          fromSkills: dexterityFromSkills,
          skillDetails: dexteritySkillDetails,
          tierBonuses: tierBonuses.dexterity,
          tierDetails: tierBreakdowns.dexterity,
          wielding: dexterityWieldingBonus,
          lichCap: dexterityResult.lichCap,
          total: dexterityTotal,
          capped: dexterityResult.capped,
          cap: dexterityResult.cap
        },
        scrutiny: {
          base: ATTRIBUTES.scrutiny.baseValue,
          fromSkills: scrutinyFromSkills,
          skillDetails: scrutinySkillDetails,
          tierBonuses: tierBonuses.scrutiny,
          tierDetails: tierBreakdowns.scrutiny,
          total: scrutinyTotal,
          capped: scrutinyResult.capped,
          cap: scrutinyResult.cap
        },
        mystics: {
          base: ATTRIBUTES.mystics.baseValue,
          fromSkills: mysticsFromSkills,
          skillDetails: mysticsSkillDetails,
          tierBonuses: tierBonuses.mystics,
          tierDetails: tierBreakdowns.mystics,
          total: mysticsTotal,
          capped: mysticsResult.capped,
          cap: mysticsResult.cap
        },
        cursed: {
          base: ATTRIBUTES.cursed.baseValue,
          fromSkills: cursedFromSkills,
          skillDetails: cursedSkillDetails,
          total: cursedTotal,
          capped: cursedResult.capped,
          cap: cursedResult.cap
        }
      }
    };
  }, [skills, extraPoints, virtuoso, wieldingFinesse, wieldingHeavy]);

  const updateSkill = useCallback((category, skillId, delta) => {
    setSkills(prev => {
      const skill = prev[category].find(s => s.id === skillId);
      if (!skill) return prev;

      const cost = skill.cost || 1;
      const isCurse = cost === 3;
      const isMystic = category === 'mystics';

      // Check for mutual exclusivity - allow up to 2 mystics and 2 curses
      if (delta > 0 && skill.tier === 0) {
        // Check if trying to add tiers to a mystic when 2 other mystics already have tiers
        if (isMystic) {
          const mysticsWithTiers = prev.mystics.filter(s => s.tier > 0);
          if (mysticsWithTiers.length >= 2) {
            return prev; // Block: already have 2 mystics with tiers
          }
        }

        // Check if trying to add tiers to a curse when 2 other curses already have tiers
        if (isCurse) {
          const cursesWithTiers = prev.curses.filter(s => s.tier > 0);
          if (cursesWithTiers.length >= 2) {
            return prev; // Block: already have 2 curses with tiers
          }
        }
      }

      const allSkills = [...prev.constitution, ...prev.strength, ...prev.dexterity, ...prev.scrutiny, ...prev.mystics, ...prev.curses];

      // Calculate total spent with curse special rule
      const totalSpent = allSkills.reduce((sum, s) => {
        const sCost = s.cost || 1;
        if (sCost === 3 && s.tier >= 1) {
          return sum + 3;
        }
        return sum + (s.tier * sCost);
      }, 0);

      const remaining = BASE_POINTS + extraPoints - totalSpent;

      return {
        ...prev,
        [category]: prev[category].map(s => {
          if (s.id === skillId) {
            let newTier;

            // Curses are all-or-nothing: tier 0 or tier 3
            if (isCurse) {
              if (delta > 0 && s.tier === 0) {
                // Check if we have 3 points available
                if (remaining < 3) return s;
                newTier = 3; // Jump straight to tier 3
              } else if (delta < 0) {
                newTier = 0; // Go straight to 0
              } else {
                return s; // Already at tier 3, can't increase further
              }
            } else {
              // Normal skills: increment/decrement normally
              newTier = Math.max(0, Math.min(3, s.tier + delta));
              // Check if we have enough points
              if (delta > 0 && remaining < cost) return s;
            }

            return { ...s, tier: newTier };
          }
          return s;
        })
      };
    });
  }, [extraPoints]);

  const updateSkillName = useCallback((category, skillId, newName) => {
    setSkills(prev => ({
      ...prev,
      [category]: prev[category].map(skill =>
        skill.id === skillId ? { ...skill, name: newName } : skill
      )
    }));
  }, []);

  const updateSkillSubclass = useCallback((category, skillId, newSubclass) => {
    setSkills(prev => ({
      ...prev,
      [category]: prev[category].map(skill =>
        skill.id === skillId ? { ...skill, subclass: newSubclass } : skill
      )
    }));
  }, []);

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

  const resetToDefaults = useCallback(() => {
    setSkills(INITIAL_SKILLS);
    setExtraPoints(0);
    setVirtuoso(false);
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

  const scrollToSection = (sectionClass) => {
    const section = document.querySelector(`.${sectionClass}`);
    if (section) {
      const yOffset = -80; // Offset for sticky menu height
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const CharacterSheet = useMemo(() => (
    <div className="character-sheet">
      {/* Validation Warnings */}
      {stats.hasError && (
        <div className="alert alert-error">
          <AlertCircle size={20} />
          <div>
            <strong>Virtuoso Permission Required!</strong>
            <p>You have {stats.tier3Count} talents at Tier 3. Enable Virtuoso permission or reduce talents to max 1 at Tier 3.</p>
          </div>
        </div>
      )}

      {stats.remaining < 0 && (
        <div className="alert alert-error">
          <AlertCircle size={20} />
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
          icon={<BookOpen size={28} />}
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
      <SkillSection
        attributeKey="constitution"
        skills={skills}
        stats={stats}
        updateSkill={updateSkill}
        updateSkillName={updateSkillName}
        updateSkillSubclass={updateSkillSubclass}
        virtuoso={virtuoso}
      />

      <SkillSection
        attributeKey="strength"
        skills={skills}
        stats={stats}
        updateSkill={updateSkill}
        updateSkillName={updateSkillName}
        updateSkillSubclass={updateSkillSubclass}
        virtuoso={virtuoso}
      />

      <SkillSection
        attributeKey="dexterity"
        skills={skills}
        stats={stats}
        updateSkill={updateSkill}
        updateSkillName={updateSkillName}
        updateSkillSubclass={updateSkillSubclass}
        virtuoso={virtuoso}
      />

      <SkillSection
        attributeKey="scrutiny"
        skills={skills}
        stats={stats}
        updateSkill={updateSkill}
        updateSkillName={updateSkillName}
        updateSkillSubclass={updateSkillSubclass}
        virtuoso={virtuoso}
      />

      <SkillSection
        attributeKey="mystics"
        skills={skills}
        stats={stats}
        updateSkill={updateSkill}
        updateSkillName={updateSkillName}
        updateSkillSubclass={updateSkillSubclass}
        virtuoso={virtuoso}
      />

      <SkillSection
        attributeKey="cursed"
        skills={skills}
        stats={stats}
        updateSkill={updateSkill}
        updateSkillName={updateSkillName}
        updateSkillSubclass={updateSkillSubclass}
        virtuoso={virtuoso}
      />

      {/* Copyright Footer */}
      <footer className="copyright-footer">
        <div className="copyright-content">
          <p>&copy; {new Date().getFullYear()} A Gears of Galudon Character Calculator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  ), [skills, stats, virtuoso, updateSkill, updateSkillName, updateSkillSubclass, collapsedSections, toggleSection,
      characterName, race, age, pronouns, sexuality,
      hairColor, skinColor, eyeColor, height, weight, clothingDescription, geneticMutations, prosthetics, bodyMods]);

  const ReferenceSheet = useMemo(() => {
    const activeSkills = [...skills.constitution, ...skills.strength, ...skills.dexterity, ...skills.scrutiny, ...skills.mystics, ...skills.curses]
      .filter(s => s.tier > 0)
      .sort((a, b) => b.tier - a.tier || a.name.localeCompare(b.name));

    return (
      <div className="reference-sheet">
        <div className="ref-header">
          <h2>⚙ CHARACTER REFERENCE ⚙</h2>
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

        {stats.hasError && (
          <div className="alert error">
            <AlertCircle size={20} />
            <span>Multiple Tier 3 talents require Virtuoso permission!</span>
          </div>
        )}

        {!stats.hasError && stats.tier3Count > 1 && (
          <div className="alert success">
            <CheckCircle size={20} />
            <span>Virtuoso permission active - {stats.tier3Count} Tier 3 talents allowed</span>
          </div>
        )}

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
            
            {(skills.strength[0].tier > 0 || skills.strength[2].tier > 0) && (
              <div className="wielding-types">
                {skills.strength[0].tier > 0 && (
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
                {skills.strength[2].tier > 0 && (
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
            {skills.strength.map(weaponSkill => {
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
                          <CheckCircle size={20} />
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
          {/* Active Weapon Skills - Weapons being actively wielded */}
          {(() => {
                const activeWeapons = skills.strength.filter(s => s.tier > 0);
                const wielding = activeWeapons.filter(w =>
                  (w.id === 'finesse-weapons' && wieldingFinesse) ||
                  (w.id === 'heavy-weapons' && wieldingHeavy)
                );
                return wielding.length > 0 && (
                  <CollapsibleSection
                    title="⚔ Active Weapon Skills"
                    isCollapsed={collapsedSections.activeWeapon}
                    onToggle={() => toggleSection('activeWeapon')}
                    count={wielding.length}
                  >
                    <div className="talents-list">
                      {wielding.map(skill => (
                        <div key={skill.id} className="talent-card">
                          <div className="talent-name">{skill.name}</div>
                          <div className="talent-tier">
                            <div className="tier-dots">
                              {[1, 2, 3].map(i => (
                                <span key={i} className={`dot ${i <= skill.tier ? 'filled' : ''}`} />
                              ))}
                            </div>
                            <span className="tier-text">Tier {skill.tier}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleSection>
                );
              })()}

              {/* Passive Weapon Skills - Weapons trained but not actively wielded */}
              {(() => {
                const passiveWeapons = skills.strength.filter(s => s.tier > 0 &&
                  !((s.id === 'finesse-weapons' && wieldingFinesse) ||
                    (s.id === 'heavy-weapons' && wieldingHeavy))
                );
                return passiveWeapons.length > 0 && (
                  <CollapsibleSection
                    title="🛡 Passive Weapon Skills"
                    isCollapsed={collapsedSections.passiveWeapon}
                    onToggle={() => toggleSection('passiveWeapon')}
                    count={passiveWeapons.length}
                  >
                    <div className="talents-list">
                      {passiveWeapons.map(skill => (
                        <div key={skill.id} className="talent-card">
                          <div className="talent-name">{skill.name}</div>
                          <div className="talent-tier">
                            <div className="tier-dots">
                              {[1, 2, 3].map(i => (
                                <span key={i} className={`dot ${i <= skill.tier ? 'filled' : ''}`} />
                              ))}
                            </div>
                            <span className="tier-text">Tier {skill.tier}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleSection>
                );
              })()}

              {/* Talents - Constitution and Dexterity */}
              {(() => {
                const constitutionTalents = skills.constitution.filter(s => s.tier > 0);
                const dexterityTalents = skills.dexterity.filter(s => s.tier > 0);
                const talents = [...constitutionTalents, ...dexterityTalents];

                return talents.length > 0 && (
                  <CollapsibleSection
                    title="⚙ Talents"
                    isCollapsed={collapsedSections.talents}
                    onToggle={() => toggleSection('talents')}
                    count={talents.length}
                  >
                    <div className="talents-list">
                      {talents.map(skill => (
                        <TalentCard key={skill.id} skill={skill} />
                      ))}
                    </div>
                  </CollapsibleSection>
                );
              })()}

              {/* Skills from Talents */}
              {(() => {
                const constitutionTalents = skills.constitution.filter(s => s.tier > 0);
                const dexterityTalents = skills.dexterity.filter(s => s.tier > 0);
                const allTalents = [...constitutionTalents, ...dexterityTalents];

                // Aggregate all abilities from all talents
                const allSkillAbilities = [];
                allTalents.forEach(talent => {
                  for (let tier = 1; tier <= talent.tier; tier++) {
                    const abilities = talent.abilities?.[tier] || [];
                    abilities.forEach((ability, idx) => {
                      // Only include abilities with non-empty names
                      if (ability.name && ability.name.trim() !== '') {
                        allSkillAbilities.push({
                          id: `${talent.id}-${tier}-${idx}`,
                          ability,
                          talentName: talent.name,
                          tier: tier
                        });
                      }
                    });
                  }
                });

                return allSkillAbilities.length > 0 && (
                  <CollapsibleSection
                    title="📚 Skills"
                    isCollapsed={collapsedSections.talentSkills}
                    onToggle={() => toggleSection('talentSkills')}
                    count={allSkillAbilities.length}
                  >
                    <div className="talents-list">
                      {allSkillAbilities.map(({ id, ability, talentName, tier }) => (
                        <SkillAbilityCard
                          key={id}
                          ability={ability}
                          talentName={talentName}
                          tier={tier}
                          isExpanded={!!expandedSkills[id]}
                          onToggle={() => toggleSkill(id)}
                        />
                      ))}
                    </div>
                  </CollapsibleSection>
                );
              })()}

              {/* Magic Grimoire - Mystics */}
              {(() => {
                const grimoire = skills.mystics.filter(s => s.tier > 0);
                return grimoire.length > 0 && (
                  <CollapsibleSection
                    title="✨ Magic Grimoire"
                    isCollapsed={collapsedSections.magicGrimoire}
                    onToggle={() => toggleSection('magicGrimoire')}
                    count={grimoire.length}
                  >
                    <div className="talents-list">
                      {grimoire.map(skill => (
                        <TalentCard key={skill.id} skill={skill} />
                      ))}
                    </div>
                  </CollapsibleSection>
                );
              })()}

              {/* Cursed Traits - Curses */}
              {(() => {
                const cursed = skills.curses.filter(s => s.tier > 0);
                return cursed.length > 0 && (
                  <CollapsibleSection
                    title="💀 Cursed Traits"
                    isCollapsed={collapsedSections.cursedTraits}
                    onToggle={() => toggleSection('cursedTraits')}
                    count={cursed.length}
                  >
                    <div className="talents-list">
                      {cursed.map(skill => (
                        <TalentCard key={skill.id} skill={skill} />
                      ))}
                    </div>
                  </CollapsibleSection>
                );
              })()}
        </div>

        {stats.hasError && (
          <div className="ref-warning">
            <AlertCircle size={20} />
            <span>Multiple Tier 3 talents require Virtuoso permission</span>
          </div>
        )}

        {stats.remaining === 0 && !stats.hasError && activeSkills.length > 0 && (
          <div className="ref-success">
            <CheckCircle size={20} />
            <span>Character build complete and valid!</span>
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
  }, [skills, stats, wieldingFinesse, wieldingHeavy, collapsedSections, toggleSection, expandedSkills, toggleSkill]);

  const SettingsSheet = useMemo(() => (
    <div className="settings-sheet">
      <h1 className="sheet-title"> <Cog size={24} /> Settings <Cog size={24} /> </h1>

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

      <div className="reset-section">
        <button onClick={resetToDefaults} className="reset-btn">
          <AlertCircle size={24} />
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
  ), [extraPoints, virtuoso, showResetSuccess, resetToDefaults]);

  return (
    <div className="galudon-calculator">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;600;700&family=Bebas+Neue&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .galudon-calculator {
          min-height: 100vh;
          background:
            linear-gradient(135deg, #3d3529 0%, #2d2520 50%, #1f1a16 100%);
          color: #e8dcc8;
          font-family: 'Rajdhani', sans-serif;
          padding: 2rem;
          position: relative;
        }

        .galudon-calculator::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200, 169, 107, 0.02) 2px, rgba(200, 169, 107, 0.02) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(200, 169, 107, 0.02) 2px, rgba(200, 169, 107, 0.02) 4px),
            radial-gradient(ellipse at 30% 40%, rgba(200, 169, 107, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 60%, rgba(171, 133, 75, 0.06) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .galudon-calculator::after {
          content: '';
          position: fixed;
          top: 50%;
          left: 50%;
          width: 800px;
          height: 800px;
          transform: translate(-50%, -50%);
          background: 
            radial-gradient(circle, transparent 35%, rgba(0, 0, 0, 0.4) 100%),
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="100" cy="100" r="85" fill="none" stroke="rgba(200,169,107,0.03)" stroke-width="2"/><circle cx="100" cy="100" r="75" fill="none" stroke="rgba(171,133,75,0.04)" stroke-width="1.5"/><circle cx="100" cy="100" r="65" fill="none" stroke="rgba(200,169,107,0.02)" stroke-width="1"/><g opacity="0.4"><circle cx="100" cy="20" r="4" fill="rgb(200,169,107)"/><circle cx="180" cy="100" r="4" fill="rgb(200,169,107)"/><circle cx="100" cy="180" r="4" fill="rgb(200,169,107)"/><circle cx="20" cy="100" r="4" fill="rgb(200,169,107)"/><circle cx="145" cy="40" r="3" fill="rgb(171,133,75)"/><circle cx="160" cy="145" r="3" fill="rgb(171,133,75)"/><circle cx="55" cy="160" r="3" fill="rgb(171,133,75)"/><circle cx="40" cy="55" r="3" fill="rgb(171,133,75)"/></g></svg>');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
          animation: rotateSlow 180s linear infinite;
        }

        @keyframes rotateSlow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes rotateGear {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .calculator-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .unified-menu {
          position: sticky;
          top: 0;
          background: linear-gradient(135deg, rgba(70, 58, 45, 0.98), rgba(45, 37, 32, 0.98));
          border-top: 3px solid #c8a96b;
          border-bottom: 3px solid #c8a96b;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
          margin-bottom: 2rem;
          z-index: 1000;
          animation: fadeIn 0.6s ease-out;
        }

        .unified-menu-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          flex-wrap: wrap;
          min-height: 60px;
        }

        .unified-menu-btn {
          background: linear-gradient(135deg, #6b5d47, #574a39);
          border: 2px solid #ab854b;
          border-radius: 6px;
          color: #e8dcc8;
          padding: 0.5rem 1rem;
          height: 40px;
          cursor: pointer;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1rem;
          font-weight: 400;
          transition: all 0.2s ease;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .unified-menu-btn:hover {
          background: linear-gradient(135deg, #8b7d57, #6b5d47);
          border-color: #d4b87a;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
        }

        .unified-menu-btn:active {
          transform: translateY(0);
        }

        .unified-menu-btn svg {
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
          display: block;
          margin: 0;
        }

        .unified-menu-points {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 1.5rem;
          height: 40px;
          background: linear-gradient(135deg, rgba(70, 58, 45, 0.8), rgba(45, 37, 32, 0.9));
          border: 2px solid #ab854b;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .unified-points-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #ab854b;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-align: center;
          line-height: 1;
          transform: translateY(2px);
        }

        .unified-points-value {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #d4b87a;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
          min-width: 35px;
          text-align: center;
          line-height: 1;
          transform: translateY(1px);
        }

        .unified-points-value.negative {
          color: #ed5a5a;
          animation: shake 0.5s ease-in-out;
        }

        .unified-menu-divider {
          width: 2px;
          align-self: stretch;
          background: linear-gradient(180deg, transparent, #ab854b 20%, #ab854b 80%, transparent);
          margin: 0 0.5rem;
        }

        .unified-menu-tab {
          background: linear-gradient(135deg, #6b5d47, #574a39);
          border: 2px solid #ab854b;
          border-radius: 6px;
          color: #e8dcc8;
          padding: 0.5rem 1rem;
          height: 40px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.9rem;
          font-weight: 400;
          transition: all 0.2s ease;
          letter-spacing: 1px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .unified-menu-tab:hover {
          background: linear-gradient(135deg, #8b7d57, #6b5d47);
          border-color: #d4b87a;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
        }

        .unified-menu-tab.active {
          background: linear-gradient(135deg, #8b7d57, #7a6b4f);
          border-color: #d4b87a;
          box-shadow:
            0 2px 4px rgba(0, 0, 0, 0.5),
            inset 0 0 10px rgba(212, 184, 122, 0.3);
        }

        .unified-menu-tab:last-child {
          width: 40px;
          padding: 0.5rem;
        }

        .app-header {
          text-align: center;
          margin-bottom: 3rem;
          animation: fadeInDown 0.8s ease-out;
          position: relative;
          padding-top: 2rem;
        }

        .app-header::before {
          content: '◆';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2rem;
          color: rgba(200, 169, 107, 0.4);
        }

        .app-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 3.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #f4e4c8 0%, #c8a96b 30%, #8b6f3f 60%, #c8a96b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 2rem;
          letter-spacing: 6px;
          text-shadow: 0 4px 20px rgba(200, 169, 107, 0.5);
          text-transform: uppercase;
          position: relative;
          filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.6));
        }

        .app-title::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 250px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c8a96b 20%, #d4b87a 50%, #c8a96b 80%, transparent);
          box-shadow: 0 0 10px rgba(200, 169, 107, 0.5);
        }

        .app-subtitle {
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          color: #ab854b;
          font-size: 1.2rem;
          letter-spacing: 4px;
          text-transform: uppercase;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
        }

        .tab-navigation {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2rem;
          animation: fadeIn 1s ease-out 0.3s both;
        }

        .tab-btn {
          background: 
            linear-gradient(135deg, #6b5d47 0%, #574a39 50%, #463a2d 100%);
          border: 4px solid #c8a96b;
          border-radius: 6px;
          color: #e8dcc8;
          padding: 1rem 2.5rem;
          cursor: pointer;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem;
          font-weight: 400;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          letter-spacing: 2px;
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.5),
            inset 0 2px 4px rgba(200, 169, 107, 0.2),
            inset 0 -2px 4px rgba(0, 0, 0, 0.5);
        }

        .tab-btn::before {
          content: '';
          position: absolute;
          top: 6px;
          left: 6px;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #d4b87a, #ab854b);
          border-radius: 50%;
          box-shadow: 
            0 0 4px rgba(212, 184, 122, 0.6),
            calc(100% - 12px) 0 0 0 #d4b87a,
            0 calc(100% - 12px) 0 0 #d4b87a,
            calc(100% - 12px) calc(100% - 12px) 0 0 #d4b87a;
        }

        .tab-btn::after {
          content: '◆';
          position: absolute;
          top: 50%;
          left: 12px;
          transform: translateY(-50%);
          font-size: 10px;
          color: rgba(200, 169, 107, 0.4);
        }

        .tab-btn:hover {
          border-color: #d4b87a;
          color: #f4e4c8;
          transform: translateY(-2px);
          box-shadow: 
            0 6px 20px rgba(200, 169, 107, 0.4),
            inset 0 2px 4px rgba(212, 184, 122, 0.3),
            inset 0 -2px 4px rgba(0, 0, 0, 0.5);
        }

        .tab-btn.active {
          background: linear-gradient(135deg, #c8a96b 0%, #ab854b 50%, #8b6f3f 100%);
          border-color: #d4b87a;
          color: #2d2520;
          font-weight: 600;
          box-shadow: 
            0 0 30px rgba(200, 169, 107, 0.5),
            inset 0 3px 6px rgba(244, 228, 200, 0.3),
            inset 0 -3px 6px rgba(0, 0, 0, 0.6);
        }

        .tab-btn.active::before {
          background: radial-gradient(circle, #f4e4c8, #d4b87a);
          box-shadow: 
            0 0 6px rgba(244, 228, 200, 0.8),
            calc(100% - 12px) 0 0 0 #f4e4c8,
            0 calc(100% - 12px) 0 0 #f4e4c8,
            calc(100% - 12px) calc(100% - 12px) 0 0 #f4e4c8;
        }

        .points-display {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin: 0 auto 2rem auto;
          max-width: 900px;
          animation: fadeIn 1s ease-out 0.4s both;
          flex-wrap: wrap;
        }

        .settings-cards {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin: 0 auto 2rem auto;
          max-width: 900px;
          animation: fadeIn 1s ease-out 0.5s both;
          flex-wrap: wrap;
        }

        .settings-sheet {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .sheet-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3.5rem;
          text-align: center;
          color: #d4b87a;
          text-shadow:
            0 0 10px rgba(212, 184, 122, 0.5),
            0 4px 8px rgba(0, 0, 0, 0.8);
          margin-bottom: 3rem;
          letter-spacing: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .sheet-title svg {
          display: block;
          margin: 0;
        }

        .settings-section {
          background: linear-gradient(135deg, rgba(70, 58, 45, 0.4), rgba(45, 37, 32, 0.5));
          border: 3px solid #ab854b;
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 3rem;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6);
        }

        .settings-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          text-align: center;
          color: #d4b87a;
          text-shadow:
            0 0 10px rgba(212, 184, 122, 0.5),
            0 2px 6px rgba(0, 0, 0, 0.8);
          margin-bottom: 2rem;
          letter-spacing: 3px;
        }

        .reset-section {
          max-width: 600px;
          margin: 3rem auto 0 auto;
          text-align: center;
        }

        .reset-btn {
          background: linear-gradient(135deg, rgba(139, 0, 0, 0.9), rgba(100, 0, 0, 0.9));
          border: 3px solid #8B0000;
          color: #f4e4c8;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          margin: 0 auto;
          box-shadow: 0 4px 12px rgba(139, 0, 0, 0.5);
        }

        .reset-btn:hover {
          background: linear-gradient(135deg, #B22222, #8B0000);
          border-color: #DC143C;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(220, 20, 60, 0.6);
        }

        .reset-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(139, 0, 0, 0.6);
        }

        .reset-btn svg {
          display: block;
          margin: 0;
        }

        .reset-warning {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.95rem;
          color: #ab854b;
          margin-top: 1rem;
          font-style: italic;
        }

        .copyright-footer {
          margin-top: 4rem;
          padding: 2rem 1rem;
          border-top: 2px solid rgba(212, 184, 122, 0.3);
        }

        .copyright-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .copyright-content p {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.9rem;
          color: #ab854b;
          margin: 0;
          letter-spacing: 0.5px;
        }

        .points-card {
          background:
            radial-gradient(circle at center, #6b5d47 0%, #574a39 40%, #463a2d 100%);
          border: 6px solid #c8a96b;
          border-radius: 16px;
          width: 280px;
          height: 100px;
          padding: 1.5rem;
          text-align: center;
          position: relative;
          overflow: visible;
          transition: all 0.3s ease;
          box-shadow:
            0 8px 20px rgba(0, 0, 0, 0.7),
            inset 0 0 30px rgba(0, 0, 0, 0.5),
            inset 0 4px 8px rgba(200, 169, 107, 0.2);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
        }

        .points-card::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 8px;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #d4b87a, #ab854b);
          border-radius: 50%;
          box-shadow:
            0 0 6px rgba(212, 184, 122, 0),
            244px 0 0 0 #d4b87a,
            0 64px 0 0 #d4b87a,
            244px 64px 0 0 #d4b87a;
        }

        .points-card::after {
          content: '◆';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 100px;
          color: rgba(139, 111, 63, 0.05);
          pointer-events: none;
        }

        .points-card:hover {
          border-color: #d4b87a;
          box-shadow: 
            0 12px 32px rgba(200, 169, 107, 0.4),
            inset 0 0 30px rgba(0, 0, 0, 0.5),
            inset 0 4px 8px rgba(212, 184, 122, 0.3),
            0 0 40px rgba(200, 169, 107, 0.3);
        }

        .points-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem;
          color: #c8a96b;
          text-transform: uppercase;
          letter-spacing: 2px;
          position: relative;
          z-index: 1;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
        }

        .points-value {
          font-family: 'Orbitron', sans-serif;
          font-size: 3rem;
          font-weight: 900;
          background: linear-gradient(135deg, #f4e4c8, #c8a96b, #ab854b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.7));
          min-width: 60px;
          text-align: center;
          display: inline-block;
        }

        .points-value.negative {
          background: linear-gradient(135deg, #ff4444, #8B0000);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: pulse 1s ease-in-out infinite;
        }

        .levelup-input {
          width: 80px;
          height: 60px;
          padding: 0;
          background: linear-gradient(135deg, rgba(61, 53, 41, 0.9), rgba(45, 37, 32, 0.9));
          border: 3px solid #ab854b;
          border-radius: 8px;
          color: #f4e4c8;
          font-family: 'Orbitron', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.6);
          position: relative;
          z-index: 1;
        }

        .levelup-input:focus {
          outline: none;
          border-color: #d4b87a;
          box-shadow:
            inset 0 2px 6px rgba(0, 0, 0, 0.6),
            0 0 20px rgba(200, 169, 107, 0.6);
        }

        .virtuoso-toggle {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          position: relative;
          z-index: 1;
        }

        .virtuoso-toggle input[type="checkbox"] {
          width: 60px;
          height: 60px;
          cursor: pointer;
          appearance: none;
          background: linear-gradient(135deg, rgba(61, 53, 41, 0.9), rgba(45, 37, 32, 0.9));
          border: 3px solid #ab854b;
          border-radius: 8px;
          position: relative;
          box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.6);
          transition: all 0.3s ease;
        }

        .virtuoso-toggle input[type="checkbox"]:checked {
          background: linear-gradient(135deg, #c8a96b, #ab854b);
          border-color: #d4b87a;
        }

        .virtuoso-toggle input[type="checkbox"]::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          color: #2d2520;
          font-size: 1.8rem;
          font-weight: 900;
          transition: transform 0.2s ease;
        }

        .virtuoso-toggle input[type="checkbox"]:checked::after {
          transform: translate(-50%, -50%) scale(1);
        }

        .virtuoso-toggle input[type="checkbox"]:focus {
          outline: none;
          border-color: #d4b87a;
          box-shadow:
            inset 0 2px 6px rgba(0, 0, 0, 0.6),
            0 0 20px rgba(200, 169, 107, 0.6);
        }

        .settings-card-tooltip {
          position: absolute;
          bottom: 120%;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, rgba(45, 37, 32, 0.98), rgba(31, 26, 22, 0.98));
          border: 3px solid #c8a96b;
          border-radius: 8px;
          padding: 1rem 1.25rem;
          min-width: 280px;
          max-width: 320px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          pointer-events: none;
          z-index: 1000;
          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.8),
            inset 0 1px 2px rgba(200, 169, 107, 0.2);
          text-align: left;
        }

        .settings-card-tooltip::before {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 10px solid transparent;
          border-top-color: #c8a96b;
        }

        .settings-card-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 7px solid transparent;
          border-top-color: rgba(45, 37, 32, 0.98);
          margin-top: -3px;
        }

        .points-card:hover .settings-card-tooltip {
          opacity: 1;
          visibility: visible;
        }

        .tooltip-header {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem;
          color: #d4b87a;
          margin-bottom: 0.5rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .tooltip-text {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1rem;
          color: #d4c5b0;
          line-height: 1.5;
        }

        .virtuoso-status {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #d4b87a;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .alert {
          padding: 1rem 1.5rem;
          border-radius: 4px;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          animation: slideInLeft 0.5s ease-out;
          border: 3px solid;
          position: relative;
          box-shadow: 
            0 4px 8px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .alert::before, .alert::after {
          content: '◆';
          position: absolute;
          font-size: 12px;
          color: currentColor;
          opacity: 0.5;
        }

        .alert::before {
          top: 8px;
          left: 8px;
        }

        .alert::after {
          bottom: 8px;
          right: 8px;
        }

        .alert-error {
          background: linear-gradient(135deg, rgba(139, 0, 0, 0.2), rgba(70, 0, 0, 0.3));
          border-color: #8B0000;
          color: #ffb3b3;
        }

        .alert-success {
          background: linear-gradient(135deg, rgba(139, 111, 63, 0.3), rgba(87, 74, 57, 0.4));
          border-color: #c8a96b;
          color: #f4e4c8;
          animation: slideInFromTop 0.5s ease-out;
          max-width: 600px;
          margin: 2rem auto;
        }

        .alert-success svg {
          color: #c8a96b;
          filter: drop-shadow(0 0 4px rgba(200, 169, 107, 0.6));
        }

        /* Character Information Section */
        .char-info-section {
          margin-bottom: 3rem;
        }

        /* Character Info Collapsible - Match Skill Section Styling */
        .char-info-collapsible .collapsible-section {
          background: transparent;
          border: none;
          border-radius: 0;
        }

        .char-info-collapsible .collapsible-header {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem;
          color: #f4e4c8;
          margin: 0 auto 1.5rem auto;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          max-width: 1200px;
          background: radial-gradient(circle at center, #c8a96b 0%, #ab854b 40%, #8b6f3f 100%);
          border: 4px solid #d4b87a;
          border-radius: 6px;
          position: relative;
          letter-spacing: 3px;
          text-align: left;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
          box-shadow:
            0 4px 12px rgba(0, 0, 0, 0.5),
            inset 0 2px 4px rgba(200, 169, 107, 0.2),
            inset 0 -2px 4px rgba(0, 0, 0, 0.4);
        }

        .collapsible-header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          justify-content: flex-end;
          min-width: 0;
        }

        .collapsible-display-value {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 0;
          margin: 0 1rem;
          min-width: 0;
          max-width: 600px;
          position: relative;
        }

        .collapsible-input-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          color: #f4e4c8;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-shadow:
            0 0 8px rgba(244, 228, 200, 0.4),
            0 2px 4px rgba(0, 0, 0, 0.8);
          opacity: 0.9;
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(139, 111, 63, 0.9);
          padding: 0 0.5rem;
          border-radius: 2px;
        }

        .collapsible-input {
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid #d4b87a;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          color: #f4e4c8;
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          transition: all 0.3s ease;
          width: 100%;
          text-align: center;
          letter-spacing: 0.5px;
          text-shadow:
            0 0 10px rgba(244, 228, 200, 0.5),
            0 2px 6px rgba(0, 0, 0, 0.9);
          box-shadow:
            inset 0 2px 6px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(212, 184, 122, 0.2);
        }

        .collapsible-input:focus {
          outline: none;
          border-color: #f4e4c8;
          background: rgba(0, 0, 0, 0.4);
          box-shadow:
            inset 0 2px 6px rgba(0, 0, 0, 0.5),
            0 0 12px rgba(244, 228, 200, 0.3);
        }

        .collapsible-input::placeholder {
          color: rgba(212, 197, 176, 0.4);
        }

        .collapse-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        .char-info-collapsible .collapse-icon {
          color: #f4e4c8;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
        }

        .char-info-collapsible .collapsible-header:hover {
          background: radial-gradient(circle at center, #c8a96b 0%, #ab854b 40%, #8b6f3f 100%);
        }

        .char-info-collapsible .collapsible-header::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 8px;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #f4e4c8, #d4b87a);
          border-radius: 50%;
          box-shadow:
            calc(100% - 16px) 0 0 0 #f4e4c8,
            0 calc(100% - 16px) 0 0 #f4e4c8,
            calc(100% - 16px) calc(100% - 16px) 0 0 #f4e4c8;
        }

        .char-info-collapsible .collapsible-header::after {
          content: '';
        }

        .char-info-collapsible .collapsible-title {
          font-size: 2.2rem;
          letter-spacing: 3px;
          color: #f4e4c8;
          flex-shrink: 0;
        }

        .char-info-collapsible .collapsible-content {
          padding: 0;
        }

        .char-info-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0;
        }

        /* Character Name Row */
        .char-name-row {
          margin-bottom: 1.5rem;
        }

        .collapsible-icon {
          display: inline-flex;
          align-items: center;
          margin-right: 0.75rem;
          color: #f4e4c8;
        }


        /* Character Sheet Field Styling - Match Skill Row Panels */
        .char-sheet-field {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1rem;
          background:
            linear-gradient(135deg, rgba(87, 74, 57, 0.5), rgba(61, 53, 41, 0.6));
          border: 3px solid #8b6f3f;
          border-radius: 6px;
          padding: 0.75rem 1rem;
          position: relative;
          box-shadow:
            0 2px 6px rgba(0, 0, 0, 0.4),
            inset 0 1px 2px rgba(200, 169, 107, 0.1);
          transition: all 0.3s ease;
          min-height: 60px;
        }

        .char-sheet-field::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 8px;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, #c8a96b, #8b6f3f);
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .char-sheet-field::after {
          content: '';
          position: absolute;
          bottom: 8px;
          right: 8px;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, #c8a96b, #8b6f3f);
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .char-sheet-field:hover {
          background: linear-gradient(135deg, rgba(107, 93, 71, 0.6), rgba(70, 58, 45, 0.7));
          border-color: #c8a96b;
          transform: translateY(-2px);
          box-shadow:
            0 4px 12px rgba(200, 169, 107, 0.5),
            inset 0 1px 2px rgba(212, 184, 122, 0.2);
        }

        .char-sheet-field:hover::before,
        .char-sheet-field:hover::after {
          background: radial-gradient(circle, #d4b87a, #ab854b);
          box-shadow: 0 0 6px rgba(212, 184, 122, 0.6);
        }

        .char-field-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem;
          color: #f4e4c8;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding-left: 0;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
          font-weight: 700;
          flex-shrink: 0;
          min-width: 120px;
        }

        .char-sheet-input {
          background: linear-gradient(135deg, rgba(26, 20, 16, 0.9), rgba(45, 37, 32, 0.8));
          border: 2px solid #8B4513;
          border-radius: 4px;
          padding: 0.3rem 0.5rem;
          color: #d4c5b0;
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
          flex: 1;
        }

        .char-sheet-input::placeholder {
          color: rgba(171, 133, 75, 0.5);
          font-weight: 400;
          font-size: 0.85rem;
          font-style: italic;
        }

        .char-sheet-input:focus {
          outline: none;
          border-color: #B87333;
          box-shadow:
            inset 0 2px 4px rgba(0, 0, 0, 0.5),
            0 0 10px rgba(184, 115, 51, 0.4);
        }

        /* Character Name Field - Prominent */
        .char-name-field {
          position: relative;
          z-index: 1;
        }

        .char-name-field .char-field-label {
          text-align: left;
        }

        .char-name-input-field {
          text-align: left;
        }

        /* Bio Section Grid */
        .char-bio-section {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          position: relative;
          z-index: 1;
        }

        .char-field-wide {
          grid-column: 1 / -1;
          flex-direction: column;
          align-items: stretch;
          gap: 0.4rem;
        }

        .char-field-wide .char-field-label {
          min-width: auto;
        }

        .char-field-narrow {
          grid-column: span 1;
          flex-direction: column;
          align-items: stretch;
          gap: 0.4rem;
        }

        .char-field-narrow .char-field-label {
          min-width: auto;
        }

        .char-sheet-textarea {
          min-height: 80px;
          resize: vertical;
          font-family: 'Rajdhani', sans-serif;
          line-height: 1.4;
        }

        @media (max-width: 968px) {
          .char-bio-section {
            grid-template-columns: repeat(2, 1fr);
          }

          .collapsible-input {
            font-size: 1.4rem;
          }
        }

        @media (max-width: 640px) {
          .char-bio-section {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }

          .char-field-wide {
            grid-column: span 1;
          }

          .char-field-narrow {
            grid-column: span 1;
          }

          .char-sheet-field {
            padding: 0.6rem 0.75rem;
            min-height: 80px;
          }

          .char-sheet-input {
            font-size: 0.85rem;
          }

          .char-field-label {
            font-size: 1.1rem;
          }

          .collapsible-input {
            font-size: 1.3rem;
          }
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: fadeIn 0.3s ease-out;
          backdrop-filter: blur(4px);
        }

        .modal-dialog {
          background: linear-gradient(135deg, rgba(70, 58, 45, 0.98), rgba(45, 37, 32, 0.98));
          border: 4px solid #c8a96b;
          border-radius: 12px;
          max-width: 350px;
          width: 90%;
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.9),
            inset 0 2px 4px rgba(200, 169, 107, 0.2),
            0 0 100px rgba(200, 169, 107, 0.3);
          animation: scaleIn 0.3s ease-out;
          position: relative;
        }

        .modal-dialog::before {
          content: '';
          position: absolute;
          top: 12px;
          left: 12px;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, #d4b87a, #ab854b);
          border-radius: 50%;
          box-shadow:
            calc(100% - 24px) 0 0 0 #d4b87a,
            0 calc(100% - 24px) 0 0 #d4b87a,
            calc(100% - 24px) calc(100% - 24px) 0 0 #d4b87a;
        }

        .modal-header {
          text-align: center;
          padding: 1.5rem 1.5rem 1rem 1.5rem;
          border-bottom: 2px solid rgba(200, 169, 107, 0.3);
        }

        .modal-icon {
          color: #c8a96b;
          filter: drop-shadow(0 0 12px rgba(200, 169, 107, 0.8));
          margin-bottom: 0.5rem;
          animation: iconPop 0.5s ease-out 0.2s both;
        }

        .modal-header h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          color: #d4b87a;
          letter-spacing: 3px;
          margin: 0;
          text-shadow:
            0 0 20px rgba(212, 184, 122, 0.6),
            0 2px 8px rgba(0, 0, 0, 0.8);
        }

        .modal-body {
          padding: 1.5rem;
          text-align: center;
        }

        .modal-body p {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1rem;
          color: #d4c5b0;
          line-height: 1.6;
          margin: 0;
        }

        .modal-footer {
          padding: 1rem 1.5rem 1.5rem 1.5rem;
          text-align: center;
        }

        .modal-btn {
          background: linear-gradient(135deg, #c8a96b, #ab854b);
          border: 3px solid #d4b87a;
          color: #2d2520;
          padding: 0.8rem 3rem;
          border-radius: 8px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow:
            0 4px 12px rgba(0, 0, 0, 0.5),
            inset 0 2px 4px rgba(244, 228, 200, 0.3);
          font-weight: 400;
        }

        .modal-btn:hover {
          background: linear-gradient(135deg, #f4e4c8, #d4b87a);
          border-color: #f4e4c8;
          transform: translateY(-2px);
          box-shadow:
            0 6px 20px rgba(200, 169, 107, 0.6),
            inset 0 2px 4px rgba(244, 228, 200, 0.5),
            0 0 30px rgba(200, 169, 107, 0.4);
        }

        .modal-btn:active {
          transform: translateY(0);
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.6),
            inset 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes iconPop {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .alert strong {
          display: block;
          margin-bottom: 0.25rem;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 1px;
          font-size: 1.1rem;
        }

        .alert p {
          font-size: 0.95rem;
          opacity: 0.9;
          font-family: 'Rajdhani', sans-serif;
        }

        .settings-panel {
          background: 
            linear-gradient(135deg, rgba(107, 93, 71, 0.4), rgba(70, 58, 45, 0.6));
          border: 4px solid #8b6f3f;
          border-radius: 6px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          animation: fadeIn 1s ease-out 0.5s both;
          position: relative;
          box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.6),
            inset 0 2px 4px rgba(200, 169, 107, 0.15);
        }

        .settings-panel::before, .settings-panel::after {
          content: '⚙';
          position: absolute;
          font-size: 2rem;
          color: rgba(171, 133, 75, 0.15);
          animation: rotateGear 12s linear infinite;
        }

        .settings-panel::before {
          top: 15px;
          left: 15px;
        }

        .settings-panel::after {
          bottom: 15px;
          right: 15px;
          animation-direction: reverse;
        }

        .setting-row {
          margin-bottom: 1rem;
        }

        .setting-row:last-child {
          margin-bottom: 0;
        }

        .setting-row label {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          color: #e8dcc8;
          font-size: 1.1rem;
        }

        .setting-row input[type="number"] {
          width: 80px;
          padding: 0.6rem;
          background: linear-gradient(135deg, rgba(61, 53, 41, 0.9), rgba(45, 37, 32, 0.9));
          border: 3px solid #ab854b;
          border-radius: 6px;
          color: #f4e4c8;
          font-family: 'Orbitron', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          text-align: center;
          box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.6);
        }

        .setting-row input[type="number"]:focus {
          outline: none;
          border-color: #c8a96b;
          box-shadow: 
            inset 0 2px 6px rgba(0, 0, 0, 0.6),
            0 0 15px rgba(200, 169, 107, 0.5);
        }

        .setting-row input[type="checkbox"] {
          width: 24px;
          height: 24px;
          cursor: pointer;
          accent-color: #c8a96b;
        }

        .skill-section {
          margin-bottom: 3rem;
        }

        .skill-section h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.2rem;
          color: #c8a96b;
          margin: 0 auto 1.5rem auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          max-width: 1200px;
          background: linear-gradient(135deg, rgba(107, 93, 71, 0.4), rgba(70, 58, 45, 0.3));
          border: 4px solid #ab854b;
          border-radius: 6px;
          position: relative;
          letter-spacing: 3px;
          text-align: center;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
          box-shadow:
            0 4px 12px rgba(0, 0, 0, 0.5),
            inset 0 2px 4px rgba(200, 169, 107, 0.2),
            inset 0 -2px 4px rgba(0, 0, 0, 0.4);
        }

        .skill-section h2::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 8px;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #d4b87a, #ab854b);
          border-radius: 50%;
          box-shadow: 
            calc(100% - 16px) 0 0 0 #d4b87a,
            0 calc(100% - 16px) 0 0 #d4b87a,
            calc(100% - 16px) calc(100% - 16px) 0 0 #d4b87a;
        }

        .skill-section h2::after {
          content: '◆';
          position: absolute;
          right: 15px;
          font-size: 12px;
          color: rgba(200, 169, 107, 0.4);
        }

        .section-total-wrapper {
          position: relative;
          margin-left: auto;
          margin-right: 35px;
        }

        .section-total {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          color: #d4b87a;
          font-weight: 600;
          font-family: 'Orbitron', sans-serif;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
          cursor: help;
        }

        .section-total-label {
          flex-shrink: 0;
        }

        .section-total-value {
          display: inline-block;
          min-width: 40px;
          text-align: center;
        }

        .section-tooltip {
          position: absolute;
          bottom: 120%;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, rgba(45, 37, 32, 0.98), rgba(31, 26, 22, 0.98));
          border: 3px solid #c8a96b;
          border-radius: 8px;
          padding: 1rem 1.25rem;
          min-width: 220px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          pointer-events: none;
          z-index: 1000;
          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.8),
            inset 0 1px 2px rgba(200, 169, 107, 0.2);
          text-align: left;
          white-space: nowrap;
        }

        .section-tooltip::before {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 10px solid transparent;
          border-top-color: #c8a96b;
        }

        .section-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 7px solid transparent;
          border-top-color: rgba(45, 37, 32, 0.98);
          margin-top: -3px;
        }

        .section-total-wrapper:hover .section-tooltip {
          opacity: 1;
          visibility: visible;
        }

        .section-remaining {
          margin-left: 1rem;
          margin-right: 1rem;
          width: 70px;
          font-size: 2rem;
          color: #d4b87a;
          font-weight: 700;
          font-family: 'Orbitron', sans-serif;
          background: linear-gradient(135deg, rgba(70, 58, 45, 0.8), rgba(45, 37, 32, 0.9));
          border: 3px solid #ab854b;
          border-radius: 8px;
          padding: 0.4rem 0.8rem;
          text-align: center;
          display: inline-block;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.5),
            inset 0 1px 2px rgba(200, 169, 107, 0.2);
        }

        /* Character Sheet Section Colors */
        .section-constitution h2 {
          background: radial-gradient(circle at center, #d4c45f 0%, #b8a84e 40%, #9e8e3d 100%);
          border-color: #f4e066;
          color: #f4e4c8;
        }

        .section-constitution h2::before {
          background: radial-gradient(circle, #f4e066, #e0cc54);
          box-shadow: 
            calc(100% - 16px) 0 0 0 #f4e066,
            0 calc(100% - 16px) 0 0 #f4e066,
            calc(100% - 16px) calc(100% - 16px) 0 0 #f4e066;
        }

        .section-constitution h2::after {
          color: rgba(244, 224, 102, 0.4);
        }

        .section-constitution .section-total {
          color: #f4e066;
        }

        .section-strength h2 {
          background: radial-gradient(circle at center, #d49a5a 0%, #b8814a 40%, #9e6e3e 100%);
          border-color: #ed9f4a;
          color: #f4e4c8;
        }

        .section-strength h2::before {
          background: radial-gradient(circle, #ed9f4a, #d98f3f);
          box-shadow: 
            calc(100% - 16px) 0 0 0 #ed9f4a,
            0 calc(100% - 16px) 0 0 #ed9f4a,
            calc(100% - 16px) calc(100% - 16px) 0 0 #ed9f4a;
        }

        .section-strength h2::after {
          color: rgba(237, 159, 74, 0.4);
        }

        .section-strength .section-total {
          color: #ed9f4a;
        }

        .section-dexterity h2 {
          background: radial-gradient(circle at center, #d46d6d 0%, #b85555 40%, #9e4242 100%);
          border-color: #ed5a5a;
          color: #f4e4c8;
        }

        .section-dexterity h2::before {
          background: radial-gradient(circle, #ed5a5a, #d94747);
          box-shadow: 
            calc(100% - 16px) 0 0 0 #ed5a5a,
            0 calc(100% - 16px) 0 0 #ed5a5a,
            calc(100% - 16px) calc(100% - 16px) 0 0 #ed5a5a;
        }

        .section-dexterity h2::after {
          color: rgba(237, 90, 90, 0.4);
        }

        .section-dexterity .section-total {
          color: #ed5a5a;
        }

        .section-scrutiny h2 {
          background: radial-gradient(circle at center, #a86b4f 0%, #8e5740 40%, #754632 100%);
          border-color: #c47d5e;
          color: #f4e4c8;
        }

        .section-scrutiny h2::before {
          background: radial-gradient(circle, #c47d5e, #b06d4e);
          box-shadow: 
            calc(100% - 16px) 0 0 0 #c47d5e,
            0 calc(100% - 16px) 0 0 #c47d5e,
            calc(100% - 16px) calc(100% - 16px) 0 0 #c47d5e;
        }

        .section-scrutiny h2::after {
          color: rgba(196, 125, 94, 0.4);
        }

        .section-scrutiny .section-total {
          color: #c47d5e;
        }

        .section-mystics h2 {
          background: radial-gradient(circle at center, #b870a3 0%, #9e5c8a 40%, #844a72 100%);
          border-color: #d47dba;
          color: #f4e4c8;
        }

        .section-mystics h2::before {
          background: radial-gradient(circle, #d47dba, #c06ba3);
          box-shadow: 
            calc(100% - 16px) 0 0 0 #d47dba,
            0 calc(100% - 16px) 0 0 #d47dba,
            calc(100% - 16px) calc(100% - 16px) 0 0 #d47dba;
        }

        .section-mystics h2::after {
          color: rgba(212, 125, 186, 0.4);
        }

        .section-mystics .section-total {
          color: #d47dba;
        }

        .section-cursed h2 {
          background: radial-gradient(circle at center, #8872b8 0%, #705da0 40%, #5a4a88 100%);
          border-color: #9f82d6;
          color: #f4e4c8;
        }

        .section-cursed h2::before {
          background: radial-gradient(circle, #9f82d6, #8b6ec2);
          box-shadow: 
            calc(100% - 16px) 0 0 0 #9f82d6,
            0 calc(100% - 16px) 0 0 #9f82d6,
            calc(100% - 16px) calc(100% - 16px) 0 0 #9f82d6;
        }

        .section-cursed h2::after {
          color: rgba(159, 130, 214, 0.4);
        }

        .section-cursed .section-total {
          color: #9f82d6;
        }

        .mystic-icon {
          font-size: 1.8rem;
          color: #9d6fd8;
          filter: drop-shadow(0 0 8px rgba(157, 111, 216, 0.5));
        }

        .skill-section h2 svg {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          column-gap: 1.5rem;
          row-gap: 1rem;
          max-width: 1200px;
          margin: 0 auto;
          align-items: start;
        }

        .skill-row {
          background:
            linear-gradient(135deg, rgba(87, 74, 57, 0.5), rgba(61, 53, 41, 0.6));
          border: 3px solid #8b6f3f;
          border-radius: 6px;
          padding: 0.75rem 1rem;
          padding-right: 180px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          transition: all 0.3s ease;
          position: relative;
          min-height: 60px;
          box-shadow:
            0 2px 6px rgba(0, 0, 0, 0.4),
            inset 0 1px 2px rgba(200, 169, 107, 0.1);
        }

        .skill-row::before, .skill-row::after {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, #ab854b, #6b5d47);
          border-radius: 50%;
        }

        .skill-row::before {
          top: 8px;
          left: 8px;
        }

        .skill-row::after {
          bottom: 8px;
          right: 8px;
        }

        .skill-row:hover {
          background: linear-gradient(135deg, rgba(107, 93, 71, 0.6), rgba(70, 58, 45, 0.7));
          border-color: #ab854b;
          transform: translateY(-2px);
          box-shadow:
            0 4px 12px rgba(171, 133, 75, 0.4),
            inset 0 1px 2px rgba(212, 184, 122, 0.2);
        }

        .skill-row.active {
          background: linear-gradient(135deg, rgba(171, 133, 75, 0.3), rgba(139, 111, 63, 0.3));
          border-color: #c8a96b;
          box-shadow: 
            0 0 20px rgba(200, 169, 107, 0.4),
            inset 0 1px 2px rgba(212, 184, 122, 0.3);
        }

        .skill-row.active::before, .skill-row.active::after {
          background: radial-gradient(circle, #d4b87a, #ab854b);
          box-shadow: 0 0 6px rgba(212, 184, 122, 0.6);
        }

        .skill-row.error {
          background: linear-gradient(135deg, rgba(139, 0, 0, 0.3), rgba(70, 0, 0, 0.3));
          border-color: #8B0000;
          animation: shake 0.5s ease-in-out;
          box-shadow: 0 0 20px rgba(139, 0, 0, 0.5);
        }

        .skill-error-tooltip {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, rgba(139, 0, 0, 0.98), rgba(100, 0, 0, 0.98));
          border: 3px solid #ff4444;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          min-width: 200px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          pointer-events: none;
          z-index: 1000;
          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.8),
            inset 0 1px 2px rgba(255, 68, 68, 0.2);
          text-align: center;
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #ffb3b3;
          white-space: nowrap;
        }

        .skill-error-tooltip::before {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 10px solid transparent;
          border-top-color: #ff4444;
        }

        .skill-error-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 7px solid transparent;
          border-top-color: rgba(139, 0, 0, 0.98);
          margin-top: -3px;
        }

        .skill-row.error:hover .skill-error-tooltip {
          opacity: 1;
          visibility: visible;
        }

        .skill-name-container {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .skill-name {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #d4c5b0;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.5rem;
          letter-spacing: 0.5px;
          text-align: left;
        }

        .skill-cost {
          font-size: 0.75rem;
          color: #9d8b7a;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
        }

        .skill-name-input {
          background: linear-gradient(135deg, rgba(26, 20, 16, 0.9), rgba(45, 37, 32, 0.8));
          border: 2px solid #8B4513;
          border-radius: 4px;
          padding: 0.3rem 0.5rem;
          color: #d4c5b0;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          width: 90px;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .skill-subclass-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .skill-subclass-arrow {
          color: #ab854b;
          font-size: 1.2rem;
          line-height: 1;
        }

        .skill-subclass-select {
          background: linear-gradient(135deg, rgba(26, 20, 16, 0.9), rgba(45, 37, 32, 0.8));
          border: 2px solid #c8a96b;
          border-radius: 4px;
          padding: 0.4rem 0.6rem;
          color: #d4c5b0;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
          transition: all 0.2s ease;
        }

        .skill-subclass-select:hover {
          border-color: #d4b87a;
          background: linear-gradient(135deg, rgba(35, 28, 22, 0.9), rgba(55, 45, 38, 0.8));
        }

        .skill-subclass-select:focus {
          outline: none;
          border-color: #f4e4c8;
          box-shadow:
            inset 0 2px 4px rgba(0, 0, 0, 0.5),
            0 0 8px rgba(200, 169, 107, 0.4);
        }

        .skill-subclass-select option {
          background: #2d251e;
          color: #d4c5b0;
          padding: 0.5rem;
        }

        .skill-name-input:focus {
          outline: none;
          border-color: #B87333;
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.5),
            0 0 10px rgba(184, 115, 51, 0.4);
        }

        .skill-controls {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .skill-controls button:first-of-type {
          margin-left: 0.75rem;
        }

        .skill-btn {
          background: linear-gradient(135deg, rgba(200, 169, 107, 0.9), rgba(171, 133, 75, 0.9));
          border: 2px solid #d4b87a;
          color: #2d2520;
          width: 32px;
          height: 32px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .skill-btn::before {
          display: none;
        }

        .skill-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #f4e4c8, #d4b87a);
          border-color: #f4e4c8;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(200, 169, 107, 0.5);
        }

        .skill-btn:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
        }

        .skill-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          background: linear-gradient(135deg, #5a5a5a, #3a3a3a);
          border-color: #4a4a4a;
        }

        .skill-tier {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.1rem;
          min-width: 55px;
          padding: 0.4rem 0.5rem;
          background:
            radial-gradient(circle, rgb(61, 53, 41), rgb(45, 37, 32));
          border: 3px solid #8b6f3f;
          border-radius: 6px;
          flex-shrink: 0;
          box-shadow:
            inset 0 2px 8px rgba(0, 0, 0, 0.6),
            0 0 6px rgba(139, 111, 63, 0.2);
        }

        .tier-label {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #ab854b;
          font-family: 'Bebas Neue', sans-serif;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .tier-value {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.4rem;
          font-weight: 900;
          color: #6b5d47;
          transition: all 0.3s ease;
        }

        .skill-tier.has-points {
          border-color: #c8a96b;
          box-shadow: 
            inset 0 2px 8px rgba(0, 0, 0, 0.6),
            0 0 20px rgba(200, 169, 107, 0.3);
        }

        .skill-tier.has-points .tier-value {
          background: linear-gradient(135deg, #f4e4c8, #c8a96b, #ab854b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 8px rgba(212, 184, 122, 0.5));
        }

        .reference-sheet {
          animation: fadeIn 0.8s ease-out;
        }

        .ref-header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
          padding-top: 2rem;
        }

        .ref-header::before {
          content: '⚙ ◆ ⚙';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.5rem;
          color: rgba(200, 169, 107, 0.3);
          letter-spacing: 1rem;
        }

        .ref-header h2 {
          font-family: 'Orbitron', sans-serif;
          font-size: 2.8rem;
          font-weight: 900;
          background: linear-gradient(135deg, #f4e4c8, #c8a96b, #8b6f3f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
          letter-spacing: 4px;
          text-transform: uppercase;
          filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.6));
        }

        .abilities-section {
          margin-bottom: 3rem;
        }

        .abilities-header {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          color: #c8a96b;
          text-align: center;
          margin-bottom: 1.5rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
          position: relative;
          padding-bottom: 1rem;
        }

        .abilities-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c8a96b 20%, #d4b87a 50%, #c8a96b 80%, transparent);
          box-shadow: 0 0 10px rgba(200, 169, 107, 0.5);
        }

        .ref-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 0 auto 3rem auto;
          max-width: 900px;
        }

        @media (max-width: 1024px) {
          .ref-stats {
            grid-template-columns: repeat(2, 1fr);
            max-width: 600px;
          }
        }

        @media (max-width: 640px) {
          .ref-stats {
            grid-template-columns: 1fr;
            max-width: 300px;
          }
        }

        .stat-card {
          background: 
            radial-gradient(circle at center, #6b5d47 0%, #574a39 40%, #463a2d 100%);
          border: 5px solid #c8a96b;
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          box-shadow: 
            0 8px 20px rgba(0, 0, 0, 0.7),
            inset 0 0 30px rgba(0, 0, 0, 0.5),
            inset 0 3px 6px rgba(200, 169, 107, 0.2);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 12px;
          left: 12px;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #d4b87a, #ab854b);
          border-radius: 50%;
          box-shadow: 
            0 0 6px rgba(212, 184, 122, 0.8),
            calc(100% - 24px) 0 0 0 #d4b87a,
            0 calc(100% - 24px) 0 0 #d4b87a,
            calc(100% - 24px) calc(100% - 24px) 0 0 #d4b87a;
        }

        .stat-card::after {
          content: '◆';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 80px;
          color: rgba(139, 111, 63, 0.05);
          pointer-events: none;
        }

        .stat-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 
            0 16px 40px rgba(200, 169, 107, 0.5),
            inset 0 0 30px rgba(0, 0, 0, 0.5),
            inset 0 3px 6px rgba(244, 228, 200, 0.3),
            0 0 40px rgba(200, 169, 107, 0.3);
          border-color: #d4b87a;
        }

        .stat-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          color: #c8a96b;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          position: relative;
          z-index: 1;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .stat-value {
          font-family: 'Orbitron', sans-serif;
          font-size: 3.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #f4e4c8, #c8a96b, #ab854b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5));
          position: relative;
          z-index: 1;
        }

        .stat-value.error {
          background: linear-gradient(135deg, #ff4444, #8B0000);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: pulse 1s ease-in-out infinite;
        }

        /* Tooltip Styles */
        .stat-tooltip {
          position: absolute;
          bottom: 110%;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, rgba(45, 37, 32, 0.98), rgba(31, 26, 22, 0.98));
          border: 3px solid #c8a96b;
          border-radius: 8px;
          padding: 1rem 1.25rem;
          min-width: 220px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          pointer-events: none;
          z-index: 1000;
          box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.8),
            inset 0 1px 2px rgba(200, 169, 107, 0.2);
          text-align: left;
        }

        .stat-tooltip::before {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 10px solid transparent;
          border-top-color: #c8a96b;
        }

        .stat-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 7px solid transparent;
          border-top-color: rgba(45, 37, 32, 0.98);
          margin-top: -3px;
        }

        .stat-card:hover .stat-tooltip {
          opacity: 1;
          visibility: visible;
        }

        .stat-tooltip .section-tooltip {
          position: static;
          opacity: 1;
          visibility: visible;
          box-shadow: none;
          border: none;
          background: none;
          padding: 0;
          min-width: auto;
          transform: none;
        }

        .stat-tooltip .section-tooltip::before,
        .stat-tooltip .section-tooltip::after {
          display: none;
        }

        .tooltip-row {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #e8dcc8;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        .tooltip-row:last-child {
          margin-bottom: 0;
        }

        .tooltip-subrow {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          color: #d4c5b0;
          margin-left: 0.75rem;
          margin-bottom: 0.35rem;
          line-height: 1.3;
        }

        .tooltip-warning {
          color: #ffb3b3;
          font-weight: 700;
          margin-top: 0.5rem;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(200, 169, 107, 0.3);
        }

        /* Ability-Specific Colors */
        .stat-card-constitution {
          background: radial-gradient(circle at center, #d4c45f 0%, #b8a84e 40%, #9e8e3d 100%);
          border-color: #f4e066;
        }

        .stat-card-constitution::before {
          background: radial-gradient(circle, #f4e066, #e0cc54);
          box-shadow: 
            0 0 6px rgba(244, 224, 102, 0.8),
            calc(100% - 24px) 0 0 0 #f4e066,
            0 calc(100% - 24px) 0 0 #f4e066,
            calc(100% - 24px) calc(100% - 24px) 0 0 #f4e066;
        }

        .stat-card-constitution .stat-label {
          color: #f4e4c8;
          font-weight: 700;
          font-size: 2.43rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        }

        .stat-card-constitution .stat-value {
          background: linear-gradient(135deg, #4a3f20, #2d2520, #1a1410);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 4px rgba(244, 224, 102, 0.4));
        }

        .stat-card-constitution:hover {
          border-color: #ffed80;
          box-shadow: 
            0 16px 40px rgba(244, 224, 102, 0.5),
            inset 0 0 30px rgba(0, 0, 0, 0.5),
            inset 0 3px 6px rgba(244, 224, 102, 0.3),
            0 0 40px rgba(244, 224, 102, 0.3);
        }

        .stat-card-strength {
          background: radial-gradient(circle at center, #d49a5a 0%, #b8814a 40%, #9e6e3e 100%);
          border-color: #ed9f4a;
        }

        .stat-card-strength::before {
          background: radial-gradient(circle, #ed9f4a, #d98f3f);
          box-shadow: 
            0 0 6px rgba(237, 159, 74, 0.8),
            calc(100% - 24px) 0 0 0 #ed9f4a,
            0 calc(100% - 24px) 0 0 #ed9f4a,
            calc(100% - 24px) calc(100% - 24px) 0 0 #ed9f4a;
        }

        .stat-card-strength .stat-label {
          color: #f4e4c8;
          font-weight: 700;
          font-size: 2.43rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        }

        .stat-card-strength .stat-value {
          background: linear-gradient(135deg, #4a3320, #2d2520, #1a1410);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 4px rgba(237, 159, 74, 0.4));
        }

        .stat-card-strength:hover {
          border-color: #ffb566;
          box-shadow: 
            0 16px 40px rgba(237, 159, 74, 0.5),
            inset 0 0 30px rgba(0, 0, 0, 0.5),
            inset 0 3px 6px rgba(237, 159, 74, 0.3),
            0 0 40px rgba(237, 159, 74, 0.3);
        }

        .stat-card-dexterity {
          background: radial-gradient(circle at center, #d46d6d 0%, #b85555 40%, #9e4242 100%);
          border-color: #ed5a5a;
        }

        .stat-card-dexterity::before {
          background: radial-gradient(circle, #ed5a5a, #d94747);
          box-shadow: 
            0 0 6px rgba(237, 90, 90, 0.8),
            calc(100% - 24px) 0 0 0 #ed5a5a,
            0 calc(100% - 24px) 0 0 #ed5a5a,
            calc(100% - 24px) calc(100% - 24px) 0 0 #ed5a5a;
        }

        .stat-card-dexterity .stat-label {
          color: #f4e4c8;
          font-weight: 700;
          font-size: 2.43rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        }

        .stat-card-dexterity .stat-value {
          background: linear-gradient(135deg, #4a2020, #2d2520, #1a1410);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 4px rgba(237, 90, 90, 0.4));
        }

        .stat-card-dexterity:hover {
          border-color: #ff7070;
          box-shadow: 
            0 16px 40px rgba(237, 90, 90, 0.5),
            inset 0 0 30px rgba(0, 0, 0, 0.5),
            inset 0 3px 6px rgba(237, 90, 90, 0.3),
            0 0 40px rgba(237, 90, 90, 0.3);
        }

        .stat-card-scrutiny {
          background: radial-gradient(circle at center, #a86b4f 0%, #8e5740 40%, #754632 100%);
          border-color: #c47d5e;
        }

        .stat-card-scrutiny::before {
          background: radial-gradient(circle, #c47d5e, #b06d4e);
          box-shadow: 
            0 0 6px rgba(196, 125, 94, 0.8),
            calc(100% - 24px) 0 0 0 #c47d5e,
            0 calc(100% - 24px) 0 0 #c47d5e,
            calc(100% - 24px) calc(100% - 24px) 0 0 #c47d5e;
        }

        .stat-card-scrutiny .stat-label {
          color: #f4e4c8;
          font-weight: 700;
          font-size: 2.43rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        }

        .stat-card-scrutiny .stat-value {
          background: linear-gradient(135deg, #3d2520, #2d2520, #1a1410);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 4px rgba(196, 125, 94, 0.4));
        }

        .stat-card-scrutiny:hover {
          border-color: #da9478;
          box-shadow: 
            0 16px 40px rgba(196, 125, 94, 0.5),
            inset 0 0 30px rgba(0, 0, 0, 0.5),
            inset 0 3px 6px rgba(196, 125, 94, 0.3),
            0 0 40px rgba(196, 125, 94, 0.3);
        }

        .stat-card-mystics {
          background: radial-gradient(circle at center, #b870a3 0%, #9e5c8a 40%, #844a72 100%);
          border-color: #d47dba;
        }

        .stat-card-mystics::before {
          background: radial-gradient(circle, #d47dba, #c06ba3);
          box-shadow: 
            0 0 6px rgba(212, 125, 186, 0.8),
            calc(100% - 24px) 0 0 0 #d47dba,
            0 calc(100% - 24px) 0 0 #d47dba,
            calc(100% - 24px) calc(100% - 24px) 0 0 #d47dba;
        }

        .stat-card-mystics .stat-label {
          color: #f4e4c8;
          font-weight: 700;
          font-size: 2.43rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        }

        .stat-card-mystics .stat-value {
          background: linear-gradient(135deg, #3d2535, #2d2520, #1a1410);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 4px rgba(212, 125, 186, 0.4));
        }

        .stat-card-mystics:hover {
          border-color: #ea93d0;
          box-shadow: 
            0 16px 40px rgba(212, 125, 186, 0.5),
            inset 0 0 30px rgba(0, 0, 0, 0.5),
            inset 0 3px 6px rgba(212, 125, 186, 0.3),
            0 0 40px rgba(212, 125, 186, 0.3);
        }

        .stat-card-cursed {
          background: radial-gradient(circle at center, #8872b8 0%, #705da0 40%, #5a4a88 100%);
          border-color: #9f82d6;
        }

        .stat-card-cursed::before {
          background: radial-gradient(circle, #9f82d6, #8b6ec2);
          box-shadow: 
            0 0 6px rgba(159, 130, 214, 0.8),
            calc(100% - 24px) 0 0 0 #9f82d6,
            0 calc(100% - 24px) 0 0 #9f82d6,
            calc(100% - 24px) calc(100% - 24px) 0 0 #9f82d6;
        }

        .stat-card-cursed .stat-label {
          color: #f4e4c8;
          font-weight: 700;
          font-size: 2.43rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        }

        .stat-card-cursed .stat-value {
          background: linear-gradient(135deg, #2d2540, #2d2520, #1a1410);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 4px rgba(159, 130, 214, 0.4));
        }

        .stat-card-cursed:hover {
          border-color: #b598ec;
          box-shadow: 
            0 16px 40px rgba(159, 130, 214, 0.5),
            inset 0 0 30px rgba(0, 0, 0, 0.5),
            inset 0 3px 6px rgba(159, 130, 214, 0.3),
            0 0 40px rgba(159, 130, 214, 0.3);
        }

        /* Weapons Section Styles */
        .weapons-section {
          margin-bottom: 3rem;
        }

        .section-header {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          color: #c8a96b;
          text-align: center;
          margin-bottom: 1.5rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
          position: relative;
          padding-bottom: 1rem;
        }

        .section-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c8a96b 20%, #d4b87a 50%, #c8a96b 80%, transparent);
          box-shadow: 0 0 10px rgba(200, 169, 107, 0.5);
        }

        .subsection-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #ab854b;
          text-align: center;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .preferred-weapons-container {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .preferred-weapons-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin: 0;
          max-width: 700px;
        }

        @media (max-width: 768px) {
          .preferred-weapons-grid {
            grid-template-columns: 1fr;
            max-width: 350px;
          }
        }

        .wielding-types {
          display: flex;
          flex-direction: row;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .wielding-badge {
          background: linear-gradient(135deg, rgba(107, 93, 71, 0.6), rgba(70, 58, 45, 0.8));
          border: 3px solid #ab854b;
          border-radius: 6px;
          padding: 0.5rem 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.6),
            inset 0 1px 2px rgba(200, 169, 107, 0.2);
          position: relative;
          min-width: 140px;
        }

        .wielding-badge:hover {
          background: linear-gradient(135deg, rgba(139, 111, 63, 0.7), rgba(87, 74, 57, 0.9));
          border-color: #c8a96b;
          box-shadow: 
            0 4px 12px rgba(200, 169, 107, 0.4),
            inset 0 1px 2px rgba(212, 184, 122, 0.3);
        }

        .wielding-badge::before {
          content: '';
          position: absolute;
          top: 6px;
          right: 6px;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, #d4b87a, #ab854b);
          border-radius: 50%;
          box-shadow: 0 0 4px rgba(212, 184, 122, 0.8);
        }

        .wielding-checkbox {
          width: 18px;
          height: 18px;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          background: linear-gradient(135deg, rgba(61, 53, 41, 0.8), rgba(45, 37, 32, 0.9));
          border: 2px solid #8b6f3f;
          border-radius: 3px;
          position: relative;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .wielding-checkbox:hover {
          border-color: #c8a96b;
          box-shadow: 0 0 8px rgba(200, 169, 107, 0.4);
        }

        .wielding-checkbox:checked {
          background: linear-gradient(135deg, #c8a96b, #ab854b);
          border-color: #d4b87a;
          box-shadow: 
            0 0 10px rgba(212, 184, 122, 0.6),
            inset 0 1px 2px rgba(244, 228, 200, 0.3);
        }

        .wielding-checkbox:checked::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #2d2520;
          font-size: 14px;
          font-weight: 900;
          text-shadow: 0 1px 2px rgba(244, 228, 200, 0.5);
        }

        .wielding-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .wielding-label {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          color: #ab854b;
          text-transform: uppercase;
          letter-spacing: 1px;
          line-height: 1;
        }

        .wielding-type {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          color: #d4b87a;
          letter-spacing: 1px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
          line-height: 1;
        }

        .weapons-divider {
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #8b6f3f 10%, #c8a96b 50%, #8b6f3f 90%, transparent);
          margin: 2rem 0;
          position: relative;
          box-shadow: 0 0 8px rgba(200, 169, 107, 0.3);
        }

        .weapons-divider::before {
          content: '◆';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #c8a96b;
          font-size: 1.2rem;
          background: #2d2520;
          padding: 0 1rem;
          text-shadow: 0 0 10px rgba(200, 169, 107, 0.6);
        }

        .weapon-proficiencies {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin: 0 auto;
          max-width: 900px;
        }

        @media (max-width: 1024px) {
          .weapon-proficiencies {
            grid-template-columns: repeat(2, 1fr);
            max-width: 600px;
          }
        }

        @media (max-width: 640px) {
          .weapon-proficiencies {
            grid-template-columns: 1fr;
            max-width: 300px;
          }
        }

        .weapon-card {
          background: linear-gradient(135deg, rgba(87, 74, 57, 0.6), rgba(61, 53, 41, 0.8));
          border: 3px solid #8b6f3f;
          border-radius: 6px;
          padding: 1rem;
          transition: all 0.3s ease;
          position: relative;
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.5),
            inset 0 1px 2px rgba(200, 169, 107, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .weapon-card-left {
          flex: 1;
        }

        .weapon-card-right {
          flex-shrink: 0;
        }

        .weapon-card::before {
          content: '';
          position: absolute;
          top: 8px;
          left: 8px;
          width: 5px;
          height: 5px;
          background: radial-gradient(circle, #ab854b, #6b5d47);
          border-radius: 50%;
        }

        .weapon-card::after {
          content: '';
          position: absolute;
          bottom: 8px;
          right: 8px;
          width: 5px;
          height: 5px;
          background: radial-gradient(circle, #ab854b, #6b5d47);
          border-radius: 50%;
        }

        .weapon-card.proficient {
          background: linear-gradient(135deg, rgba(171, 133, 75, 0.4), rgba(107, 93, 71, 0.6));
          border-color: #c8a96b;
          box-shadow: 
            0 0 20px rgba(200, 169, 107, 0.3),
            inset 0 1px 2px rgba(212, 184, 122, 0.2);
        }

        .weapon-card.proficient::before,
        .weapon-card.proficient::after {
          background: radial-gradient(circle, #d4b87a, #ab854b);
          box-shadow: 0 0 6px rgba(212, 184, 122, 0.6);
        }

        .weapon-card:hover {
          transform: translateY(-4px);
          box-shadow: 
            0 8px 20px rgba(171, 133, 75, 0.4),
            inset 0 1px 2px rgba(212, 184, 122, 0.2);
        }

        .weapon-name {
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 1.15rem;
          color: #e8dcc8;
          margin-bottom: 0.5rem;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .weapon-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Orbitron', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
        }

        .weapon-card.proficient .weapon-status {
          color: #d4b87a;
        }

        .weapon-card.proficient .weapon-status svg {
          color: #c8a96b;
          filter: drop-shadow(0 0 4px rgba(200, 169, 107, 0.6));
        }

        .weapon-status .not-trained {
          color: #6b5d47;
          font-style: italic;
        }

        .damage-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.6rem 1rem;
          background: linear-gradient(135deg, rgba(200, 169, 107, 0.2), rgba(171, 133, 75, 0.2));
          border: 2px solid #c8a96b;
          border-radius: 6px;
          min-width: 100px;
          box-shadow:
            0 0 10px rgba(200, 169, 107, 0.3),
            inset 0 1px 2px rgba(212, 184, 122, 0.1);
        }

        .damage-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.75rem;
          color: #ab854b;
          letter-spacing: 1px;
          margin-bottom: 0.4rem;
          text-transform: uppercase;
        }

        .damage-disadvantage {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.8rem;
          color: #8B0000;
          font-weight: 600;
          font-style: italic;
          margin-bottom: 0.1rem;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .damage-dice {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.3rem;
          font-weight: 900;
          color: #f4e4c8;
          white-space: nowrap;
          text-shadow: 0 0 8px rgba(212, 184, 122, 0.6);
        }

        .weapon-input-group {
          display: flex;
          flex-direction: column;
        }

        .preferred-weapon-input {
          width: 100%;
          background: linear-gradient(135deg, rgba(87, 74, 57, 0.7), rgba(61, 53, 41, 0.9));
          border: 4px solid #8b6f3f;
          border-radius: 6px;
          padding: 0.9rem 1.5rem;
          color: #e8dcc8;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.6),
            inset 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .preferred-weapon-input::placeholder {
          color: rgba(171, 133, 75, 0.5);
          font-style: italic;
        }

        .preferred-weapon-input:focus {
          outline: none;
          border-color: #c8a96b;
          background: linear-gradient(135deg, rgba(107, 93, 71, 0.8), rgba(70, 58, 45, 1));
          box-shadow: 
            0 6px 24px rgba(200, 169, 107, 0.6),
            inset 0 2px 4px rgba(0, 0, 0, 0.7),
            0 0 30px rgba(212, 184, 122, 0.4);
        }

        .talents-categorized {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .collapsible-section {
          background: linear-gradient(135deg, rgba(70, 58, 45, 0.4), rgba(45, 37, 32, 0.6));
          border: 3px solid #6b5d47;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .collapsible-section:hover {
          border-color: #8b6f3f;
        }

        .collapsible-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          cursor: pointer;
          background: linear-gradient(135deg, rgba(87, 74, 57, 0.3), rgba(61, 53, 41, 0.5));
          transition: all 0.3s ease;
          user-select: none;
        }

        .collapsible-header:hover {
          background: linear-gradient(135deg, rgba(107, 93, 71, 0.4), rgba(87, 74, 57, 0.6));
        }

        .collapsible-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          color: #c8a96b;
          letter-spacing: 2px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
          margin: 0;
        }

        .section-count {
          font-family: 'Orbitron', monospace;
          font-size: 1.2rem;
          color: #ab854b;
          font-weight: 600;
        }

        .collapse-icon {
          color: #ab854b;
          transition: transform 0.3s ease;
          display: flex;
          align-items: center;
        }

        .collapsible-header:hover .collapse-icon {
          color: #c8a96b;
          transform: scale(1.1);
        }

        .collapsible-content {
          padding: 1.5rem;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 2000px;
          }
        }

        .talents-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }

        .talent-card {
          background: 
            linear-gradient(135deg, rgba(87, 74, 57, 0.6), rgba(61, 53, 41, 0.8));
          border: 3px solid #8b6f3f;
          border-radius: 6px;
          padding: 1.25rem;
          transition: all 0.3s ease;
          position: relative;
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.5),
            inset 0 1px 2px rgba(200, 169, 107, 0.1);
        }

        .talent-card::before, .talent-card::after {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, #ab854b, #6b5d47);
          border-radius: 50%;
        }

        .talent-card::before {
          top: 10px;
          left: 10px;
        }

        .talent-card::after {
          bottom: 10px;
          right: 10px;
        }

        .talent-card:hover {
          background: linear-gradient(135deg, rgba(171, 133, 75, 0.3), rgba(107, 93, 71, 0.4));
          border-color: #ab854b;
          transform: translateY(-4px);
          box-shadow: 
            0 8px 20px rgba(171, 133, 75, 0.4),
            inset 0 1px 2px rgba(212, 184, 122, 0.2),
            0 0 20px rgba(200, 169, 107, 0.2);
        }

        .talent-card:hover::before, .talent-card:hover::after {
          background: radial-gradient(circle, #d4b87a, #ab854b);
          box-shadow: 0 0 6px rgba(212, 184, 122, 0.6);
        }

        .talent-name {
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 1.15rem;
          color: #e8dcc8;
          margin-bottom: 1rem;
          letter-spacing: 0.5px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .talent-subclass {
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          color: #c8a96b;
          font-style: italic;
        }

        .talent-tier {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tier-dots {
          display: flex;
          gap: 0.5rem;
        }

        .dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid rgba(139, 111, 63, 0.5);
          transition: all 0.3s ease;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.6);
        }

        .dot.filled {
          background: radial-gradient(circle at 30% 30%, #f4e4c8, #c8a96b);
          border-color: #d4b87a;
          box-shadow: 
            0 0 12px rgba(212, 184, 122, 0.7),
            inset 0 1px 2px rgba(244, 228, 200, 0.5);
        }

        .tier-text {
          font-family: 'Orbitron', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #ab854b;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        /* Skill Ability Card Styles */
        .skill-ability-card {
          background: linear-gradient(135deg, rgba(87, 74, 57, 0.6), rgba(61, 53, 41, 0.8));
          border: 3px solid #8b6f3f;
          border-radius: 6px;
          transition: all 0.3s ease;
          position: relative;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(200, 169, 107, 0.1);
          margin-bottom: 1rem;
          overflow: hidden;
          align-self: start;
        }

        .skill-ability-card:hover {
          border-color: #ab854b;
          box-shadow: 0 4px 12px rgba(171, 133, 75, 0.4), inset 0 1px 2px rgba(212, 184, 122, 0.2);
        }

        .skill-ability-header {
          padding: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          min-height: 85px;
        }

        .skill-ability-main {
          flex: 1;
        }

        .skill-ability-name {
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 1.15rem;
          color: #e8dcc8;
          margin-bottom: 0.5rem;
          letter-spacing: 0.5px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .skill-ability-source {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.85rem;
          color: #ab854b;
          font-style: italic;
        }

        .skill-expand-icon {
          color: #c8a96b;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .skill-ability-content {
          border-top: 2px solid rgba(139, 111, 63, 0.3);
          padding: 1.25rem;
          background: rgba(0, 0, 0, 0.2);
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .skill-ability-description {
          font-family: 'Rajdhani', sans-serif;
          font-size: 0.95rem;
          color: #e8dcc8;
          line-height: 1.4;
        }

        .ref-warning, .ref-success {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 1.25rem;
          border-radius: 4px;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          border: 3px solid;
          position: relative;
        }

        .ref-warning::before, .ref-success::before,
        .ref-warning::after, .ref-success::after {
          content: '⚠';
          position: absolute;
          font-size: 14px;
          opacity: 0.5;
        }

        .ref-warning::before {
          top: 8px;
          left: 8px;
        }

        .ref-warning::after {
          bottom: 8px;
          right: 8px;
        }

        .ref-success::before,
        .ref-success::after {
          content: '✓';
        }

        .ref-success::before {
          top: 8px;
          left: 8px;
        }

        .ref-success::after {
          bottom: 8px;
          right: 8px;
        }

        .ref-warning {
          background: linear-gradient(135deg, rgba(139, 0, 0, 0.2), rgba(70, 0, 0, 0.3));
          border-color: #8B0000;
          color: #ffb3b3;
          box-shadow: 
            0 4px 12px rgba(139, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 107, 107, 0.2);
        }

        .ref-success {
          background: linear-gradient(135deg, rgba(34, 139, 34, 0.2), rgba(0, 100, 0, 0.3));
          border-color: #228B22;
          color: #90ee90;
          box-shadow: 
            0 4px 12px rgba(34, 139, 34, 0.3),
            inset 0 1px 0 rgba(144, 238, 144, 0.2);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @media (max-width: 768px) {
          .galudon-calculator {
            padding: 1rem;
          }

          .app-title {
            font-size: 2rem;
            letter-spacing: 3px;
          }

          .app-subtitle {
            font-size: 1rem;
            letter-spacing: 2px;
          }

          .tab-navigation {
            flex-direction: column;
          }

          .points-display {
            flex-direction: column;
            align-items: center;
          }

          .points-card {
            width: 300px;
            height: 90px;
          }

          .points-card::before {
            box-shadow:
              0 0 6px rgba(212, 184, 122, 0.8),
              264px 0 0 0 #d4b87a,
              0 54px 0 0 #d4b87a,
              264px 54px 0 0 #d4b87a;
          }

          .talents-list {
            grid-template-columns: 1fr;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .skill-row {
            height: auto;
            min-height: 60px;
            padding: 0.75rem;
            padding-right: 150px;
          }

          .skill-name {
            font-size: 0.95rem;
          }

          .skill-name-input {
            width: 80px;
            font-size: 0.85rem;
          }

          .skill-btn {
            width: 34px;
            height: 34px;
          }

          .skill-tier {
            min-width: 58px;
          }

          .skill-controls {
            right: 0.75rem;
          }

          .skill-section h2 {
            font-size: 1.8rem;
            letter-spacing: 2px;
            flex-wrap: wrap;
            padding: 0.75rem 1rem;
          }

          .section-total-wrapper {
            order: 3;
            flex-basis: 100%;
            display: flex;
            justify-content: center;
            margin-top: 0.5rem;
          }

          .section-total {
            font-size: 1.1rem;
          }

          .section-total-value {
            min-width: 35px;
          }

          .section-remaining {
            font-size: 1.3rem;
            width: 55px;
            padding: 0.3rem 0.5rem;
            order: 4;
            flex-basis: 100%;
            margin-top: 0.5rem;
            margin-left: 0;
            margin-right: 0;
          }

          .ref-stats {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 375px) {
          .galudon-calculator {
            padding: 0.75rem;
          }

          .app-title {
            font-size: 1.5rem;
            letter-spacing: 2px;
          }

          .app-subtitle {
            font-size: 0.85rem;
            letter-spacing: 1.5px;
          }

          .points-card {
            width: 280px;
            height: 85px;
            padding: 1rem;
            gap: 1rem;
          }

          .points-card::before {
            box-shadow:
              0 0 6px rgba(212, 184, 122, 0.8),
              244px 0 0 0 #d4b87a,
              0 49px 0 0 #d4b87a,
              244px 49px 0 0 #d4b87a;
          }

          .points-label {
            font-size: 0.9rem;
          }

          .points-value {
            font-size: 1.8rem;
          }

          .skill-section h2 {
            font-size: 1.4rem;
            letter-spacing: 1.5px;
            padding: 0.6rem 0.75rem;
            gap: 0.5rem;
          }

          .skill-section h2 svg {
            width: 20px;
            height: 20px;
          }

          .section-total-wrapper {
            margin-top: 0.4rem;
          }

          .section-total {
            font-size: 1rem;
          }

          .section-total-value {
            min-width: 32px;
          }

          .section-remaining {
            font-size: 1.2rem;
            width: 50px;
            padding: 0.25rem 0.4rem;
            margin-top: 0.4rem;
          }

          .skill-row {
            padding: 0.6rem;
            padding-right: 140px;
          }

          .skill-name {
            font-size: 0.9rem;
          }

          .skill-btn {
            width: 32px;
            height: 32px;
            font-size: 0.9rem;
          }

          .skill-tier {
            min-width: 54px;
            font-size: 0.9rem;
          }

          .skill-controls {
            right: 0.6rem;
            gap: 0.4rem;
          }
        }
      `}</style>

      <div className="calculator-container">
        <header className="app-header">
          <h1 className="app-title">⚙ GEARS OF GALUDON ⚙</h1>
          <p className="app-subtitle">◆ CHARACTER SKILL CALCULATOR ◆</p>
        </header>

        {/* Unified Menu - Consolidated for all tabs */}
        <nav className="unified-menu">
          <div className="unified-menu-content">
            <button
              className={`unified-menu-tab ${activeTab === 'character' ? 'active' : ''}`}
              onClick={() => setActiveTab('character')}
              aria-label="View character sheet"
              aria-current={activeTab === 'character' ? 'page' : undefined}
            >
              CHARACTER SHEET
            </button>
            <button
              className={`unified-menu-tab ${activeTab === 'reference' ? 'active' : ''}`}
              onClick={() => setActiveTab('reference')}
              aria-label="View reference sheet"
              aria-current={activeTab === 'reference' ? 'page' : undefined}
            >
              REFERENCE SHEET
            </button>

            {/* Section navigation - only visible on character tab */}
            {activeTab === 'character' && (
              <>
                <div className="unified-menu-divider"></div>
                <button
                  onClick={() => scrollToSection('section-character-info')}
                  className="unified-menu-btn"
                  aria-label="Jump to Character Information section"
                >
                  <BookOpen size={18} />
                  INFO
                </button>
                {Object.keys(ATTRIBUTES).map(key => {
                  const config = ATTRIBUTES[key];
                  const IconComponent = {
                    'User': User,
                    'Sword': Sword,
                    'Wind': Wind,
                    'BookOpen': BookOpen,
                    'Sparkles': Sparkles,
                    'Skull': Skull
                  }[config.icon];

                  return (
                    <button
                      key={key}
                      onClick={() => scrollToSection(config.sectionId)}
                      className="unified-menu-btn"
                      aria-label={`Jump to ${config.label} section`}
                    >
                      <IconComponent size={18} />
                      {config.abbreviation}
                    </button>
                  );
                })}
                <div className="unified-menu-divider"></div>
                <div className="unified-menu-points">
                  <span className="unified-points-label">Points:</span>
                  <span className={`unified-points-value ${stats.remaining < 0 ? 'negative' : ''}`}>
                    {stats.remaining}/{BASE_POINTS + extraPoints}
                  </span>
                </div>
              </>
            )}

            <div className="unified-menu-divider"></div>
            <button
              className={`unified-menu-tab ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
              aria-label="View settings"
              aria-current={activeTab === 'settings' ? 'page' : undefined}
            >
                <Settings size={18} />
            </button>
          </div>
        </nav>

        {activeTab === 'character' ? CharacterSheet : activeTab === 'reference' ? ReferenceSheet : SettingsSheet}

        {/* Reset Success Modal */}
        {showResetSuccess && (
          <div className="modal-overlay">
            <div className="modal-dialog">
              <div className="modal-header">
                <CheckCircle size={28} className="modal-icon" />
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
      </div>
    </div>
  );
}

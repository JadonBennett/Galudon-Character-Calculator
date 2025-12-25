# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Galudon Calculator is a React-based character building tool for a tabletop RPG. It manages skill progression across different categories (Constitution, Strength, Dexterity, Scrutiny, Mystics, Curses), calculates derived stats with caps and bonuses, and enforces complex build rules.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on localhost with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Single-File Component Structure

The entire application lives in `src/App.jsx` (~4070 lines). This is intentional for the current scope and organized into clear sections:

**Configuration Constants** (lines ~110-290):
- **BASE_POINTS**: Starting point budget (30)
- **INITIAL_SKILLS**: Base data structure defining all skill categories and their properties
- **TIER_BONUSES**: Maps skill IDs to tier-specific attribute bonuses
- **ATTRIBUTES**: Single source of truth for all 6 attributes (constitution, strength, dexterity, scrutiny, mystics, cursed)
  - Each attribute defines: key, label, icon, baseValue, cap, skillBonus formula, sectionTitle, sectionId, abbreviation, colors
  - Powers dynamic generation of sections, stat cards, and navigation
- **ERROR_MESSAGES**: Centralized error text for rule violations
- **WEAPON_DAMAGE_PROGRESSION**: Damage progression lookup tables

**Helper Functions** (lines ~296-327):
- **calculateAttributeTotal()**: Unified calculation logic for all attributes
  - Parameters: config, skillsArray, tierBonus, wieldingBonus, lichActive
  - Returns: total, raw, skillDetails, fromSkills, tierBonus, wieldingBonus, capped, cap, lichCap
  - Handles skill bonuses, tier bonuses, wielding bonuses, caps, and Lich dexterity cap

**Helper Components** (lines ~334-467):
- **StatTooltip**: Reusable tooltip for displaying attribute breakdowns
- **StatCard**: Reference sheet stat card component (uses ATTRIBUTES + StatTooltip)
- **SkillSection**: Dynamically renders skill sections (uses ATTRIBUTES + StatTooltip)
  - All 6 sections use this component, eliminating 250+ lines of duplication

**Main Components** (lines ~474+):
- **SkillRow**: Memoized component for individual skill rendering
- **GaludonCalculator**: Main component with all state and logic

### State Management

State is managed via React hooks in the main component:
- `skills`: Skill tiers across all categories
- `extraPoints`: User-allocated bonus points
- `virtuoso`: Flag allowing multiple tier-3 skills
- `characterName`, weapon states, wielding flags for UI

### Key Calculation Logic

**Stats Calculation** (`useMemo` in GaludonCalculator):
1. Aggregates all skills across categories
2. Calculates points spent (curses cost 3 flat if tier >= 1, mystics cost 1 per tier)
3. Enforces limits: max 1 tier-3 skill (unless virtuoso), max 1 mystic with tiers, max 1 curse with tiers
4. Computes tier bonuses from TIER_BONUSES map
5. Derives final attributes with caps (usually 20, except Lich caps Dexterity at 8)
6. Generates detailed breakdowns for tooltip displays

**Special Rules Implemented**:
- Lich with Mortanum subclass costs 0 points
- Heavy weapon wielding adds +2 Strength
- Finesse weapon wielding adds +2 Dexterity
- Attribute caps are enforced (Constitution, Strength, Dexterity, Scrutiny = 20 max; Mystics = 14 max)
- Lich active caps Dexterity at 8

### Component Patterns

- **Configuration-Driven UI**: ATTRIBUTES constant powers dynamic generation of sections, navigation, and stat cards
- **Memoization**: SkillRow, StatTooltip, StatCard, and SkillSection use `React.memo` to prevent unnecessary re-renders
- **Component Composition**: StatTooltip is reused in both SkillSection headers and StatCard components
- **Unified Navigation**: Single consolidated menu bar with conditional section navigation (shows skill section buttons only on character tab)
- **Editable Skills**: Arts and Academics skills support inline name editing
- **Subclass Selection**: Curses have dropdown selects for bloodlines/pacts/paths
- **Error States**: Visual indicators (red backgrounds, error icons) for rule violations

### Data Flow

1. **Configuration → Components**: ATTRIBUTES constant defines properties for all 6 attributes, consumed by SkillSection and StatCard
2. **Skills State**: INITIAL_SKILLS → component state → SkillSection → SkillRow components
3. **Calculations**: calculateAttributeTotal() helper processes skills + bonuses → stats useMemo → breakdown objects
4. **Updates**: User interactions → callbacks (`updateSkill`, `updateSkillName`, `updateSkillSubclass`) → state updates → re-render
5. **Derived Stats**: All attributes compute in a single `useMemo` hook using calculateAttributeTotal() for consistency

## Common Modifications

### Adding New Skills
1. Add skill object to appropriate category in INITIAL_SKILLS (lines ~111-150)
2. If it grants tier bonuses, add entry to TIER_BONUSES with structure: `{ tier: { attribute: bonus } }`

### Adding New Curses/Mystics
Include `cost` property (1 for mystics, 3 for curses). For curses, add `subclass`, `subclassOptions`, `subclassPrompt` fields.

### Adding a New Attribute (Rare)
If you need to add a 7th attribute:
1. Add entry to ATTRIBUTES constant (lines ~160-272) with all required properties
2. Add category to INITIAL_SKILLS structure
3. Update stats useMemo to call calculateAttributeTotal() for the new attribute
4. No changes needed to SkillSection, StatCard, or navigation - they auto-generate from ATTRIBUTES

### Modifying Attribute Properties
Edit the ATTRIBUTES constant (lines ~160-272):
- **baseValue**: Starting value before any bonuses
- **cap**: Maximum allowed value (standard is 20, mystics is 14)
- **skillBonus**: Formula function that takes tier and returns bonus (e.g., `(tier) => 2 * tier - 1`)
- **colors**: Used in CSS for section headers and stat cards

### Modifying Calculation Rules
Main stat calculation logic is in the `stats` useMemo (starts around line 616):
- Uses calculateAttributeTotal() helper for all 6 attributes
- Breakdown structure must match StatTooltip rendering expectations
- Special rules (Lich cap, wielding bonuses) are applied in the calculateAttributeTotal() calls

### Modifying Skill Bonus Formulas
Edit the skillBonus function in the specific attribute's ATTRIBUTES entry:
```javascript
// Example: Constitution, Strength, Dexterity, Scrutiny use 2*tier - 1
skillBonus: (tier) => 2 * tier - 1

// Example: Mystics uses 4.5 * tier
skillBonus: (tier) => 4.5 * tier

// Example: Cursed uses flat 20 if tier >= 1
skillBonus: (tier) => tier >= 1 ? 20 : 0
```

### Modifying Error Messages
Edit ERROR_MESSAGES constant (lines ~274-279) to change error text displayed to users.

## Styling Implementation Notes

### Unified Menu Points Display - Optical Centering

The unified menu points display ("Points: X/Y") uses transform to optically center the text despite font metrics:

```css
.unified-points-label {
  transform: translateY(2px);  /* Rajdhani font optical adjustment */
}

.unified-points-value {
  transform: translateY(1px);  /* Orbitron font optical adjustment */
}
```

**Why this is needed:** Fonts have built-in vertical metrics (baseline, descenders, ascenders) that can make text appear off-center even when technically centered. The Rajdhani and Orbitron fonts used here have different vertical metrics, requiring different transform values for optical balance.

**If you change fonts:** You may need to adjust these translateY values. Test by inspecting the visual centering within the 40px height container.

### Points Card Decorative Corners

The `.points-card` uses `::before` pseudo-element with `box-shadow` to create decorative corner dots. If card dimensions change, corner positions must be recalculated:

**Formula for box-shadow offsets:**
```
Right corner X = card_width - border_width*2 - left_margin - dot_width - right_margin
Bottom corner Y = card_height - border_width*2 - top_margin - dot_height - bottom_margin
```

**Current values:**
- Desktop (280px × 100px, 6px border):
  - Right: `280 - 12 - 8 - 8 - 8 = 244px`
  - Bottom: `100 - 12 - 8 - 8 - 8 = 64px`
- Mobile (300px × 90px, 6px border):
  - Right: `300 - 12 - 8 - 8 - 8 = 264px`
  - Bottom: `90 - 12 - 8 - 8 - 8 = 54px`

The 8px values account for: top/left positioning (8px), dot size (8px), and desired margin from edge (8px). Border width must be subtracted because absolute positioning is relative to the inside of the border.

## Refactoring History

### December 2024 - Code Consolidation
**Goal**: Reduce duplication while maintaining single-file architecture

**Changes**:
- Reduced file from ~4,480 to ~4,070 lines (410 line reduction)
- Created ATTRIBUTES configuration constant as single source of truth
- Extracted calculateAttributeTotal() helper function (eliminated 60+ lines of duplicate calculation logic)
- Built reusable components: StatTooltip, StatCard, SkillSection (eliminated 400+ lines of JSX duplication)
- Consolidated 3 separate menu bars into 1 unified navigation with conditional rendering
- Added section comment headers for better code organization
- Extracted ERROR_MESSAGES and WEAPON_DAMAGE_PROGRESSION constants

**Benefits**:
- Configuration-driven architecture makes adding new attributes significantly easier
- Single source of truth prevents inconsistencies
- Better maintainability: update once, affects everywhere
- Improved code organization with clear sections
- All functionality and visual appearance preserved

## Dependencies

- React 19.2.1
- Vite 7.2.7 (build tool)
- lucide-react 0.556.0 (icons)
- @vitejs/plugin-react 5.1.2

## Project Constraints

- No backend, all state is client-side only
- No test suite currently configured
- No linter configured
- Inline styles via Tailwind-like utility classes (embedded in JSX)
- Must maintain single-file architecture (do not split App.jsx into multiple files)
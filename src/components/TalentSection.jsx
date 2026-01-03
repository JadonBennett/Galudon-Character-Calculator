import React from 'react';
import { ATTRIBUTES, ICON_MAP } from '../config/attributes';
import { getWarfareGrantedTalentId, getArtsGrantedTalentIds, isArtsTalent } from '../utils/talentHelpers';
import { calculateFreeTiers } from '../utils/freeTiers';
import StatTooltip from './StatTooltip';
import TalentRow from './TalentRow';

const TalentSection = React.memo(({
  attributeKey,
  talents,
  stats,
  updateTalent,
  updateTalentName,
  updateTalentSubclass,
  virtuoso,
  setTalents
}) => {
  const config = ATTRIBUTES[attributeKey];

  // Map icon names to actual icon components
  const IconComponent = ICON_MAP[config.icon];

  const breakdown = stats.breakdowns[attributeKey];
  const total = stats[`${attributeKey}Total`];
  const categorySkills = talents[config.key];

  // Find warfare-granted skill (if any)
  const warfareGrantedTalentId = getWarfareGrantedTalentId(talents);

  // Find Arts-granted skills (if any)
  const artsGrantedTalentIds = getArtsGrantedTalentIds(talents);

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
    <section className={`talent-section section-${attributeKey}`}>
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
          const isWarfareGranted = skill.id === warfareGrantedTalentId && skill.tier === 1;

          // Count how many times this skill is granted by The Arts (could be 0, 1, or 2)
          const artsGrantedCount = artsGrantedTalentIds.filter(id => id === skill.id).length;

          // Calculate free tiers granted to this skill
          const freeTiersInfo = calculateFreeTiers(config.key, skill.id, talents);
          const freeTiers = freeTiersInfo.count;
          const displayTier = skill.tier + freeTiers;

          // For The Arts skills, pass Academics skills for dynamic dropdown
          const academicsSkills = isArtsTalent(skill.id)
            ? talents.scrutiny?.filter(s => s.id === 'academics-1' || s.id === 'academics-2')
            : null;

          return (
            <TalentRow
              key={skill.id}
              talent={skill}
              freeTiers={freeTiers}
              freeTiersSources={freeTiersInfo.sources}
              displayTier={displayTier}
              category={config.key}
              updateTalent={updateTalent}
              updateTalentName={updateTalentName}
              updateTalentSubclass={updateTalentSubclass}
              tier3Count={stats.tier3Count}
              canAffordIncrease={canAffordIncrease}
              virtuoso={virtuoso}
              hasMysticsError={stats.hasMysticsError}
              hasCursesError={stats.hasCursesError}
              mysticsWithTiersCount={stats.mysticsWithTiersCount}
              cursesWithTiersCount={stats.cursesWithTiersCount}
              isWarfareGranted={isWarfareGranted}
              artsGrantedCount={artsGrantedCount}
              academicsSkills={academicsSkills}
              setTalents={setTalents}
            />
          );
        })}
      </div>
    </section>
  );
});

export default TalentSection;

import React, { useState } from 'react';

import { ISkills } from '../../../../models/profile/ISkills';
import { flattenSkillsHierarchy } from '../../../../utils/interview/calculateAndSortSharedSkills';
import styles from './UserSkills.module.scss';

function SkillBlock({ skills }: Readonly<{ skills: ISkills[] }>): React.JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${styles.skillBlock} ${styles.blockBorder}`}>
      {skills.length > 2 && (
        <button type="button" onClick={() => setIsExpanded(!isExpanded)} className={styles.toggleButton}>
          {isExpanded
            ? <div className={styles.arrowUp}>{'>'}</div>
            : <div className={styles.arrowDown}>{'>'}</div>}
        </button>
      )}
      {flattenSkillsHierarchy(skills).slice(0, 2)?.map((skill) => (
        <p key={skill.id} className={styles.skillItem}>{skill.name}</p>
      ))}
      {isExpanded && flattenSkillsHierarchy(skills).slice(2).map((skill) => (
        <p key={skill.id} className={styles.skillItem}>{skill.name}</p>
      ))}
    </div>
  );
}

export default SkillBlock;

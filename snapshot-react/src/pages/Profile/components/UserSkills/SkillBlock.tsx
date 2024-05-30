import React, { useState } from 'react';

import { ISkills } from '../../../../models/profile/ISkills';
import { flattenSkillsHierarchy } from '../../../../utils/interview/calculateAndSortSharedSkills';
import styles from './UserSkills.module.scss';

interface SkillBlockProp {
  skills: ISkills[],
  onClick?: (num: number) => void
}

function SkillBlock({ skills, onClick = (): void => {} }: Readonly<SkillBlockProp>): React.JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {skills.length > 2 && (
        <button type="button" onClick={() => setIsExpanded(!isExpanded)} className={styles.toggleButton}>
          {isExpanded
            ? <div className={styles.arrowUp}>{'>'}</div>
            : <div className={styles.arrowDown}>{'>'}</div>}
        </button>
      )}
      {flattenSkillsHierarchy(skills).slice(0, 2)?.map((skill) => (
        <button type="button" key={skill.id} className={styles.skillItem}
          onClick={skill.shared ? ():void => onClick(skill.id) : ():null => null}>
          {skill.name}
        </button>
      ))}
      {isExpanded && flattenSkillsHierarchy(skills).slice(2).map((skill) => (
        <button type="button" key={skill.id} className={styles.skillItem}
          onClick={skill.shared ? ():void => onClick(skill.id) : ():null => null}>
          {skill.name}
        </button>
      ))}
    </>
  );
}

export default SkillBlock;

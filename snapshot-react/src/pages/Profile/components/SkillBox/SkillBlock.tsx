import React, { useState } from 'react';

import { ISkills } from '../../../../models/profile/ISkills.ts';
import styles from './SkillBlock.module.scss';
import Skill from "../Skills/Skill.tsx";

export interface SkillProps {
  skills: ISkills[];
}

function SkillBlock({ skills }: { skills: ISkills[] }): React.JSX.Element {
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
      <section className={styles.userRoleSkill}>
        <h3>Мої навички</h3>
        <div className={`${styles.skillBlock} ${styles.blockBorder}`}>
          {skills.slice(0, 2)?.map((skill) => (
            <p key={skill.id} className={styles.skillItem}>{skill.name}</p>
          ))}
          {isExpanded && skills.slice(2).map((skill) => (
            <p key={skill.id} className={styles.skillItem}>{skill.name}</p>
          ))}
        </div>
      </section>
    </>
  );
}

export default SkillBlock;

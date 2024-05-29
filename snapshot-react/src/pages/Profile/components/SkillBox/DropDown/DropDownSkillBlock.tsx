import React, { useState } from 'react';

import { ISkills } from '../../../../../models/profile/ISkills.ts';
import styles from '../../../../Interview/InterviewPage.module.scss';
import Skill from '../../Skills/Skill.tsx';

interface DropDownSkillProps {
  skills: ISkills[],
  onClick?: (num: number) => void
}

function DropDownSkillBlock({ skills, onClick }: DropDownSkillProps): React.JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {skills.length > 5 && (
        <button type="button" onClick={() => setIsExpanded(!isExpanded)} className={styles.toggleButton}>
          {isExpanded
            ? <div className={styles.arrowUp}>{'>'}</div>
            : <div className={styles.arrowDown}>{'>'}</div>}
        </button>
      )}
      <div className={styles.blockSkills}>
        {skills.slice(0, 7).map((skill) => (
          <Skill
            key={skill.id}
            className={skill.shared ? `${styles.active}` : ''}
            onClick={skill.shared ? (): void => onClick?.(skill.id) : (): null => null}
            title={skill.name}
          />
        ))}
        {isExpanded && skills.slice(7).map((skill) => (
          <Skill
            key={skill.id}
            className={skill.shared ? `${styles.active}` : ''}
            onClick={skill.shared ? (): void => onClick?.(skill.id) : (): null => null}
            title={skill.name}
          />
        ))}
      </div>
    </>
  )
  ;
  // DropDownSkillBlock.defaultProps = {
  //   onClick = () => {}
  // };
}

export default DropDownSkillBlock;

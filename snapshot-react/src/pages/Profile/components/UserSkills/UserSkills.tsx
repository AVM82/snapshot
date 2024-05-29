import React from 'react';

import { IRoles } from '../../../../models/user/IRoles';
import { flattenSkillsHierarchy } from '../../../../utils/interview/calculateAndSortSharedSkills';
import SkillBlock from './SkillBlock';
import styles from './UserSkills.module.scss';

function UserSkills({ roles }: { roles: IRoles[] }): React.JSX.Element {
  console.log(roles);

  return (
    <section className={styles.userSkills}>
      <h3>Мої навички</h3>
      {
        roles.map((role) => (
          <>
            <h3>{role.name}:</h3>
            <SkillBlock skills={flattenSkillsHierarchy(role.skills)} />
          </>
        )
        )
      }
    </section>
  );
}

export default UserSkills;

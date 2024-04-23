import React, { useEffect, useState } from 'react';

import snapshotApi from '../../api/request';
import { IRoles } from '../../models/profile/IRoles';
import Skills from './Skills';
import styles from './UserRoles.module.scss';

export default function UserRoles():React.JSX.Element {
  const [userRoles, setUserRoles] = useState<IRoles[]>([]);
  const [userRole, setUserRole] = useState<IRoles>();
  const handleOnClick = (selectedRole: IRoles): void => {
    setUserRole(selectedRole);
  };

  useEffect(() => {
    (async ():Promise<void> => {
      const response:IRoles[] = await snapshotApi.get('http://localhost:8080/users/all-roles');
      setUserRoles(response);
    })();
  }, []);

  if (!userRoles) return <>loading...</>;

  return (
    <div className={styles.userProfileContainer}>
      {userRole ? (
        <Skills id={userRole.id} name={userRole.name} />
      ) : (

        <div className={styles.rolesContainer}>
          <h3>Вибиріть вашу роль:</h3>
          {userRoles.map((role: IRoles) => (
            <label key={role.id}>
              {role.name !== 'ADMIN' && (
                <>
                  <input type="radio" name="preference" value={role.name} onClick={() => handleOnClick(role)} />
                  {role.name}
                </>
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

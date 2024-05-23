import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../../../hooks/redux';
import { InterviewStatuses } from '../../../../models/profile/IInterview';
import { getInterviewsByStatus } from '../../../../utils/notification/getTimeToInterview';
import styles from './NavBar.module.scss';

function NavBar():React.JSX.Element {
  const NavText:Record<InterviewStatuses, string> = {
    COMPLETED: 'Пройдені',
    PLANNED: 'Заплановані',
    ACTIVE: 'Незавершені',
    FINISHED: 'Завершені',
    CANCELLED: 'Відмінені',
    '': ' Всі',
  };
  const interviewStatuses:InterviewStatuses[] = ['COMPLETED', 'PLANNED', 'ACTIVE', 'FINISHED'];
  const interviews = useAppSelector((state) => state.profile.interviews);

  return (
    <nav className={styles.interviewTypesContainer}>
      {interviewStatuses.map((status:InterviewStatuses, index) => (
        <NavLink
          key={status}
          to={index === 0 ? '' : `${status.toLocaleLowerCase()}`}
          end
          className={({ isActive }) => (isActive ? `${styles.activeLink} ${styles.link}` : styles.link)}
          state={ status }
        >
          <p>{NavText[status]}</p>
          <p>{getInterviewsByStatus(interviews, status).length}</p>
        </NavLink>
      ))}
    </nav>
  );
}

export default NavBar;

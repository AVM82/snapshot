import React, { useEffect } from 'react';
import {
  NavLink, Outlet, useParams,
} from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux';
import { InterviewStatuses } from '../../models/profile/IInterview';
import { getLowerSkills, getMyInterviews, getPortrait } from '../../store/reducers/profile/actions';
import styles from './profile.module.scss';

function Profile(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { userId } = useParams();

  useEffect(() => {
    const fetchProfileData = async (): Promise<void> => {
      await dispatch(getMyInterviews());
      await dispatch(getLowerSkills(Number(userId)));
      await dispatch(getPortrait(Number(userId)));
    };

    fetchProfileData();
  }, [dispatch, userId]);
  const interviewStatuses:InterviewStatuses[] = ['', 'PLANNED', 'FINISHED', 'COMPLETED'];

  return (
    <section className={styles.profileContainer}>

      <nav className={styles.interviewTypesContainer}>
        {interviewStatuses.map((status) => (
          <NavLink
            key={status}
            to={`${status}`}
            end
            className={({ isActive }) => (isActive ? `${styles.activeLink} ${styles.link}` : styles.link)}
          >
            <p>{status}</p>
            <p>0</p>
          </NavLink>
        ))}
      </nav>
      <div>
        <Outlet />

        {/* <Portrait /> */}
      </div>
    </section>
  );
}

export default Profile;

import React, { useEffect } from 'react';
import {
  Link,
  Outlet, useParams,
} from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux';
import { getLowerSkills, getMyInterviews, getPortrait } from '../../store/reducers/profile/actions';
import Feedback from './components/Feedback/Feedback';
import InterviewActionPanel from './components/InterviewActionPanel/InterviewActionPanel';
import NavBar from './components/NavBar/NavBar';
import UserCard from './components/UserCard/UserCard';
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

    (async ():Promise<void> => {
      await fetchProfileData();
    })();
  }, [dispatch, userId]);

  return (
    <section className={styles.profileContainer}>
      <Feedback/>

      <div className={styles.profileHeader}>
        <h2>Мій профіль</h2>
        <InterviewActionPanel />
      </div>
      <section className={styles.bodyContainer}>
        <section className={styles.avatar}>
          <div className={styles.profileVisibility}>
            <span className={styles.info} />
            <p>Відкритий профіль</p>
            <label className={styles.switcher}>
              <input type="checkbox" />
              <span className={styles.slider} />
            </label>
          </div>
          <UserCard />
          <div />
        </section>
        <section className={styles.InterviewStatisticsContainer}>
          <div>

            <h3>Статистика співбесід</h3>
            <NavBar />
          </div>
          <div>
            <div className={styles.tableHeader}>
              <h3>Журнал співбесід</h3>
              <Link to="all" className={styles.link}>

                <h5>всі співбесіди</h5>
              </Link>
            </div>
            <Outlet />
          </div>
        </section>
      </section>
    </section>

  );
}

export default Profile;

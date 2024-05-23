import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { InterviewStatuses } from '../../models/profile/IInterview';
import IInterviewPreview from '../../models/profile/IInterviewPreview';
import { getLowerSkills, getMyInterviews, getPortrait } from '../../store/reducers/profile/actions';
import { getInterviewsByStatus } from '../../utils/notification/getTimeToInterview';
import InterviewActionPanel from './components/Interviews/components/InterviewActionPanel/InterviewActionPanel';
import MyInterviews from './components/Interviews/components/MyInterviews/MyInterviews';
import InterviewStatusSelector from './components/InterviewStatusSelector/InterviewStatusSelector';
import ProfileVisibility from './components/ProfileVisibility/ProfileVisibility';
import UserCard from './components/UserCard/UserCard';
import styles from './profile.module.scss';

function Profile(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const [status, setStatus] = useState<InterviewStatuses>('COMPLETED');
  useEffect(() => {
    const fetchProfileData = async (): Promise<void> => {
      await dispatch(getMyInterviews());
      await dispatch(getLowerSkills(Number(userId)));
      await dispatch(getPortrait({ id: userId as string }));
    };

    (async ():Promise<void> => {
      await fetchProfileData();
    })();
  }, [dispatch, userId]);
  const handleChangeStatus=(newStatus: InterviewStatuses):void => {
    setStatus(newStatus as InterviewStatuses);
  };

  const interviews = useAppSelector((state) => state.profile.interviews);
  const actualStatus: InterviewStatuses = status || '';
  const actualInterviews:IInterviewPreview[] = actualStatus === '' ? interviews :
    getInterviewsByStatus(interviews, actualStatus);

  return (
    <section className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h2>Мій профіль</h2>
        <InterviewActionPanel />
      </div>
      <section className={styles.bodyContainer}>
        <section className={styles.avatar}>
          <ProfileVisibility/>
          <UserCard />
          <div />
        </section>
        <section className={styles.InterviewStatisticsContainer}>
          <div>
            <h3>Статистика співбесід</h3>
            <InterviewStatusSelector onClick={handleChangeStatus} status={status}/>
          </div>
          <div>
            <div className={styles.tableHeader}>
              <h3>Журнал співбесід</h3>
              <button type="button" className={styles.link} onClick={()=>setStatus('')}>
                <h5>всі співбесіди</h5>
              </button>
            </div>
            <MyInterviews interviews={actualInterviews}/>
          </div>
        </section>
      </section>
    </section>
  );
}

export default Profile;

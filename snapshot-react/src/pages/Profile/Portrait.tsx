import React from 'react';

import { useAppSelector } from '../../hooks/redux';
import InterviewActionPanel from './components/InterviewActionPanel/InterviewActionPanel';
import styles from './MyInterviews.module.scss';
import PortraitItem from './components/PortraitItem';

function Portrait(): React.JSX.Element {
  const interviews = useAppSelector((state) => state.profile.interviews);

  return (
    <div className={styles.MyInterviewsContainer}>
      <div className={styles.interviewList}>
        {interviews.map((item) => <PortraitItem key={item.id} />)}
      </div>
      <InterviewActionPanel />
    </div>
  );
}

export default Portrait;
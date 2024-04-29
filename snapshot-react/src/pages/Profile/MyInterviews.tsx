import React from 'react';

import { useAppSelector } from '../../hooks/redux';
import InterviewActionPanel from './components/InterviewActionPanel/InterviewActionPanel';
import InterviewItem from './InterviewItem';
import styles from './MyInterviews.module.scss';

function MyInterviews(): React.JSX.Element {
  const interviews = useAppSelector((state) => state.profile.interviews);

  return (
    <div className={styles.MyInterviewsContainer}>
      {interviews.map((item) => <InterviewItem key={item.id} id={item.id} title={item.title} status={item.status} />)}
      <InterviewActionPanel />
    </div>
  );
}

export default MyInterviews;

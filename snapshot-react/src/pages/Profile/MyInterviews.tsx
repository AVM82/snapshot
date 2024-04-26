import React from 'react';

import InterviewActionPanel from './components/InterviewActionPanel/InterviewActionPanel';
import InterviewItem from './InterviewItem';
import styles from './MyInterviews.module.scss';

function MyInterviews(): React.JSX.Element {
  return (
    <div className={styles.MyInterviewsContainer}>
      <InterviewItem />
      <InterviewActionPanel />
    </div>
  );
}

export default MyInterviews;

import React from 'react';

import { useAppSelector } from '../../hooks/redux';
import { InterviewStatuses } from '../../models/profile/IInterview';
import IInterviewPreview from '../../models/profile/IInterviewPreview';
import { getInterviewsByStatus } from '../../utils/notification/getTimeToInterview';
import InterviewActionPanel from './components/InterviewActionPanel/InterviewActionPanel';
import InterviewItem from './InterviewItem';
import styles from './MyInterviews.module.scss';

interface MyInterviewsProps {
  status: InterviewStatuses;
}

function MyInterviews({ status }:MyInterviewsProps): React.JSX.Element {
  const interviews = useAppSelector((state) => state.profile.interviews);
  const actualInterviews:IInterviewPreview[] = getInterviewsByStatus(interviews, status);

  return (
    <div className={styles.MyInterviewsContainer}>
      <div className={styles.interviewList}>
        {actualInterviews.map((item) => (
          <InterviewItem
            key={item.id}
            id={item.id}
            title={item.title}
            status={item.status}
            searcherFullName={item.searcherFullName}
            interviewerFullName={item.interviewerFullName}
          />
        ))}
      </div>
      <InterviewActionPanel />
    </div>
  );
}

export default MyInterviews;

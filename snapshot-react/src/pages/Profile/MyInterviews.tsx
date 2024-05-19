import React from 'react';

import {useAppSelector} from '../../hooks/redux';
import {InterviewStatuses} from '../../models/profile/IInterview';
import IInterviewPreview from '../../models/profile/IInterviewPreview';
import {getInterviewsByStatus} from '../../utils/notification/getTimeToInterview';
import InterviewItemRow from './components/InterviewTableRow/InterviewItemRow';
import styles from './MyInterviews.module.scss';

interface MyInterviewsProps {
  status: InterviewStatuses;
}

function MyInterviews({ status }:MyInterviewsProps): React.JSX.Element {
  const interviews = useAppSelector((state) => state.profile.interviews);
  const actualInterviews:IInterviewPreview[] = status === '' ? interviews : getInterviewsByStatus(interviews, status);

  return (
    <table className={styles['interview-table']}>
      <thead className={styles['interview-table-header']}>
        <tr>
          <th>Дата</th>
          <th>Направлення</th>
          <th>Статус</th>
          <th>Дія</th>
        </tr>
      </thead>
      <tbody>
        {actualInterviews.map((item) => (
          <InterviewItemRow
            {...item}
          />
        ))}
      </tbody>
    </table>
  );
}

export default MyInterviews;

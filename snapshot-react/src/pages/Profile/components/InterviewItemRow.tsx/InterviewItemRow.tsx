import React from 'react';

import IInterviewPreview from '../../../../models/profile/IInterviewPreview';
import { toLocalDate } from '../../../../utils/interview/formatQuestionsWithLocalDate';
import styles from './InterviewItemRow.module.scss';
import TableButton from './TableButton';

function InterviewTable({
  id,
  status, searcherFullName, plannedDateTime, endDateTime,
}: IInterviewPreview): React.JSX.Element {
  const date = endDateTime ? toLocalDate(endDateTime) : toLocalDate(plannedDateTime);

  return (
    <tr>
      <td>{date}</td>
      <td>{searcherFullName}</td>
      <td>{status}</td>
      <td>
        <div className={styles.buttonGroup}>
          <TableButton id={id} status={status} />
        </div>
      </td>
    </tr>
  );
}

export default InterviewTable;

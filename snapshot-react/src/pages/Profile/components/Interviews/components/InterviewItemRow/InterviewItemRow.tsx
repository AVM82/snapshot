import React from 'react';

import IInterviewPreview from '../../../../../../models/profile/IInterviewPreview';
import { toLocalDate } from '../../../../../../utils/interview/formatQuestionsWithLocalDate';
import styles from './InterviewItemRow.module.scss';
import TableButton from './TableButton';

function InterviewTable({
  id,
  status, searcherFullName, plannedDateTime, endDateTime,title
}: IInterviewPreview): React.JSX.Element {
  const date = endDateTime ? toLocalDate(endDateTime) : toLocalDate(plannedDateTime);
  console.log(endDateTime);
  const statusText = ():string=>{
    switch (status){
      case 'CANCELLED':return 'скасована';
      case 'PLANNED':return 'запланована';
      case 'ACTIVE': return 'активнє';
      case 'FINISHED' :return 'проведена';
      default: return 'завершено';
    }
  };

  return (
    <tr>
      <td>{date}</td>
      <td>{searcherFullName}</td>
      <td className={`${status==='FINISHED'? styles.finishedStatus:''}`}>{statusText()}</td>
      <td aria-label="table button" className={styles.buttonGroup}>
        <TableButton id={id} status={status} title={title} />
      </td>
    </tr>
  );
}

export default InterviewTable;

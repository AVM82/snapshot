import React from 'react';

import deleteIcon from '../../../../assets/deleteInterviewIcon.svg';
import planIcon from '../../../../assets/planIcon.svg';
import IInterviewPreview from '../../../../models/profile/IInterviewPreview';
import styles from '../../MyInterviews.module.scss';

function InterviewTable({ status, searcherFullName, plannedDateTime }: IInterviewPreview): React.JSX.Element {
  return (
    <tr>
      <td>{status === 'PLANNED' ? plannedDateTime : plannedDateTime}</td>
      <td>{searcherFullName}</td>
      <td>{status}</td>
      <td>
        <div className={styles['button-group']}>
          <div className={styles['table-button']}>
            <button type="button">СКАСУВАТИ</button>
            <img src={deleteIcon} width="21px" height="21px" alt="Cross" />
          </div>
          <div className={styles['table-button']}>
            <button type="button">ПЕРЕНЕСТИ</button>
            <img src={planIcon} width="21px" height="21px" alt="Calendar" />
          </div>
        </div>
      </td>
    </tr>
  );
}

export default InterviewTable;

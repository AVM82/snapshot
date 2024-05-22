import React, { useState } from 'react';

import   arrowDropDown  from '../../../../../../assets/arrowDropDown.svg';
import { useAppSelector } from '../../../../../../hooks/redux';
import { InterviewStatuses } from '../../../../../../models/profile/IInterview';
import IInterviewPreview from '../../../../../../models/profile/IInterviewPreview';
import { getInterviewsByStatus } from '../../../../../../utils/notification/getTimeToInterview';
import InterviewItemRow from '../InterviewItemRow/InterviewItemRow';
import styles from './MyInterviews.module.scss';

interface MyInterviewsProps {
  status: InterviewStatuses;
}

function MyInterviews({ status }:MyInterviewsProps): React.JSX.Element {
  const [numberOfRows, setNumberOfRows] = useState(4);
  const interviews = useAppSelector((state) => state.profile.interviews);
  const actualInterviews:IInterviewPreview[] = status === '' ? interviews : getInterviewsByStatus(interviews, status);
  const renderTableBody = (): React.JSX.Element[] => (

    [...actualInterviews]?.reverse().slice(0,numberOfRows).map((item) => (
      <InterviewItemRow
        key={item.id}
        {...item}
      />
    ))
  );
  const increaseNumberOfRows = ():void =>{
    setNumberOfRows((currentNumber:number)=>currentNumber+4);
  };

  return (
    <>
      <table className={styles.interviewTable}>
        <thead className={styles.interviewTableHeader}>
          <tr>
            <th>Дата</th>
            <th>Направлення</th>
            <th>Статус</th>
            <th>Дія</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {renderTableBody()}
        </tbody>

      </table>
      {numberOfRows<=actualInterviews.length&&

(      <div className={styles.DropDownButton}>
  <button type="button" onClick={increaseNumberOfRows}>
          завантажити ще
    <img src={arrowDropDown} width="24px" height="24px" alt="downward pointing arrow"
      className={styles.DropDownIcon}/>
  </button>

</div>
)      }
    </>
  );
}

export default MyInterviews;

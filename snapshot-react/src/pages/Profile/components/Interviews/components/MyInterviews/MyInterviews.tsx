import React, { useState } from 'react';

import arrowDropDown from '../../../../../../assets/arrowDropDown.svg';
import IInterviewPreview from '../../../../../../models/profile/IInterviewPreview';
import InterviewItemRow from '../InterviewItemRow/InterviewItemRow';
import styles from './MyInterviews.module.scss';

function MyInterviews({ interviews }:{ interviews:IInterviewPreview[] }): React.JSX.Element {
  const [numberOfRows, setNumberOfRows] = useState(4);

  const renderTableBody = (): React.JSX.Element[] => (

    [...interviews].reverse().slice(0,numberOfRows).map((item) => (
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
      {numberOfRows<=interviews.length&& (
        <div className={styles.DropDownButton}>
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

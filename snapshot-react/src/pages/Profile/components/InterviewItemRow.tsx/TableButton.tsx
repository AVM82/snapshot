import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../../hooks/redux';
import { InterviewStatuses } from '../../../../models/profile/IInterview';
import { updateInterviewById, updateInterviewStatus } from '../../../../store/reducers/interwiew/actions';
import styles from './InterviewItemRow.module.scss';

interface TableButtonProps {
  id:number,
  status:InterviewStatuses
}

function TableButton({ status, id }:TableButtonProps):React.JSX.Element {
  const [plannedDateTime, setPlannedDateTime] = useState('');
  const [showDateInput, setShowDateInput] = useState(false);
  const dispatch = useAppDispatch();
  const handleCancelInterview = () :void => {
    dispatch(updateInterviewStatus({ id, status: 'CANCELLED' }));
  };
  const handleChangePlanedTime = ():void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const formattedDateString = plannedDateTime.toLocaleString('en-US', { timeZone: 'UTC-0' });
    const formattedDate = new Date(formattedDateString);
    dispatch(updateInterviewById({ id, plannedDateTime:formattedDate }));
  };
  const renderTableButton = ():React.JSX.Element => {
    switch (status) {
      case 'PLANNED': return (
        <>
          <button className={styles.tableButton} type="button" onClick={handleCancelInterview}>
            Скасувати
            <span className={styles.cancelIcon} />
          </button>

          <button className={styles.tableButton} type="button" onClick={() => setShowDateInput(true)}>
            Перенести
            <span className={styles.scheduleIcon} />
          </button>
          {showDateInput && (
            <div>
              <input type="datetime-local"  onBlur={(e)=>setPlannedDateTime(e.target.value)}/>
              <button type="button" onClick={handleChangePlanedTime}>+</button>
            </div>
          )}
        </>
      );
      case 'ACTIVE': return (
        <button className={styles.tableButton} type="button">
          Перейти
          <span className={styles.closeIcon} />
        </button>
      );
      case 'FINISHED':return (
        <button className={styles.tableButton} type="button">
          Залишити відгук
          <span className={styles.closeIcon}/>
        </button>
      );
      default:
        return (
          <Link to={`${id}`}>

            <button className={styles.tableButton} type="button" >
            Скасувати
              <span className={styles.cancelIcon} />
            </button>
          </Link>
        );
    }
  };

  return renderTableButton();
}

export default TableButton;

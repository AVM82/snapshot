import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../../../../hooks/redux';
import { resetInterviewState } from '../../../../store/reducers/interwiew/interviewSlice';
import styles from '../../MyInterviews.module.scss';
import InterviewScheduler from '../InterviewScheduler/InterviewScheduler';

function InterviewActionPanel():React.JSX.Element {
  const [showNewInterview, setShowNewInterview] = useState(false);
  const [showInterviewScheduler, setShowInterviewScheduler] = useState(false);
  const handleNewInterviewClick = ():void => setShowNewInterview(true);
  const dispatch = useAppDispatch();
  const handleSchedulerClose = ():void => {
    setShowInterviewScheduler(false);
    setShowNewInterview(false);
  };
  const handleLinkToInterview = ():void => {
    dispatch(resetInterviewState());
  };

  const renderNewInterviewBlock = ():React.JSX.Element => (
    <div className={styles.NewInterviewBlock}>
      <button type="button" onClick={handleLinkToInterview}>
        <Link to="/interview" className={styles.Link}>
          Розпочати
        </Link>
      </button>
      <button type="button" onClick={() => setShowInterviewScheduler(true)}>
        Запланувати
      </button>
      <button type="button" onClick={() => setShowNewInterview(false)} className={styles.closeButton}>
        X
      </button>
    </div>
  );

  const renderNewInterviewButton = ():React.JSX.Element => (
    <div>
      {!showNewInterview ? (
        <button type="button" onClick={handleNewInterviewClick}>
          Нове інтрев&apos;ю
        </button>
      ) : (
        renderNewInterviewBlock()
      )}
    </div>
  );

  return (
    <div>
      {!showInterviewScheduler
        ? renderNewInterviewButton()
        : <InterviewScheduler onClose={handleSchedulerClose} className={styles.InterviewScheduler} />}
    </div>
  );
}
export default InterviewActionPanel;

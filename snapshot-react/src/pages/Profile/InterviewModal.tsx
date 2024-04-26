/* eslint-disable import/no-cycle */
import { useContext, useState } from 'react';
import Markdown from 'react-markdown';

import { ModalContext } from '../../components/Layout/Layout';
import { useAppSelector } from '../../hooks/redux';
import Questions from './Questions';

function InterviewModal(): JSX.Element {
  const user = useAppSelector((state) => state.user.userData);
  const [feedbackClicked, setFeedbackClicked] = useState(false);
  const setInterviewOpened = useContext(ModalContext);

  return (
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <button
        type="button"
        onClick={() => {
          if (setInterviewOpened) setInterviewOpened(true);
        }}
      >
        X
      </button>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
      >
        <p>
          Name:
          {user.firstname}
        </p>
        <p>
          Surname:
          {user.lastname}
        </p>
        <Questions />
        {feedbackClicked ? (
          <div
            style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
          >
            <label htmlFor="feedback">Текстовий фідбек (Підтримується markdown)</label>
            <textarea name="feedback" id="feedback" cols={30} rows={10} />
          </div>
        ) : (
          <div
            role="button"
            tabIndex={0}
            onClick={() => setFeedbackClicked(!feedbackClicked)}
            style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
          >
            <Markdown>FEEDBACK</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewModal;

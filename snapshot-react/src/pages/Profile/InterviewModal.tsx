/* eslint-disable import/no-cycle */
import { useContext, useState } from 'react';
import Markdown from 'react-markdown';

import { ModalContext } from '../../components/Layout/Layout';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeFeedback } from '../../store/reducers/profile/actions';
import Questions from './Questions';

function InterviewModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userData);
  const interview = useAppSelector((state) => state.profile.interview);
  const [feedbackClicked, setFeedbackClicked] = useState(false);
  const [newFeedback, setNewFeedback] = useState(interview.feedback);
  const setInterviewOpened = useContext(ModalContext);

  const handleChangeFeedback = (): void => {
    dispatch(changeFeedback({ interviewId: interview.id, feedback: newFeedback }));
  };

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
          if (setInterviewOpened) setInterviewOpened(false);
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
        <Questions questions={interview.questions} />
        {feedbackClicked ? (
          <div
            style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
          >
            <label htmlFor="feedback">Текстовий фідбек (Підтримується markdown)</label>
            <textarea
              name="feedback"
              id="feedback"
              cols={30}
              rows={10}
              value={newFeedback}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => setNewFeedback(e.target.value)}
            />
            <button
              type="submit"
              onClick={handleChangeFeedback}
            >
              Зберегти
            </button>
            <button type="button" onClick={(): void => setNewFeedback(interview.feedback)}>Відмінити</button>
          </div>
        ) : (
          <div
            role="button"
            tabIndex={0}
            onClick={() => setFeedbackClicked(!feedbackClicked)}
            style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
          >
            <Markdown>{interview.feedback}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewModal;

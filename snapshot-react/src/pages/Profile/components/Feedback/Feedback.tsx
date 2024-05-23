import React, { useState } from 'react';
import Markdown from 'react-markdown';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { changeFeedback } from '../../../../store/reducers/profile/actions';
import Questions from '../Questions/Questions';

function Feedback(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user.userData);
  const interview = useAppSelector((state) => state.profile.interview);
  const [feedbackClicked, setFeedbackClicked] = useState(false);
  const [newFeedback, setNewFeedback] = useState(interview.feedback);
  const handleChangeFeedback = (): void => {
    dispatch(changeFeedback({ interviewId: interview.id, feedback: newFeedback }));
  };

  return (
    <div style={{ height:'100%' }}>
      <Questions {...interview} />
      {feedbackClicked && id !== interview.searcher.id ? (
        <div
          style={{ display: 'flex',height:'100rem', flexDirection: 'column', cursor: 'pointer' }}
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
          <button
            type="button"
            onClick={(): void => {
              setNewFeedback(interview.feedback);
              setFeedbackClicked(!feedbackClicked);
            }}
          >
            Відмінити
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setFeedbackClicked(!feedbackClicked)}
          style={{ display: 'flex', flexDirection: 'column',height:'20px', background:'#000000', cursor: 'pointer' }}
        >
          <Markdown>{interview.feedback}</Markdown>
        </div>
      )}
    </div>
  );
}

export default Feedback;

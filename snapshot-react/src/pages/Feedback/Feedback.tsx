import { useEffect } from 'react';
import Markdown from 'react-markdown';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import getFeedback from '../../store/reducers/feedback/actions';
import FeedbackItem from './FeedbackItem';

function Feedback(): JSX.Element {
  const dispatch = useAppDispatch();
  const { questions, feedback } = useAppSelector((state) => state.feedback);

  useEffect(() => {
    dispatch(getFeedback());
  }, [dispatch]);

  return (
    <section>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {questions.map((question) => (
          <FeedbackItem
            key={question.id}
            question={question.question}
            score={question.grade}
            skillName={question.skillName}
          />
        ))}
      </div>
      <div>
        <Markdown>{feedback}</Markdown>
      </div>
    </section>
  );
}

export default Feedback;

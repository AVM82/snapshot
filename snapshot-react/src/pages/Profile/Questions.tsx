/* eslint-disable react/destructuring-assignment */
import IQuestion from '../../models/feedback/IQuestion';
import Question from './Question';

function Questions({ questions }: { questions: IQuestion[] }): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {questions.map((question) => (
        <Question {...question} key={question.id} />
      ))}
    </div>
  );
}

export default Questions;

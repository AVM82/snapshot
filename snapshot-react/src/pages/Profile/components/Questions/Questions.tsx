import { IInterview } from '../../../../models/profile/IInterview';
import formatQuestionsWithLocalDate from '../../../../utils/interview/formatQuestionsWithLocalDate';
import Question from './Question';

function Questions({ questions, searcher }: IInterview): JSX.Element {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '10px', overflow: 'auto',
    }}
    >
      {formatQuestionsWithLocalDate(questions).map((question) => (
        <Question {...question} key={question.id} searcherId={searcher.id} />
      ))}
    </div>
  );
}

export default Questions;

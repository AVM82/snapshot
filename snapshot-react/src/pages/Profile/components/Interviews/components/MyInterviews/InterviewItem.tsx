import { Link } from 'react-router-dom';

import IInterviewPreview from '../../../../../../models/profile/IInterviewPreview';

function InterviewItem({
  id,
  title,
  status,
  interviewerFullName,
  searcherFullName
}: Partial<IInterviewPreview>): JSX.Element {
  return (
    <div
      id={String(id)}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
    >
      <button type="button">
        <Link
          onClick={(event) => event.stopPropagation()}
          to={`/interview/${id}`}
        >
          Сторінка Інтервью
        </Link>
      </button>
      <p>{title}</p>
      <p>{status}</p>
      <p>
        from: {interviewerFullName}
        <br />
        to: {searcherFullName}
      </p>
    </div>
  );
}

export default InterviewItem;

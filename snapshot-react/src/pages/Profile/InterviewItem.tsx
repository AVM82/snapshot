import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ModalContext } from '../../components/Layout/Layout';
import { useAppDispatch } from '../../hooks/redux';
import IInterviewPreview from '../../models/profile/IInterviewPreview';
import { getInterviewById } from '../../store/reducers/profile/actions';

function InterviewItem({ id, title, status }: Partial<IInterviewPreview>): JSX.Element {
  const setInterviewOpened = useContext(ModalContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        if (setInterviewOpened && id) {
          setInterviewOpened(true);
          dispatch(getInterviewById(id));
          navigate(`interview-journal/${id}`);
        }
      }}
      id={`${id}`}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
    >
      <button type="button">
        <Link onClick={(event) => event.stopPropagation()} to={`/interview/${id}`}>Сторінка Інтервью</Link>
      </button>
      <p>{title}</p>
      <p>{status}</p>
      <p>with: user228</p>
    </div>
  );
}

export default InterviewItem;

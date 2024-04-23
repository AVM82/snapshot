import { useAppSelector } from '../../hooks/redux';
import Questions from './Questions';

function InterviewModal(): JSX.Element {
  const user = useAppSelector((state) => state.user.userData);

  return (
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <div style={{
        display: 'flex', gap: '20px', height: '50%',
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
      </div>
    </div>
  );
}

export default InterviewModal;

import { useAppSelector } from '../../hooks/redux';
import Questions from './Questions';

function InterviewModal({ onClose }: { onClose: React.Dispatch<React.SetStateAction<boolean>> }): JSX.Element {
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
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <button type="button" onClick={() => onClose(false)}>X</button>
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
        <label htmlFor="feedback">Текстовий фідбек (Підтримується markdown)</label>
        <textarea name="feedback" id="feedback" cols={30} rows={10} />
      </div>
    </div>
  );
}

export default InterviewModal;

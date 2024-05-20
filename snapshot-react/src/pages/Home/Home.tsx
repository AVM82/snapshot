import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux';
import { deleteUser } from '../../store/reducers/user/userSlice';

function Home(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <button type="button" onClick={() => navigate('/sign-in')}>To sign-in</button>
      <button type="button" onClick={() => navigate('/sign-up')}>To sign-up</button>
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          dispatch(deleteUser());
          navigate('/sign-in');
        }}
      >
        Вийти
      </button>
    </div>
  );
}

export default Home;


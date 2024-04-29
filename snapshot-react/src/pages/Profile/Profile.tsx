import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux';
import { getMyInterviews } from '../../store/reducers/profile/actions';
import MyInterviews from './MyInterviews';
import UserRoles from './UserRoles';

function Profile(): JSX.Element {
  const dispatch = useAppDispatch();
  const [activeComponent, setActiveComponent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyInterviews());
  }, [dispatch]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '50px', width: '100%', height: '100%',
    }}
    >
      <div style={{ alignSelf: 'start' }}>
        <button type="button" onClick={() => setActiveComponent('settings')}>Налаштувати профіль</button>
        <button
          type="button"
          onClick={() => {
            setActiveComponent('interview-journal');
            navigate('interview-journal');
          }}
        >
          Журнал інтерв&apos;ю
        </button>
      </div>
      {activeComponent === 'settings' && <UserRoles />}
      {activeComponent === 'interview-journal' && <MyInterviews />}
    </div>
  );
}

export default Profile;

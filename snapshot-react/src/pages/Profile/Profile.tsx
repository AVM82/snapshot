import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux';
import { getLowerSkills, getMyInterviews, getPortrait } from '../../store/reducers/profile/actions';
import Portrait from './components/Portarit/Portrait';
import Statistics from './components/Statistics/Statistics';
import MyInterviews from './MyInterviews';
import UserRoles from './UserRoles';

function Profile(): JSX.Element {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const [activeComponent, setActiveComponent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async (): Promise<void> => {
      await dispatch(getMyInterviews());
      await dispatch(getLowerSkills(Number(userId)));
      await dispatch(getPortrait(Number(userId)));
    };

    fetchProfileData();
  }, [dispatch, userId]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '50px', width: '100%', height: '100%',
    }}
    >
      <div style={{ alignSelf: 'start' }}>
        <button
          type="button"
          onClick={() => {
            setActiveComponent('settings');
            navigate('settings');
          }}
        >
          Налаштувати профіль
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveComponent('interview-journal');
            navigate('interview-journal');
          }}
        >
          Журнал інтерв&apos;ю
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveComponent('statistics');
            navigate('statistics');
          }}
        >
          Статистика
        </button>
      </div>
      {activeComponent === 'settings' && <UserRoles />}
      {activeComponent === 'interview-journal' && <MyInterviews />}
      {activeComponent === 'statistics' && <Statistics />}
      <Portrait />
    </div>
  );
}

export default Profile;

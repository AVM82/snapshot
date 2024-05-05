import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Portrait from '../../components/Portarit/Portrait';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getLowerSkills, getMyInterviews, getPortrait } from '../../store/reducers/profile/actions';
import MyInterviews from './MyInterviews';
import UserRoles from './UserRoles';

function Profile(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.user.userData);
  const [activeComponent, setActiveComponent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async (): Promise<void> => {
      await dispatch(getMyInterviews());
      await dispatch(getLowerSkills());
      await dispatch(getPortrait());
    };

    fetchProfileData();
  }, [dispatch, id]);

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
      <Portrait />
    </div>
  );
}

export default Profile;

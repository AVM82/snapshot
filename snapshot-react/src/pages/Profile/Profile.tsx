import { useState } from 'react';

import MyInterviews from './MyInterviews';
import UserRoles from './UserRoles';

function Profile(): JSX.Element {
  const [activeComponent, setActiveComponent] = useState('');

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '50px', width: '100%', height: '100%',
    }}
    >
      <div style={{ alignSelf: 'start' }}>
        <button type="button" onClick={() => setActiveComponent('settings')}>Налаштувати профіль</button>
        <button type="button" onClick={() => setActiveComponent('journal')}>Журнал інтерв&apos;ю</button>
      </div>
      {activeComponent === 'settings' && <UserRoles />}
      {activeComponent === 'journal' && <MyInterviews />}
    </div>
  );
}

export default Profile;

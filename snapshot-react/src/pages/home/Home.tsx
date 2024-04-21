import './Home.scss';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import snapshotApi from '../../api/request';
import { IUser } from '../../models/user/IUser';

function Home(): JSX.Element {
  const [response, setResponse] = useState<{ [message: string]: string }>({});
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  const getMe = async (): Promise<void> => {
    const res: IUser = await snapshotApi.get('/users/me');

    setUser(res);
  };

  useEffect(() => {
    const sayHello = async (): Promise<void> => {
      const res: { message: string } = (await snapshotApi.get('/users/hello'));
      setResponse(res);
    };

    sayHello();
  }, []);

  return (

    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <button type="button" onClick={() => navigate('/sign-in')}>To sign-in</button>
      <button type="button" onClick={() => navigate('/sign-up')}>To sign-up</button>
      <button
        type="button"
        onClick={async (): Promise<void> => {
          await getMe();
        }}
      >
        Отримати дані юзера
      </button>
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem('token');
          navigate('sign-in');
        }}
      >
        Вийти
      </button>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {response.message
      && response.message.split('').map((item, index) => <p key={String(index)} className={item}>{item}</p>)}
      </div>
      <div>
        {user && <p>{JSON.stringify(user)}</p>}
      </div>
    </div>

  );
}

export default Home;

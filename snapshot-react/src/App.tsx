/* eslint-disable @typescript-eslint/no-shadow */
import './App.scss';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import snapshotApi from './api/request';

export default function App(): JSX.Element {
  const [response, setResponse] = useState<{ [message: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const sayHello = async (): Promise<void> => {
      const res: { message: string } = (await snapshotApi.get('http://localhost:8080/users/hello'));
      setResponse(res);
    };

    sayHello();
  }, []);

  return (

    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <button type="button" onClick={() => navigate('/sign-in')}>To sign-in</button>
      <button type="button" onClick={() => navigate('/sign-up')}>To sign-up</button>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {response.message
      && response.message.split('').map((item, index) => <p key={String(index)} className={item}>{item}</p>)}
      </div>
    </div>

  );
}

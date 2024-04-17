/* eslint-disable @typescript-eslint/no-shadow */
import './App.scss';

import { useEffect, useState } from 'react';

import snapshotApi from './api/request';

export default function App(): JSX.Element {
  const [response, setResponse] = useState<{ [message: string]: string }>({});

  useEffect(() => {
    const sayHello = async (): Promise<void> => {
      const res: { message: string } = (await snapshotApi.get('http://localhost:8080/users/hello'));
      setResponse(res);
    };

    sayHello();
  }, []);

  return (

    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {response.message
      && response.message.split('').map((item, index) => <p key={String(index)} className={item}>{item}</p>)}
    </div>

  );
}

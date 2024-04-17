/* eslint-disable @typescript-eslint/no-shadow */
import './App.scss';

import { useEffect, useState } from 'react';

import reactLogo from './assets/react.svg';
import snapshotApi from './api/request';

export default function App(): JSX.Element {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sayHello = async () => {
      const response = await snapshotApi.get('http://localhost:5173/users/hello');
      console.log(response);
    }

    sayHello();
  })

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} type="button">
          count is
          {' '}
          {count}
        </button>
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

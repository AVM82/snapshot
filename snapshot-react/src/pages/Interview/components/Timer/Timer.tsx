import React, { useEffect, useState } from 'react';

import styles from './Timer.module.scss';

interface CustomProps {}

type CombinedProps = CustomProps & React.HTMLProps<HTMLDivElement>;

function Timer(rest :CombinedProps):React.JSX.Element {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => setTime(time + 1), 10);

    return () => clearInterval(intervalId);
  }, [time]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  const clock = `${hours ? `${hours}:` : ''} ${minutes >= 10 ? minutes : `0${minutes}`}:${seconds >= 10 ? seconds : `0${seconds}`}`;

  return (
    <div {...rest}>
      <div className={styles.stopwatch}>
        Час співбесіди:
        {' '}
        <span>
          {clock}
        </span>
      </div>
    </div>
  );
}
export default Timer;

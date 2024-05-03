import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../../../../hooks/redux';
import styles from './Timer.module.scss';

type CombinedProps = React.HTMLProps<HTMLDivElement>;

function Timer(rest: CombinedProps): React.JSX.Element {
  const [time, setTime] = useState(0);
  const { status: interviewStatus, startDateTime } = useAppSelector((state) => state.interview);
  useEffect(() => {
    const intervalId = setInterval(() => setTime(time + 1), 10);

    return () => clearInterval(intervalId);
  }, [time]);
  // console.log(`status:"${interviewStatus} time:"${startDateTime}"`);
  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const clock = interviewStatus === 'ACTIVE'
    ? `${hours ? `${hours}:` : ''} ${minutes >= 10 ? minutes : `0${minutes}`}:${seconds >= 10 ? seconds : `0${seconds}`}`
    : '00:00';

  return (
    <div {...rest}>
      <div className={styles.stopwatch}>
        Час співбесіди:
        {' '}
        <span>{clock}</span>
      </div>
    </div>
  );
}
export default Timer;

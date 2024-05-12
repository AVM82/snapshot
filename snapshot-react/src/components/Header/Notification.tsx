import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getMyInterviews } from '../../store/reducers/profile/actions';
import getInterval from '../../utils/notification/getInterval';
import getTimeToInterview from '../../utils/notification/getTimeToInterview';

function Notification():React.JSX.Element {
  const { interviews } = useAppSelector((state) => state.profile);
  const [remainingTimeInMillis, setRemainingTimeInMillis] = useState(0);
  const dispatch = useAppDispatch();
  const weekInMillis = 604800000;
  useEffect(() => {
    (async (): Promise<void> => {
      await dispatch(getMyInterviews());
      setRemainingTimeInMillis(getTimeToInterview(interviews));
    })();
  }, [dispatch]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const updateInterval = (): void => {
      const time = getTimeToInterview(interviews);
      setRemainingTimeInMillis(time);
    };
    updateInterval();

    const intervalInMillis = getInterval(remainingTimeInMillis);

    const intervalID = setInterval(() => {
      updateInterval();
    }, intervalInMillis);

    if (remainingTimeInMillis < 0) {
      clearInterval(intervalID);
    }

    return () => clearInterval(intervalID);
  }, [remainingTimeInMillis, interviews]);

  function formatTime():string {
    const sec = Math.round(remainingTimeInMillis / 1000);
    const min = Math.round(sec / 60);
    const hours = Math.round(min / 60);
    const days = Math.round(hours / 24);

    if (sec < 60) {
      return ` ${sec} секунд`;
    }

    if (min < 60) {
      return ` ${min} хв.`;
    }

    if (hours < 24) {
      return ` ${hours} год.`;
    }

    return ` ${days} дн.`;
  }

  return (
    <div style={{ fontSize: '20px' }}>
      {remainingTimeInMillis > 0 && remainingTimeInMillis < weekInMillis
        ? (
          <div>
            Залишилось
            {formatTime()}
          </div>
          // eslint-disable-next-line react/no-unescaped-entities
        ) : (<div>На цьому тижні у вас ще немає інтерв'ю</div>)}
    </div>
  );
}
export default Notification;

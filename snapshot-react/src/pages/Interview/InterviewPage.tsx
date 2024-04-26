import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllSkills, getUserByEmail } from '../../store/reducers/interwiew/actions';
import getUser from '../../store/reducers/user/actions';
import styles from './InterviewPage.module.scss';

export default function InterviewPage():React.JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const { allLowLvlSkills, currentUser, interviewee } = useAppSelector((state) => state.interview);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllSkills());
    dispatch(getUser());
    dispatch(getUserByEmail('username'));
  }, [dispatch]);
  const toggleExpand = ():void => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.status}>
        <p>Status</p>
      </div>
      <div className={styles.blockSearcer}>
        <form>
          <label htmlFor="userEmail">Введіть email респондента:</label>
          <input
            // type="email"
            type="text"
            id="userEmail"
          />
          <button type="submit">Пошук</button>
        </form>

      </div>
      <div className={styles.blockDisplayUser}>
        {currentUser.avatarImgUrl}
        <h2>
          {interviewee.firstname}
          {' '}
          {interviewee.lastname}
        </h2>
      </div>
      <div>
        {allLowLvlSkills.length > 5 && (
          <button type="button" onClick={toggleExpand} className={styles.toggleButton}>
            {isExpanded
              ? <div className={styles.arrowUp}>{'>'}</div>
              : <div className={styles.arrowDown}>{'>'}</div>}
          </button>
        )}
        <div className={styles.blockSkills}>
          {allLowLvlSkills.slice(0, 7).map((skill) => (
            <div key={skill.id}>{skill.name}</div>
          ))}
          {isExpanded && allLowLvlSkills.slice(7).map((skill) => (
            <div key={skill.id}>{skill.name}</div>
          ))}

        </div>
      </div>
      <button type="button" />
    </div>
  );
}

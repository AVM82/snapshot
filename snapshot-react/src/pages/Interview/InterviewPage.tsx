import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { INewInterview } from '../../models/profile/INewInterview';
import {
  addInterview,
  addQuestion,
  getAllSkills,
  getUserByEmail,
} from '../../store/reducers/interwiew/actions';
import { setTitle } from '../../store/reducers/interwiew/interviewSlice';
import getUser from '../../store/reducers/user/actions';
import Timer from './components/Timer/Timer';
import styles from './InterviewPage.module.scss';

export default function InterviewPage(): React.JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showQuestionTextField, setShowQuestionTextField] = useState(false);
  const [question, setQuestion] = useState('');
  const [currentSkillId, setCurrentSkillId] = useState(0);
  const [titleText, setTitleText] = useState('');
  const {
    searcher,
    interviewer,
    sharedSkills,
    status: interviewStatus,
    questions,
    title,
  } = useAppSelector((state) => state.interview);
  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setQuestion(e.target.value);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllSkills());
    dispatch(getUser());
  }, [dispatch]);

  const addNewInterview = (): void => {
    if (title && searcher.id) {
      const addInterviewData: INewInterview = {
        status: 'PLANNED',
        searcherId: searcher.id,
        title,
      };
      dispatch(addInterview(addInterviewData));
    }
  };
  const getSearcher = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(getUserByEmail(event.currentTarget.userEmail.value));
  };
  const handleSetInterviewTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setTitleText(event.target.value);
  };
  const submitTitle = (): void => {
    dispatch(setTitle(titleText));
  };
  const handleAddNewQuestion = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const questionData = {
      interviewId: 1,
      interviewerId: interviewer.id,
      skillId: currentSkillId,
      question,
    };
    dispatch(addQuestion(questionData));
    setShowQuestionTextField(false);
  };
  const handleSkillOnClick = (skillId: number): void => {
    setCurrentSkillId(skillId);
    setShowQuestionTextField(!showQuestionTextField);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <Timer />
        <div className={styles.status}>
          <div />
          <p>{interviewStatus}</p>
        </div>
        <div>
          {title ? (
            <h3>{title}</h3>
          ) : (
            <div>
              <label htmlFor="title" />
              <input
                type="text"
                id="titlt"
                value={titleText}
                onChange={handleSetInterviewTitle}
              />
              <button type="submit" onClick={submitTitle}>
                +
              </button>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={addNewInterview}
          className={styles.headerButton}
        >
          {interviewStatus}
        </button>
      </div>
      <div className={styles.blockSearcer}>
        {searcher.firstname ? (
          <div className={styles.blockDisplayUser}>
            {searcher.avatarImgUrl}
            <h2>
              {searcher.firstname} {searcher.lastname}
            </h2>
          </div>
        ) : (
          <form onSubmit={getSearcher}>
            <label htmlFor="userEmail">Введіть email шукача:</label>
            <input type="text" id="userEmail" />
            <button type="submit">Пошук</button>
          </form>
        )}
      </div>

      <div>
        {sharedSkills.length > 5 && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className={styles.toggleButton}
          >
            {isExpanded ? (
              <div className={styles.arrowUp}>{'>'}</div>
            ) : (
              <div className={styles.arrowDown}>{'>'}</div>
            )}
          </button>
        )}
        <div className={styles.blockSkills}>
          {sharedSkills.slice(0, 7).map((skill) => (
            <div
              role="button"
              tabIndex={0}
              key={skill.id}
              className={skill.shared ? `${styles.active}` : ''}
              onClick={
                skill.shared
                  ? (): void => handleSkillOnClick(skill.id)
                  : (): null => null
              }
            >
              {skill.name}
            </div>
          ))}
          {isExpanded &&
            sharedSkills.slice(7).map((skill) => (
              <div
                role="button"
                tabIndex={0}
                key={skill.id}
                className={skill.shared ? `${styles.active}` : ''}
                onClick={
                  skill.shared
                    ? (): void => handleSkillOnClick(skill.id)
                    : (): null => null
                }
              >
                {skill.name}
              </div>
            ))}
          {questions &&
            questions.map((q) => (
              <div key={q.id}>
                <div>{q.skillName}</div>
                <p>{q.question}</p>
                <div>{q.grade}</div>
              </div>
            ))}
        </div>
      </div>
      {showQuestionTextField && (
        <div>
          <form
            name="addSkillQuestion"
            className={styles.skillTextArea}
            onSubmit={handleAddNewQuestion}
          >
            <textarea
              id="addSkillQuestion"
              name="questionName"
              cols={100}
              rows={10}
              value={question}
              onChange={handleQuestionChange}
            />
            <button type="submit">Додати</button>
          </form>
        </div>
      )}
    </div>
  );
}

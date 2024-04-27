import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  addQuestion, getAllSkills, getInterviewData, getUserByEmail,
} from '../../store/reducers/interwiew/actions';
import getUser from '../../store/reducers/user/actions';
import Timer from './components/Timer/Timer';
import styles from './InterviewPage.module.scss';

export default function InterviewPage(): React.JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showQuestionTextField, setShowQuestionTextField] = useState(false);
  const [question, setQuestion] = useState('');
  const [currentSkillId, setCurrentSkillId] = useState(0);
  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    // Обновляем состояние question при изменении текстового поля
    setQuestion(e.target.value);
  };
  const {
    searcher, interviewer, sharedSkills, status: InterviewStatus, questions,
  } = useAppSelector((state) => state.interview);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getInterviewData());

    dispatch(getAllSkills());

    if (!interviewer.firstname) {
      dispatch(getUser());
    }
  }, [interviewer.firstname]);

  const getSearcher = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(getUserByEmail(event.currentTarget.userEmail.value));
  };

  const toggleExpand = ():void => {
    setIsExpanded(!isExpanded);
  };
  const handleAddNewQuestion = (e:React.FormEvent<HTMLFormElement>):void => {
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
  const handleSkillOnClick = (skillId:number) => {
    setCurrentSkillId(skillId);
    setShowQuestionTextField(!showQuestionTextField);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <Timer />
        <div className={styles.status}>
          <div />
          <p>{InterviewStatus}</p>
        </div>
        <button type="button" className={styles.headerButton}>{InterviewStatus}</button>
      </div>
      <div className={styles.blockSearcer}>
        {searcher.firstname ? (
          <div className={styles.blockDisplayUser}>
            {searcher.avatarImgUrl}
            <h2>
              {searcher.firstname}
              {' '}
              {searcher.lastname}
            </h2>
          </div>
        ) : (
          <form onSubmit={getSearcher}>
            <label htmlFor="userEmail">Введіть email шукача:</label>
            <input
              type="text"
              id="userEmail"
            />
            <button type="submit">Пошук</button>
          </form>
        )}
      </div>

      <div>
        {sharedSkills.length > 5 && (
          <button type="button" onClick={toggleExpand} className={styles.toggleButton}>
            {isExpanded
              ? <div className={styles.arrowUp}>{'>'}</div>
              : <div className={styles.arrowDown}>{'>'}</div>}
          </button>
        )}
        <div className={styles.blockSkills}>
          {sharedSkills.slice(0, 7).map((skill) => (
            <div
              key={skill.id}
              className={skill.shared ? `${styles.active}` : ''}
              onClick={skill.shared ? ():void => handleSkillOnClick(skill.id) : ():null => null}
            >
              {skill.name}
            </div>
          ))}
          {isExpanded && sharedSkills.slice(7).map((skill) => (
            <div
              key={skill.id}
              className={skill.shared ? `${styles.active}` : ''}
              onClick={skill.shared ? () => handleSkillOnClick(skill.id) : ():null => null}
            >
              {skill.name}
            </div>
          ))}
          {questions && questions.map((q) => (
            <div key={q.id}>
              <div>{q.skillName}</div>
              <p>{q.question}</p>
              <div>{q.score}</div>
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

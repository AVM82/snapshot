import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Skill from '../../components/Skill/Skill';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { INewInterview } from '../../models/profile/INewInterview';
import {
  addInterview,
  addQuestion, getAllSkills, getUserByEmail,
  updateInterviewStatus,
} from '../../store/reducers/interwiew/actions';
import { resetInterviewState, setTitle } from '../../store/reducers/interwiew/interviewSlice';
import { getInterviewById } from '../../store/reducers/profile/actions';
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
    searcher, interviewer, id: interviewId, sharedSkills, status: interviewStatus, isLoading, questions, title,
  } = useAppSelector((state) => state.interview);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setQuestion(e.target.value);
  };

  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetInterviewState());
    dispatch(getAllSkills());

    if (!id) {
      dispatch(getUser());
    } else {
      dispatch(getInterviewById(+id));
    }
  }, [dispatch, id]);

  const buttonText = ():string => {
    if (interviewStatus === 'PLANNED') { return 'Почати'; }

    if (interviewStatus === 'ACTIVE') return 'Закінчити';

    return 'Затвердити дані';
  };

  const interviewLogic = () :void => {
    if (interviewStatus === '') {
      const addInterviewData:INewInterview = {
        status: 'PLANNED',
        searcherId: searcher.id,
        title,
      };
      dispatch(addInterview(addInterviewData));
    }

    if (interviewStatus === 'PLANNED') {
      dispatch(updateInterviewStatus({ id: interviewId, status: 'ACTIVE' }));
    }

    if (interviewStatus === 'ACTIVE') {
      dispatch(updateInterviewStatus({ id: interviewId, status: 'FINISHED' }));
    }
  };
  const getSearcher = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(getUserByEmail(event.currentTarget.userEmail.value));
  };
  const handleSetInterviewTitle = (event: React.ChangeEvent<HTMLInputElement>):void => {
    setTitleText(event.target.value);
  };
  const submitTitle = ():void => {
    dispatch(setTitle(titleText));
  };
  const handleAddNewQuestion = (e:React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();

    if (id) {
      const questionData = {
        interviewId: +id,
        interviewerId: interviewer.id,
        skillId: currentSkillId,
        question,
      };
      dispatch(addQuestion(questionData));
    }
    setShowQuestionTextField(false);
  };
  const handleSkillOnClick = (skillId:number):void => {
    setCurrentSkillId(skillId);
    setShowQuestionTextField(!showQuestionTextField);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <Timer />
        <div className={styles.status}>
          <div />
          <p>{interviewStatus}</p>
        </div>
        <div>
          {title ? (<h3>{title}</h3>)
            : (
              <div>
                <label htmlFor="title" />
                <input type="text" id="titlt" value={titleText} onChange={handleSetInterviewTitle} />
                <button type="submit" onClick={submitTitle}>+</button>
              </div>
            )}
        </div>
        <button
          type="button"
          onClick={interviewLogic}
          className={styles.headerButton}
          style={{
            display: (interviewStatus === 'PLANNED' || interviewStatus === 'ACTIVE' || interviewStatus === '')
              ? 'block' : 'none',
          }}
        >
          {buttonText()}
        </button>
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
          <button type="button" onClick={() => setIsExpanded(!isExpanded)} className={styles.toggleButton}>
            {isExpanded
              ? <div className={styles.arrowUp}>{'>'}</div>
              : <div className={styles.arrowDown}>{'>'}</div>}
          </button>
        )}
        <div className={styles.blockSkills}>
          {sharedSkills.slice(0, 7).map((skill) => (
            <Skill
              key={skill.id}
              className={skill.shared ? `${styles.active}` : ''}
              onClick={skill.shared ? ():void => handleSkillOnClick(skill.id) : ():null => null}
              title={skill.name}
            />

          ))}
          {isExpanded && sharedSkills.slice(7).map((skill) => (
            <Skill
              key={skill.id}
              className={skill.shared ? `${styles.active}` : ''}
              onClick={skill.shared ? ():void => handleSkillOnClick(skill.id) : ():null => null}
              title={skill.name}
            />
          ))}
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
                  cols={50}
                  rows={5}
                  value={question}
                  onChange={handleQuestionChange}
                />
                <button type="submit">Додати</button>
              </form>
            </div>
          )}
        </div>
        <div className={styles.questionList}>
          {questions && questions.map((q) => (
            <div key={q.id}>
              <p>{q.skillName}</p>
              <p>{q.question}</p>
              <p>{q.grade}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

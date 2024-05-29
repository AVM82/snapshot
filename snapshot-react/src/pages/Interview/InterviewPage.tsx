import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SockJS from 'sockjs-client';
import { Client, Frame, over } from 'stompjs';

import api from '../../common/api';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { INewInterview } from '../../models/profile/INewInterview';
import {
  getAllSkills, getInterviewId, getUserByEmail,
  updateInterviewStatus,
} from '../../store/reducers/interwiew/actions';
import { redefineQuestions, redefineStatus, setTitle } from '../../store/reducers/interwiew/interviewSlice';
import { getInterviewById } from '../../store/reducers/profile/actions';
import getUser from '../../store/reducers/user/actions';
import Feedback from '../Profile/components/Feedback/Feedback';
import Questions from '../Profile/components/Questions/Questions';
import Skill from '../Profile/components/Skills/Skill';
import Question from './components/Question/Question';
import Timer from './components/Timer/Timer';
import styles from './InterviewPage.module.scss';
import DropDownSkillBlock from "../Profile/components/SkillBox/DropDown/DropDownSkillBlock.tsx";

type Headers = {
  login: string,
  passcode: string,
  host?: string | undefined
};

const headers: Headers = {
  login: '',
  passcode: '',
};

export default function InterviewPage(): React.JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showQuestionTextField, setShowQuestionTextField] = useState(false);
  const [currentSkillId, setCurrentSkillId] = useState(0);
  const [titleText, setTitleText] = useState('');
  const stompRef = useRef<Client | null>(null);
  const navigate = useNavigate();
  const {
    searcher, id: interviewId, sharedSkills, status: interviewStatus, isLoading, title,
    currentProfileRole,
  } = useAppSelector((state) => state.interview);
  const interview = useAppSelector((state) => state.interview);

  const { id } = useParams();
  const dispatch = useAppDispatch();

  // let stomp: Client;

  interface IMessage {
    body?: string
  }

  // const onMessageReceived = (message: IMessage): void => {
  //   if (!message.body) { return; }

  //   const receivedMessage = JSON.parse(message.body);

  //   if (!receivedMessage.status) {
  //     dispatch(redefineQuestions(receivedMessage || []));
  //   } else {
  //     dispatch(redefineStatus(receivedMessage.status));
  //   }
  // };
  // const onError = (error: string | Frame): void => {
  //   toast.error(error.toString());
  // };

  // const onConnect = (): void => {
  //   stompRef.current.subscribe(`/interview/${interviewId}/questions`, onMessageReceived);
  // };

  // const connect = (): void => {
  //   const socket = new SockJS(`${api.baseURL.slice(0, -5)}/socket`);
  //   stomp = over(socket);
  //   stomp.connect(headers, onConnect, onError);
  // };

  const onMessageReceived = useCallback((message: IMessage): void => {
    if (!message.body) { return; }

    const receivedMessage = JSON.parse(message.body);

    if (!receivedMessage.status) {
      dispatch(redefineQuestions(receivedMessage || []));
    } else {
      dispatch(redefineStatus(receivedMessage.status));
    }
  }, [dispatch]);

  const onError = useCallback((error: string | Frame): void => {
    toast.error(error.toString());
  }, []);

  const onConnect = useCallback((): void => {
    if (stompRef.current) {
      stompRef.current.subscribe(`/interview/${interviewId}/questions`, onMessageReceived);
    }
  }, [interviewId, onMessageReceived]);

  const connect = useCallback((): void => {
    const socket = new SockJS(`${api.baseURL.slice(0, -5)}/socket`);
    stompRef.current = over(socket);
    stompRef.current.connect(headers, onConnect, onError);
  }, [onConnect, onError]);

  useEffect(() => {
    const fetchData = async ():Promise<void> => {
      if (!currentProfileRole) {
        dispatch(getUser());
      }

      if (currentProfileRole === 'INTERVIEWER') {
        await dispatch(getAllSkills());
      }

      if (id) {
        dispatch(getInterviewById(+id));
      }
    };

    fetchData();
  }, [dispatch, id, currentProfileRole]);

  useEffect(() => {
    if (interviewId && !id) {
      navigate(`/interview/${interviewId}`);
    }

    if (interviewStatus === 'ACTIVE') connect();
  }, [connect, id, interviewId, interviewStatus, navigate]);

  const buttonText = ():string => {
    if (interviewStatus === 'PLANNED') { return 'Почати'; }

    if (interviewStatus === 'ACTIVE') return 'Закінчити';

    return 'Затвердити дані';
  };

  const interviewLogic = async ():Promise<void> => {
    if (title && searcher.id) {
      if (!interviewId) {
        const addInterviewData:INewInterview = {
          status: 'PLANNED',
          searcherId: searcher.id,
          title,
        };
        dispatch(getInterviewId(addInterviewData));
      }

      if (interviewStatus === 'PLANNED') {
        dispatch(updateInterviewStatus({ id: interviewId, status: 'ACTIVE' }));
      }

      if (interviewStatus === 'ACTIVE') {
        dispatch(updateInterviewStatus({ id: interviewId, status: 'FINISHED' }));
      }
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

  const handleSkillOnClick = (skillId:number):void => {
    setCurrentSkillId(skillId);
    setShowQuestionTextField(true);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        {interviewStatus !== 'COMPLETED' && <Timer />}
        <div className={styles.status}>
          <div />
          <p>{interviewStatus}</p>
        </div>
        <div>
          {title ? (<h3>{title}</h3>)
            : (
              <div>
                <label htmlFor="title" />
                <input type="text" id="title" value={titleText} onChange={handleSetInterviewTitle} />
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
        <DropDownSkillBlock skills={sharedSkills} />
        {/*{sharedSkills.length > 5 && (*/}
        {/*  <button type="button" onClick={() => setIsExpanded(!isExpanded)} className={styles.toggleButton}>*/}
        {/*    {isExpanded*/}
        {/*      ? <div className={styles.arrowUp}>{'>'}</div>*/}
        {/*      : <div className={styles.arrowDown}>{'>'}</div>}*/}
        {/*  </button>*/}
        {/*)}*/}
        {/*<div className={styles.blockSkills}>*/}
        {/*  {sharedSkills.slice(0, 7).map((skill) => (*/}
        {/*    <Skill*/}
        {/*      key={skill.id}*/}
        {/*      className={skill.shared ? `${styles.active}` : ''}*/}
        {/*      onClick={skill.shared ? ():void => handleSkillOnClick(skill.id) : ():null => null}*/}
        {/*      title={skill.name}*/}
        {/*    />*/}

        {/*  ))}*/}
        {/*  {isExpanded && sharedSkills.slice(7).map((skill) => (*/}
        {/*    <Skill*/}
        {/*      key={skill.id}*/}
        {/*      className={skill.shared ? `${styles.active}` : ''}*/}
        {/*      onClick={skill.shared ? ():void => handleSkillOnClick(skill.id) : ():null => null}*/}
        {/*      title={skill.name}*/}
        {/*    />*/}
        {/*  ))}*/}
        {/*  {showQuestionTextField*/}
        {/*    && <Question*/}
        {/*      skillId={currentSkillId}*/}
        {/*      interviewQuestions={interview.questions.map((q) => q.question)}*/}
        {/*      onSubmit={() => setShowQuestionTextField(false)} />}*/}
        {/*</div>*/}
        {/*{interviewStatus === 'FINISHED' ? <Feedback /> : (*/}
        {/*  <div className={styles.questionList}>*/}
        {/*    <Questions {...interview} />*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </div>
  );
}

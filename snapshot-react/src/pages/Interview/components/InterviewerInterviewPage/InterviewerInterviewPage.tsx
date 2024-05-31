import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { getAllSkills } from '../../../../store/reducers/interwiew/actions';
import { connectToWebSocket, disconnectFromWebSocket } from '../../../../store/reducers/interwiew/interviewSlice';
import { getInterviewById } from '../../../../store/reducers/profile/actions';
import getUser from '../../../../store/reducers/user/actions';
import styles from '../../InterviewPage.module.scss';
import ChangeStatusButton from '../ChangeStatusButton/ChangeStatusButton';
import InterviewDate from '../InterviewDate/InterviewDate';
import InterviewerInfo from '../InterviewerInfo/InterviewerInfo';
import InterviewTitle from '../InterviewTitle/InterviewTitle';
import AddQuestion from '../Questions/AddQuestion';
import GradeQuestion from '../Questions/GradeQuestion';
import QuestionInfo from '../Questions/QuestionInfo';
import QuestionsNumberList from '../Questions/QuestionsNumberList';
import SearcherInfo from '../SearcherInfo/SearcherInfo';
import InterviewSkills from '../Skills/InterviewSkills';
import Status from '../Status/Status';
import Timer from '../Timer/Timer';

function InterviewerInterviewPage():React.JSX.Element{
  const [selectedQuestionId, setSelectedQuestionId] = useState(0);
  const [selectedSkillId, setSelectedSkillId] = useState(0);
  const { id: interviewId,  status: interviewStatus,currentProfileRole } = useAppSelector((state) => state.interview);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const { id='0' } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async ():Promise<void> => {
      if (!currentProfileRole) {
        await dispatch(getUser());
      }

      await dispatch(getAllSkills());
      await dispatch(getInterviewById(+id));
    };
    (async ():Promise<void>=>{
      await  fetchData();
    })();
  }, [dispatch, id, currentProfileRole]);

  useEffect(() => {
    if (interviewStatus === 'ACTIVE') dispatch(connectToWebSocket({ interviewId }));

    if (interviewStatus === 'FINISHED') dispatch(disconnectFromWebSocket());
  }, [dispatch, interviewId, interviewStatus]);

  const handleSetSelectedQuestion = (questionId:number):void=>{
    setSelectedQuestionId(questionId);
  };
  const handleSkillOnClick = (skillId:number):void => {
    setSelectedSkillId(skillId);
    setShowAddQuestion(true);
  };

  return (
    <div className={styles.pageContainer}>
      <section className={styles.header}>
        <div className={styles.flexRowBlock}>
          <Timer />
          <Status />
        </div>
        <ChangeStatusButton />
      </section>

      <section className={styles.interviewInfoContainer}>
        <InterviewTitle />
        <h3 className={styles.flexRowBlock}>Дата: <InterviewDate /></h3>
      </section>
      <section className={styles.interviewsParticipantsContainer}>

        <InterviewerInfo />
        <div>
          <SearcherInfo />
          <InterviewSkills onClick={handleSkillOnClick}/>
        </div>
      </section>

      {/* {interviewStatus === 'FINISHED' ? <Feedback/> : ( */}
      {/*  */}
      <div className={styles.questionsContainer}>
        <QuestionInfo questionId={selectedQuestionId}/>
        <GradeQuestion questionId={selectedQuestionId}/>
      </div>
      <div>
        <QuestionsNumberList onClick={handleSetSelectedQuestion}/>
      </div>
      {showAddQuestion&&<AddQuestion skillId={selectedSkillId} onClose={()=>setShowAddQuestion(false)}/>}
    </div>
  );
}

export default InterviewerInterviewPage;

import React from 'react';

import {  useAppSelector } from '../../../../hooks/redux';
import styles from './Question.module.scss';

interface IProps{
  questionId: number
}

function QuestionInfo({ questionId }: IProps): React.JSX.Element {
  const { questions } = useAppSelector((state) => state.interview);
  const  question = questions.find((question_)=>question_.id===questionId);
  const indexOfQuestion = questions.findIndex((question_) => question_.id === questionId)+1;
  const numberOfQuestions = questions.length;
  const defaultRender=():React.JSX.Element=>(
    <section className={styles.skillInfoContainer}>
      <div className={styles.skillInfoHeader}>
        <div className={styles.skillName}>
          {question? question.skillName: '# skill'}
        </div>
      </div>
    </section>
  );

  if (!question) return defaultRender();

  return (
    <section className={styles.skillInfoContainer}>
      <div className={styles.skillInfoHeader}>
        <div className={styles.skillName}>
          {question.skillName}
        </div>
        <div className={styles.questionCount}>
          {indexOfQuestion}/{numberOfQuestions}
        </div>
      </div>
      <div className={styles.textContainer}>
        <p  className={styles.text}>{question.question}</p>
        <p className={styles.grade}>Оцінка: {question.grade? `${question.grade}%`:0}</p>
      </div>
    </section>
  );
}
export default  QuestionInfo;

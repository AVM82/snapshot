import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { addQuestion, getSkillQuestions } from '../../../../store/reducers/interwiew/actions';
import styles from './Question.module.scss';

interface IProps {
  skillId: number
  onSubmit : () => void
}
export default function Question({ skillId, onSubmit }:IProps):React.JSX.Element {
  const [questionText, setQuestionText] = useState('');
  const { id, interviewer, currentSkillQuestions } = useAppSelector((state) => state.interview);
  const dispatch = useAppDispatch();
  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setQuestionText(e.target.value);
  };
  useEffect(() => {
    dispatch(getSkillQuestions(skillId));
  }, [dispatch, skillId]);
  const handleAddNewQuestion = (e:React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();

    if (id) {
      const questionData = {
        interviewId: id,
        interviewerId: interviewer.id,
        skillId,
        question: questionText,
      };
      dispatch(addQuestion(questionData));
    }
    onSubmit();
  };
  const handleProposedQuestion = (text:string):void => {
    setQuestionText(text);
  };

  return (
    <div className={styles.container}>
      <div className={styles.questionsList}>
        {currentSkillQuestions.map((question) => (
          <div
            role="button"
            tabIndex={0}
            key={question.id}
            onClick={
              () => handleProposedQuestion(question.question)
            }
          >
            {question.question}
          </div>
        ))}
      </div>
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
          value={questionText}
          onChange={handleQuestionChange}
        />
        <button type="submit">Додати</button>
      </form>
    </div>
  );
}

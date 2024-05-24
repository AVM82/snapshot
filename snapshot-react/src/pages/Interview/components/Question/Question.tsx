import React, { useEffect, useState } from 'react';

import snapshotApi from '../../../../api/request';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import IQuestion from '../../../../models/profile/IQuestion';
import { addQuestion } from '../../../../store/reducers/interwiew/actions';
import styles from './Question.module.scss';

interface IProps {
  skillId: number
  interviewQuestions: string[]
  onSubmit: () => void
}

export default function Question({ skillId, interviewQuestions, onSubmit }: IProps): React.JSX.Element {
  const [questionText, setQuestionText] = useState('');
  const { id, interviewer } = useAppSelector((state) => state.interview);
  const [geminiQuestions, setGeminiQuestions] = useState<string[]>([]);
  const [interviewerQuestions, setInterviewerQuestions] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setQuestionText(e.target.value);
  };

  useEffect(() => {
    const getQuestions = async (): Promise<void> => {
      setInterviewerQuestions([]);
      setGeminiQuestions([]);

      const iQuestions: IQuestion[] = await snapshotApi.get(`/interviews/questions/skill/${skillId}`);

      if (iQuestions) {
        setInterviewerQuestions(iQuestions
          .map((q) => q.question)
          .filter((q) => interviewQuestions.indexOf(q) === -1)
          .slice(0, 5)
        );
      }

      const gQuestions: string[] = await snapshotApi.get(`/interviews/questions/gemini/skill/${skillId}`);

      if (gQuestions) {
        setGeminiQuestions(gQuestions
          .filter((q) => interviewQuestions.indexOf(q) === -1)
          .filter((q) => interviewerQuestions.indexOf(q) === -1)
          .slice(0, 5)
        );
      }
    };

    getQuestions();
  }, [skillId]);

  const handleAddNewQuestion = (e: React.FormEvent<HTMLFormElement>): void => {
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
  const handleProposedQuestion = (text: string): void => {
    setQuestionText(text);
  };

  return (
    <div className={styles.container}>
      <div className={styles.questionsList}>
        {geminiQuestions.length === 0 && <p>Завантаження даних...</p>}
        {geminiQuestions.map((question) => (
          <div
            role="button"
            tabIndex={0}
            key={question}
            onClick={
              () => handleProposedQuestion(question)
            }
          >
            {question}
          </div>
        ))}
      </div>
      <div className={styles.questionsList}>
        {interviewerQuestions.map((question) => (
          <div
            role="button"
            tabIndex={0}
            key={question}
            onClick={
              () => handleProposedQuestion(question)
            }
          >
            {question}
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

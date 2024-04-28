import React, { FormEvent, useState } from 'react';

import { useAppDispatch } from '../../hooks/redux';
import IQuestion from '../../models/feedback/IQuestion';
import { changeGrade } from '../../store/reducers/feedback/actions';

function Question({
  question, skillName, grade, id,
}: IQuestion): JSX.Element {
  const [newGrade, setNewGrade] = useState(grade);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(changeGrade({ id, grade: newGrade, interviewId: 1 }));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
      key={id}
    >
      <p style={{ color: 'black' }}>{ skillName }</p>
      <p style={{ color: 'black' }}>{ question }</p>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewGrade(e.target.value)}
            defaultValue={grade}
            placeholder="Вкажіть нову оцінку у %"
          />
        </form>
        <div style={{
          width: newGrade,
          backgroundColor: 'green',
          height: '4px',
          borderRadius: '4px',
          marginTop: '10px',
        }}
        />
      </div>
    </div>
  );
}

export default Question;

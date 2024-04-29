import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux';
import IQuestion from '../../models/feedback/IQuestion';
import { changeGrade } from '../../store/reducers/profile/actions';

function Question({
  question, skillName, grade, id,
}: IQuestion): JSX.Element {
  const [newGrade, setNewGrade] = useState(grade);
  const { interviewId } = useParams();
  const dispatch = useAppDispatch();
  const handleChangeGrade = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      dispatch(changeGrade({ id: +e.currentTarget.id, interviewId: Number(interviewId), grade: newGrade }));
    }
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
        <input
          type="text"
          id={`${id}`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewGrade(e.target.value)}
          value={newGrade}
          onKeyDown={handleChangeGrade}
          placeholder="Вкажіть нову оцінку у %"
        />
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

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../../../hooks/redux';
import IQuestion from '../../../../models/profile/IQuestion';
import { changeGrade } from '../../../../store/reducers/profile/actions';

function Question({
  question, skillName, grade, id, searcherId, createdAt,
}: IQuestion): JSX.Element {
  const [newGrade, setNewGrade] = useState(grade === 'null%' ? '' : grade);
  const { userId } = useParams();
  const { id: interviewId } = useParams();
  const dispatch = useAppDispatch();
  const handleChangeGrade = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      dispatch(changeGrade({ id, interviewId: Number(interviewId), grade: newGrade.endsWith('%') ? newGrade : `${newGrade}%` }));
    }
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '15% 50% 20% 15%',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
      key={id}
    >
      <p style={{ color: 'black' }}>{ skillName }</p>
      <p style={{ color: 'black' }}>{ question }</p>
      <p style={{ color: 'black' }}>{ createdAt }</p>
      {searcherId !== Number(userId) && (
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
      )}
    </div>
  );
}

export default Question;

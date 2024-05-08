import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import IQuestion from '../../../../models/profile/IQuestion';
import { changeGrade } from '../../../../store/reducers/profile/actions';

function Question({
  question, skillName, grade, id, searcherId,
}: IQuestion): JSX.Element {
  const [newGrade, setNewGrade] = useState(grade);
  const [changeGradeClicked, setChangeGradeClicked] = useState(false);
  const userId = useAppSelector((state) => state.user.userData.id);
  const { interviewId } = useParams();
  const dispatch = useAppDispatch();
  const handleChangeGrade = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      dispatch(changeGrade({ id, interviewId: Number(interviewId), grade: newGrade }));
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
      <p style={{ color: 'black', flexShrink: 0 }}>{ skillName }</p>
      <p style={{ color: 'black', flexShrink: 0 }}>{ question }</p>
      <div style={{ width: '10%', display: 'flex', flexDirection: 'column' }}>
        {changeGradeClicked && (searcherId !== userId) ? (
          <>
            <input
              type="text"
              id={`${id}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewGrade(e.target.value)}
              value={newGrade}
              onKeyDown={handleChangeGrade}
              placeholder="Вкажіть нову оцінку у %"
            />
            <button type="button" onClick={(): void => setChangeGradeClicked(!changeGradeClicked)}>Відмінити</button>
          </>
        ) : (
          <div role="button" tabIndex={0} onClick={(): void => setChangeGradeClicked(!changeGradeClicked)}>
            <p style={{ color: 'black' }}>{newGrade}</p>
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
    </div>
  );
}

export default Question;

import React, { useState } from 'react';

import IQuestion from '../../models/feedback/IQuestion';

function Question({
  question, skillName, grade, id,
}: IQuestion): JSX.Element {
  const [newGrade, setNewGrade] = useState(grade);

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewGrade(e.target.value)}
          value={grade}
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

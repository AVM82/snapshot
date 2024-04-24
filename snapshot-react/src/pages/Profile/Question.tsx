import React, { useState } from 'react';

function Question({ question, score }: { question: string, score: string }): JSX.Element {
  const [newScore, setNewScore] = useState(score);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
    }}
    >
      <p style={{ color: 'black' }}>{ question }</p>
      <div>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewScore(e.target.value)}
          value={score}
          placeholder="Вкажіть нову оцінку у %"
        />
        <div style={{
          width: newScore,
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

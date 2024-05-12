import { useState } from 'react';

import IStatistics from '../../../../models/profile/IStatistics';
import convertTimeStampToDate from '../../../../utils/convertTimeStampToDate';

function StatisticsItem({
  skillName, grade, date, questions,
}: IStatistics): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="statistics-item"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
      >
        <p>{skillName}</p>
        <p>{convertTimeStampToDate(date)}</p>
        <p>{Number(grade).toFixed(2)}</p>
        <div
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onClick={(): void => setIsExpanded(!isExpanded)}
        >
          <p>Show more</p>
          <span>+</span>
        </div>
      </div>
      {isExpanded && (
        <div>
          {questions.map((question) => (
            <div key={question.question}>
              <p>{question.question}</p>
              <p>{question.grade}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatisticsItem;

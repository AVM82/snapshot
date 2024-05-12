import { useState } from 'react';

const javaQuestions = [
  {
    question: 'What is the keyword used to define a class in Java?',
    grade: Math.floor(Math.random() * 101),
  },
  { question: 'How do you access elements in an array?', grade: Math.floor(Math.random() * 101) },
  {
    question: 'What is the difference between primitive and reference data types?',
    grade: Math.floor(Math.random() * 101),
  },
  { question: 'What is the purpose of the `main` method in a Java program?', grade: Math.floor(Math.random() * 101) },
  { question: 'How do you create a loop that iterates 10 times?', grade: Math.floor(Math.random() * 101) },
  { question: 'What is the use of the `static` keyword?', grade: Math.floor(Math.random() * 101) },
  { question: 'Explain the concept of inheritance in Java.', grade: Math.floor(Math.random() * 101) },
  { question: 'How do you handle exceptions in Java?', grade: Math.floor(Math.random() * 101) },
  { question: 'What are the benefits of using interfaces?', grade: Math.floor(Math.random() * 101) },
  { question: 'What is the difference between `==` and `equals()` methods?', grade: Math.floor(Math.random() * 101) },
];

function Statistics(): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ width: '100%' }}>
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
          <p>Java</p>
          <p>15.01.2024</p>
          <p>Good</p>
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
            {javaQuestions.map((question) => (
              <div key={question.question}>
                <p>{question.question}</p>
                <p>{question.grade}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Statistics;

function Questions(): JSX.Element {
  const javaQuestions = [
    {
      question: 'What is the difference between == and === operators in Java?',
      score: '10%',
    },
    {
      question: 'Explain the concept of polymorphism in Java.',
      score: '25%',
    },
    {
      question: 'How does exception handling work in Java?',
      score: '45%',
    },
    {
      question: 'What are the different types of loops in Java?',
      score: '65%',
    },
    {
      question: 'Explain the difference between ArrayList and LinkedList in Java.',
      score: '50%',
    },
    {
      question: 'What is the purpose of the \'static\' keyword in Java?',
      score: '95%',
    },
    {
      question: 'How does inheritance work in Java?',
      score: '83%',
    },
    {
      question: 'What is the role of the \'final\' keyword in Java?',
      score: '89%',
    },
    {
      question: 'Explain the concept of method overriding in Java.',
      score: '43%',
    },
    {
      question: 'What is the difference between \'final\', \'finally\', and \'finalize\' in Java?',
      score: '12%',
    },
    {
      question: 'What are the access modifiers in Java and how do they work?',
      score: '9%',
    },
    {
      question: 'How does multithreading work in Java?',
      score: '71%',
    },
    {
      question: 'What is the purpose of the \'this\' keyword in Java?',
      score: '24%',
    },
    {
      question: 'What is the difference between checked and unchecked exceptions in Java?',
      score: '93%',
    },
    {
      question: 'Explain the concept of encapsulation in Java.',
      score: '81%',
    },
  ];

  return (
    <div>
      {javaQuestions.map((question) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p>{ question.question }</p>
          <div style={{ width: '150px', height: '4px' }}>
            <div style={{
              width: question.score, backgroundColor: 'green', height: '4px', borderRadius: '4px',
            }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Questions;

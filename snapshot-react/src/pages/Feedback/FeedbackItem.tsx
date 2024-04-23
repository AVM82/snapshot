type Feedback = {
  question: string,
  score: string,
};

function FeedbackItem({ question, score }: Feedback): JSX.Element {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <p>{ question }</p>
      <div style={{ width: '150px', height: '4px' }}>
        <div style={{
          width: score, backgroundColor: 'green', height: '4px', borderRadius: '4px',
        }}
        />
      </div>
    </div>
  );
}

export default FeedbackItem;

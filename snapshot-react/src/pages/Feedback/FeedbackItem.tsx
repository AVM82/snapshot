import IFeedbackItem from '../../models/feedback/IFeedbackItem';

function FeedbackItem({ question, score, skillName }: IFeedbackItem): JSX.Element {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
    }}
    >
      <p style={{ color: 'black' }}>{ skillName }</p>
      <p style={{ color: 'black' }}>{ question }</p>
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

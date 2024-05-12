import Portrait from '../Profile/components/Portarit/Portrait';

function CandidatePreview(): JSX.Element {
  return (
    <div>
      <div>
        <p>Candidate Name</p>
        <p>Candidate Surname</p>
      </div>
      <div>
        <Portrait />
      </div>
    </div>
  );
}

export default CandidatePreview;

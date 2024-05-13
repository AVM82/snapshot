import ICandidateSearch from '../../models/candidateSearch/ICandidateSearch';
import TinyPortrait from './TinyPortrait';

function CandidatePreview({
  id, firstname, lastname, skillGrades, email,
}: ICandidateSearch): JSX.Element {
  return (
    <div id={`${id}`} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <div>
        <p>{firstname}</p>
        <p>{lastname}</p>
        <p>{email}</p>
      </div>
      <div>
        <TinyPortrait {...skillGrades} />
      </div>
    </div>
  );
}

export default CandidatePreview;

import { useState } from 'react';

import AutocompleteInput from '../../components/AutocompleteInput/AutocompleteInput';
import CandidatePreview from './CandidatePreview';

const data = ['java', 'javascript', 'php', 'c#', 'go', 'dart'];

function CandidateSearch(): JSX.Element {
  const [showSelected, setShowSelected] = useState<string[]>([]);
  const [click, setClick] = useState(false);
  const getSelectedVal = (value: string): void => {
    setShowSelected((prev) => [...prev, value]);
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <AutocompleteInput
          label="languages"
          pholder="Keyword..."
          data={data}
          onSelected={getSelectedVal}
        />
        <button type="button" onClick={(): void => setClick(!click)}>Знайти</button>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {showSelected.map((value) => (
          <div style={{ backgroundColor: 'aqua', padding: '5px' }}>
            <p>{value}</p>
          </div>
        ))}
      </div>
      {click && <div><CandidatePreview /></div>}
    </section>
  );
}

export default CandidateSearch;

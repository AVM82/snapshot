import { useState } from 'react';

type AutocompleteInputProps = {
  label: string,
  pholder: string,
  data: string[],
  onSelected: (param: string) => void,
};

function AutocompleteInput({
  label,
  pholder,
  data,
  onSelected,
}: AutocompleteInputProps): JSX.Element {
  const [suggestions, setSugesstions] = useState<string[]>([]);
  const [isHideSuggs, setIsHideSuggs] = useState(false);
  const [selectedVal, setSelectedVal] = useState('');

  const handler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSugesstions(data.filter((i) => i.toLowerCase().startsWith(e.target.value.toLowerCase())));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.value;
    setIsHideSuggs(false);
    setSelectedVal(input);
    handler(e);
  };

  const hideSuggs = (value: string): void => {
    onSelected(value);
    setSelectedVal(value);
    setIsHideSuggs(true);
  };

  return (
    <div className="sugesstion-auto">
      <div className="form-control-auto">
        <label htmlFor="tag-input">{label}</label>
        <input
          id="tag-input"
          placeholder={pholder}
          type="search"
          value={selectedVal}
          onChange={handleChange}
        />
      </div>

      <div
        className="suggestions"
        style={{
          display: isHideSuggs ? 'none' : 'block', maxHeight: '250px', overflowY: 'auto', overflowX: 'hidden',
        }}
      >
        {suggestions.map((item) => (
          <div
            role="button"
            tabIndex={0}
            key={`${item}`}
            onClick={() => {
              hideSuggs(item);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AutocompleteInput;

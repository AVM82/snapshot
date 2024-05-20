import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import snapshotApi from '../../api/request';
import AutocompleteInput from '../../components/AutocompleteInput/AutocompleteInput';
import ICandidateSearch from '../../models/candidateSearch/ICandidateSearch';
import CandidatePreview from './CandidatePreview';
import styles from './CandidateSearch.module.scss';

type Criteria = { skill: string, grade: string };

function CandidateSearch(): JSX.Element {
  const [showSelected, setShowSelected] = useState<string[]>([]);
  const [userPreviews, setUserPreviews] = useState<ICandidateSearch[]>();
  const [selectOptions, setSelectOptions] = useState<string[]>([]);
  const [formData, setFormData] = useState<Criteria[]>([]);
  const [click, setClick] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const endOfSlice = isExpanded ? selectOptions.length : 7;
  useEffect(() => {
    const getLowerSkills = async (): Promise<void> => {
      const response: string[] = await snapshotApi.get('/skills/lower-level');

      setSelectOptions(response);
    };

    getLowerSkills();
  }, []);

  const getSelectedVal = (value: string): void => {
    if (showSelected.length < 7) {
      if (showSelected.includes(value)) toast.warn('Такий скіл уже додано');
      else setShowSelected((prev) => [...prev, value]);
    } else toast.warn('Можна додати лише 7 скілів');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setClick(!click);

    const response: ICandidateSearch[] = await snapshotApi.post('/users/by-skills-and-grades', formData);

    setUserPreviews(response);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    const existingSkillIndex = formData.findIndex((item) => item.skill === name);

    if (existingSkillIndex !== -1) {
      setFormData((prev) => {
        const updatedFormData = [...prev];
        updatedFormData[existingSkillIndex] = {
          ...updatedFormData[existingSkillIndex],
          grade: value,
        };

        return updatedFormData;
      });
    } else {
      setFormData((prev) => ([
        ...prev,
        {
          skill: name,
          grade: value,
        },
      ]));
    }
  };

  return (
    <section className={styles.candidateSearchPage}>
      <div className={styles.candidateSearchRow}>
        <div className={styles.candidateSearchInput}>
          <AutocompleteInput
            pholder="Keyword..."
            data={selectOptions}
            onSelected={getSelectedVal}
          />
          <div className={styles.skillsBlock}>
            {[...selectOptions.sort()].slice(0, endOfSlice).map((skill) => (
              <div
                key={skill}
                className={styles.skillChip}
              >
                {skill}
              </div>
            ))}
            <div
              aria-label="expand-skill-block"
              className={styles.chevron}
              role="button"
              tabIndex={0}
              onClick={(): void => setIsExpanded(!isExpanded)}
            />
          </div>
          <form
            style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', gap: '10px',
            }}
            onSubmit={handleSubmit}
          >
            {showSelected.map((value) => (
              <div style={{ backgroundColor: 'blueviolet', padding: '5px' }} key={value}>
                <label id={`${value}`}>
                  {value}
                  {' '}
                  <input
                    type="text"
                    name={`${value}`}
                    id={`${value}`}
                    placeholder="Введіть рівень у %"
                    maxLength={2}
                    onChange={handleChange}
                  />
                </label>
              </div>
            ))}
            {formData.length > 0 && <button type="submit">Знайти</button>}
          </form>
        </div>
        {userPreviews && userPreviews.map((preview) => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CandidatePreview key={preview.id} {...preview} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CandidateSearch;

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import snapshotApi from '../../../../api/request';
import closeIcon from '../../../../assets/icon-close.svg';
import AutocompleteInput from '../../../../components/AutocompleteInput/AutocompleteInput';
import CandidateSearchFormProps from '../../../../models/candidateSearch/CandidateSearchProps';
import styles from './CandidateSearchForm.module.scss';

function CandidateSearchForm({
  setFormData,
  formData,
  handleSubmit
}: CandidateSearchFormProps): JSX.Element {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [lowerSkills, setLowerSkills] = useState<string[]>([]);
  const [selectOptions, setSelectOptions] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const endOfSlice = isExpanded ? selectOptions.length : 8;

  useEffect(() => {
    const getLowerSkills = async (): Promise<void> => {
      const response: string[] = await snapshotApi.get('/skills/lower-level');

      setLowerSkills(response);
      setSelectOptions(response);
    };

    getLowerSkills();
  }, []);

  const getSelectedVal = (e: React.MouseEvent<HTMLDivElement>): void => {
    const { id } = e.currentTarget;

    if (selectedSkills.length < 7 && id) {
      if (selectedSkills.includes(id)) toast.warn('Такий скіл уже додано');
      else setSelectedSkills((prev) => [...prev, id]);
    } else toast.warn('Можна додати лише 7 скілів');
  };

  const handleFindSkill = (skill: string): void => {
    setSelectOptions(
      lowerSkills.filter((i) => i.toLowerCase().startsWith(skill.toLowerCase()))
    );
  };

  const handleDeleteSkill = (e: React.MouseEvent<HTMLDivElement>): void => {
    const { id } = e.currentTarget;

    if (id) {
      const newSelectedSkills = selectedSkills.filter((item) => item !== id);
      setSelectedSkills(newSelectedSkills);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    const existingSkillIndex = formData.findIndex(
      (item) => item.skill === name
    );

    if (existingSkillIndex !== -1) {
      setFormData((prev) => {
        const updatedFormData = [...prev];
        updatedFormData[existingSkillIndex] = {
          ...updatedFormData[existingSkillIndex],
          grade: value
        };

        return updatedFormData;
      });
    } else {
      setFormData((prev) => [
        ...prev,
        {
          skill: name,
          grade: value
        }
      ]);
    }
  };

  return (
    <div className={styles.candidateSearchInput}>
      <AutocompleteInput pholder="Пошук скілів" onChange={handleFindSkill} />
      <h3 style={{ alignSelf: 'start' }}>
        Оберіть навички кандидата (максимум 7):
      </h3>
      <div className={styles.skillsBlock}>
        {[...selectOptions.sort()].slice(0, endOfSlice).map((skill) => (
          <div
            key={skill}
            role="button"
            tabIndex={0}
            className={styles.skillChip}
            id={skill}
            onClick={getSelectedVal}
          >
            {skill}
          </div>
        ))}
        <div className={styles.chevronWrapper}>
          <div
            aria-label="expand-skill-block"
            className={styles.chevron}
            role="button"
            tabIndex={0}
            onClick={(): void => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>
      <form className={styles.skillForm} onSubmit={handleSubmit}>
        {selectedSkills.map((value) => (
          <div className={styles.skillFormItem} key={value}>
            <label id={value}>
              {value}{' '}
              <input
                type="text"
                name={value}
                id={value}
                maxLength={2}
                onChange={handleChange}
                required
              />
            </label>
            <div
              role="button"
              tabIndex={0}
              id={value}
              onClick={handleDeleteSkill}
            >
              <img src={closeIcon} alt="delete" width={20} height={20} />
            </div>
          </div>
        ))}
        <button className={styles.primaryButton} type="submit">
          Знайти
        </button>
      </form>
    </div>
  );
}

export default CandidateSearchForm;

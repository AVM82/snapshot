import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import snapshotApi from '../../../../api/request';
import AutocompleteInput from '../../../../components/AutocompleteInput/AutocompleteInput';
import CandidateSearchFormProps from '../../../../models/candidateSearch/CandidateSearchProps';
import SkillChip from '../../../CandidateSearch/components/CandidateSearchForm/SkillChip';
import SkillFormItem from '../../../CandidateSearch/components/CandidateSearchForm/SkillFormItem';
import SkillIcon from './SkillIcon';
import styles from './SkillSettings.module.scss';

function SkillSettings({
  setFormData,
  formData,
  handleSubmit
}: CandidateSearchFormProps): JSX.Element {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [lowerSkills, setLowerSkills] = useState<{ name: string, title: string }[]>([]);
  const [selectOptions, setSelectOptions] = useState<{ name: string, title: string }[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const endOfSlice = isExpanded ? selectOptions.length : 8;

  useEffect(() => {
    const getLowerSkills = async (): Promise<void> => {
      const response: { name: string, title: string }[] = await snapshotApi.get('/skills/lower-level');

      setLowerSkills(response);
      setSelectOptions(response);
    };

    getLowerSkills();
  }, []);

  const getSelectedVal = (e: React.MouseEvent<HTMLDivElement>): void => {
    const { id } = e.currentTarget;

    if (id) {
      if (selectedSkills.includes(id)) toast.warn('Такий скіл уже додано');
      else setSelectedSkills((prev) => [...prev, id]);
    } else toast.warn('Можна додати лише 7 скілів');
  };

  const handleFindSkill = (skill: string): void => {
    setSelectOptions(
      lowerSkills.filter((i) => i.name.toLowerCase().startsWith(skill.toLowerCase()))
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
      {/* <AutocompleteInput pholder="Пошук скілів" onChange={handleFindSkill} /> */}
      {/* <h3 style={{ alignSelf: 'start' }}>
        Оберіть навички кандидата (максимум 7):
      </h3> */}
      <div className={styles.skillsBlock}>
        <div className={styles.skillsWrapper}>
          {[...selectOptions.sort()].slice(0, endOfSlice).map((skill) => (
            <SkillIcon skill={skill.name.length > 20 ? skill.title : skill.name }
              tooltip={skill.name}  getSelectedVal={getSelectedVal} selectedSkills={selectedSkills}/>
          ))}
        </div>
        <div className={styles.chevronWrapper}>
          <div
            aria-label="expand-skill-block"
            className={styles.chevron}
            style={{ transform: `rotate(${isExpanded ? '-135deg' : '45deg'})` }}
            role="button"
            tabIndex={0}
            onClick={(): void => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>
      {/* {selectedSkills.length > 0 && <form className={styles.skillForm} onSubmit={handleSubmit}>
        {selectedSkills.map((value, index) => (
          <SkillFormItem value={value} index={index} handleDeleteSkill={handleDeleteSkill} handleChange={handleChange}/>
        ))}
        <button className={styles.primaryButton} type="submit">
          Знайти
        </button>
      </form>} */}
    </div>
  );
}

export default SkillSettings;
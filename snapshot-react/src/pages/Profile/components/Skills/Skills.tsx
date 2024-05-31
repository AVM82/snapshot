import { TreeItem } from '@mui/x-tree-view';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import React, { useEffect, useState } from 'react';

import snapshotApi from '../../../../api/request';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { ISkills } from '../../../../models/profile/ISkills';
import { IRoles } from '../../../../models/user/IRoles';
import getRoleSkills from '../../../../store/reducers/skills/actions';
import { getFilterSkillsByInput } from '../../../../store/reducers/skills/userSkillsSlice';
import { RootState } from '../../../../store/store';
import styles from './Skills.module.scss';

interface SkillsProps {
  roleId: number;
  setUserSkills: React.Dispatch<React.SetStateAction<string[]>>;
  // setAllSkills: React.Dispatch<React.SetStateAction<string[]>>;
  // setSelectedSkillsId: React.Dispatch<React.SetStateAction<number[]>>;
}
export default function Skills({ roleId, setUserSkills }: SkillsProps): React.JSX.Element {
// export default function Skills({ roleId }: SkillsProps): React.JSX.Element {
// export default function Skills(props:IRoles):React.JSX.Element {
  const [selectedSkillsId, setSelectedSkillsId] = useState<number[]>([]);
  const [selectedSkillsNames, setSelectedSkillsNames] = useState<string[]>([]);
  const { allSkills: skills, isLoading, filteredByInputSkills }
    = useAppSelector((state: RootState) => state.userSkills);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  // const { id: roleId } = props;

  // const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  // const [lowerSkills, setLowerSkills] = useState<{ name: string, title: string }[]>([]);
  // const [selectOptions, setSelectOptions] = useState<{ name: string, title: string }[]>([]);
  // const [isExpanded, setIsExpanded] = useState(false);
  // const endOfSlice = isExpanded ? selectOptions.length : 8;

  useEffect(() => {
    dispatch(getRoleSkills(roleId));
  }, [dispatch, roleId]);

  useEffect(() => {
    dispatch(getFilterSkillsByInput(inputValue));
  }, [dispatch, inputValue]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
    setIsInputEmpty(Boolean(event.target.value));
  };

  const handleSkillClick = (skillId: number, skillName: string): void => {
    if (!selectedSkillsId.includes(skillId)) {
      const updatedSkills = [...selectedSkillsId, skillId];
      const skillNames = [...selectedSkillsNames, skillName];
      setSelectedSkillsId(updatedSkills);
      setSelectedSkillsNames(skillNames);
      setUserSkills((prevSkills) => [...prevSkills, skillName]);
      // setAllSkills((prevSkills) => [...prevSkills, skillName]);
    }
  };
  const onSubmit = async ():Promise<void> => {
    const data = {
      skillIds: selectedSkillsId,
    };

    await snapshotApi.post(`/skills/user/${roleId}`, data);
  };

  if (!isLoading) return <>loading...</>;

  const renderTreeItems = (skill: ISkills[]): React.JSX.Element => (
    <SimpleTreeView className={styles.skillsContainer}>
      {skill && skill.map(({ id, name, children }) => (
        !selectedSkillsNames.includes(name) && (
          <TreeItem
            className={styles.treeItem}
            key={id.toString()}
            itemId={id.toString()}
            label={name}
            onClick={children.length > 0 ? ():null => null : (): void => handleSkillClick(id, name)}
          >
            {children.length > 0 && renderTreeItems(children)}
          </TreeItem>
        )
      ))}
    </SimpleTreeView>
  );

  const renderFilteredItems = ():React.JSX.Element => (
    <div className={styles.filteredSkillsContainer}>
      {filteredByInputSkills.map(({ id, name }) => (
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleSkillClick(id, name)}
          key={id}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              handleSkillClick(id, name);
            }
          }}
        >
          {name}
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.container}>

      {/* <h3>Оберіть навички:</h3> */}
      <div>
        <input
          className={styles.input}
          type="text"
          value={inputValue}
          placeholder="Почніть вводити назву навички..."
          onChange={onInputChange}
        />
      </div>
      <div />
      <div>
        {isInputEmpty ? renderFilteredItems() : renderTreeItems(skills)}
      </div>
      <button type="button" onClick={onSubmit} className={styles.submitButtonSkill}>
        Підтвердити
      </button>
    </div>
  );
}

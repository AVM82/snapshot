import { TreeItem } from '@mui/x-tree-view';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import React, { useEffect, useState } from 'react';

import snapshotApi from '../../api/request';
import { IRoles } from '../../models/profile/IRoles';
import { ISkills } from '../../models/profile/ISkills';
import styles from './Skills.module.scss';

export default function Skills(props:IRoles):React.JSX.Element {
  const { id: roleId } = props;
  const [skills, setSkills] = useState<ISkills[]>();
  const [selectedSkillsId, setSelectedSkillsId] = useState<string[]>([]);
  const [selectedSkillsNames, setSelectedSkillsNames] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  useEffect(() => {
    (async ():Promise<void> => {
      const response: ISkills[] = await snapshotApi.get(`http://localhost:8080/skills/role/${roleId}`);
      setSkills(response);
    })();
  }, [roleId]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    setInputValue(event.target.value);
    setIsInputEmpty(Boolean(event.target.value));
  };
  const handleSkillClick = (skillId:string, skillName:string):void => {
    if (!selectedSkillsId.includes(skillId)) {
      const updatedSkills = [...selectedSkillsId, skillId];
      const skillNames = [...selectedSkillsNames, skillName];
      setSelectedSkillsId(updatedSkills);
      setSelectedSkillsNames(skillNames);
    }
  };

  const filterSkillsByInput = ():ISkills[] => {
    const filteredSkills:ISkills[] = [];

    function search(node:ISkills):void {
      if (node.children.length === 0) {
        if (node.name.toLowerCase().includes(inputValue.toLowerCase())) {
          if (!selectedSkillsNames.includes(node.name)) filteredSkills.push(node);
        }
      } else {
        node.children.forEach((child) => search(child));
      }
    }

    if (skills) {
      skills.forEach((skill:ISkills) => search(skill));
    }

    return filteredSkills;
  };
  const onSubmit = async ():Promise<void> => {
    const data = {
      skillIds: selectedSkillsId,
    };

    await snapshotApi.post('http://localhost:8080/skills/user/1', data);
  };

  if (!skills) return <>loading...</>;

  const renderTreeItems = (skill: ISkills[]): React.JSX.Element => (
    <SimpleTreeView className={styles.skillsContainer}>
      {skill.map(({ id, name, children }) => (
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
  const renderFilteredItems = ():React.JSX.Element => {
    const filteredSkills:ISkills[] = filterSkillsByInput();

    return (
      <div className={styles.filteredSkillsContainer}>
        {filteredSkills.map(({ id, name }) => (
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
  };

  return (
    <div className={styles.container}>
      <h3>Ваші навички:</h3>
      <ul className={styles.selectedSkillsContainer}>
        {selectedSkillsNames.map((skillName: string, id: number) => (
          <li key={id.toString()}>{skillName}</li>
        ))}
      </ul>
      <button type="button" onClick={onSubmit}>Підтвердити</button>
      <h3>Вибиріть навички:</h3>
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
    </div>
  );
}
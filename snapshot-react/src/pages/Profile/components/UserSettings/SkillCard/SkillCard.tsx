import { useEffect, useState } from 'react';

import snapshotApi from '../../../../../api/request';
import { useAppSelector } from '../../../../../hooks/redux';
import { ISkills } from '../../../../../models/profile/ISkills';
import { IRoles, RolesTypes } from '../../../../../models/user/IRoles';
import UserRoles from '../../Roles/UserRoles';
import Skills from '../../Skills/Skills';
import styles from './SkillCard.module.scss';

function SkillCard(): React.JSX.Element {
  const user = useAppSelector((state) => state.user.userData);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [userSkills, setUserSkills] = useState<ISkills[]>([]);
  const [showNewComponent, setShowNewComponent] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  // const role = useAppSelector((state) => state.)
  const [selectedRoleN, setSelectedRoleN] = useState<IRoles | null>(null);
  // const [userSkills, setUserSkills] = useState<string[]>([]);
  // const [buttonText, setButtonText] = useState('ДОДАТИ НАВИЧКИ');
  // const [allSkills, setAllSkills] = useState<string[]>([]);
  // const [expanded, setExpanded] = useState(false);
  // const [lowerSkills, setLowerSkills] = useState<string[]>([]);

  const getRoleId = (roleName: RolesTypes): number => {
    switch (roleName) {
      case 'SEARCHER':
        return 1;
      case 'INTERVIEWER':
        return 2;
      default:
        return 0;
    }
  };
  useEffect(() => {
    if (selectedRole) {
      const fetchUserSkills = async () => {
        const roleId = getRoleId(selectedRole);
        const response = await snapshotApi.get(`skills/${user.id}/role/${roleId}`);
        setUserSkills(response);
      };
      fetchUserSkills();
    }
  }, [selectedRole, user.id]);

  const handleButtonClick = (): void => {
    if (selectedRole) {
      setShowNewComponent((prevShowNewComponent) => !prevShowNewComponent);
      setButtonVisible(false); 
      
    } else {
      alert('Будь ласка, виберіть роль перед додаванням навичок.');
    }
  };
  const visibleSkills = isExpanded ? userSkills : userSkills.slice(0, 10);

  const handleSkillRemove = async (skill: ISkills) => {
    const roleId = getRoleId(selectedRole);
    await snapshotApi.delete(`skills/${user.id}/role/${roleId}/skill/${skill.id}`);
    setUserSkills((prevSkills) => prevSkills.filter((s) => s.id !== skill.id));
  };

  return (
    <div className={styles.main_skill_settings_container}>
      <div className={styles.roleSelectionContainer}>
        {/* <UserRoles /> */}
        <UserRoles setSelectedRole={setSelectedRole} />
      </div>
     
      <div className={styles.main_skill_settings_exist}>
        <div
          aria-label="expand-skill-block"
          className={styles.chevron}
          style={{ transform: `rotate(${isExpanded ? '-135deg' : '45deg'})` }}
          role="button"
          tabIndex={0}

          onClick={(): void => setIsExpanded(!isExpanded)}
          onKeyDown={(event): void => {
            if (event.key === 'Enter' || event.key === ' ') {
              setIsExpanded(!isExpanded);
            }
          }}
        />

        {visibleSkills.map((skill) => (
          <div key={skill.id} className={`${styles.skillChip} ${styles.existingSkill}`}>
            {skill.name}
            <span
              className={styles.closeIcon}
              role="button"
              tabIndex={0}
              onClick={() => handleSkillRemove(skill)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  handleSkillRemove(skill);
                }
              }}
            >
              &times;
            </span>
          </div>
        ))}

      </div>

      <div className={styles.main_skill_settings}>
        <div className={styles.main_skill_settings_title}>Мої навички</div>
        {showNewComponent && selectedRole && (
          <Skills roleId={setSelectedRole} setAllSkills={setAllSkills} />
          
        )}
        <button 
          type="button" 
          className={styles.submitButtonSkill} 
          onClick={handleButtonClick} 
          style={{ display: buttonVisible ? 'block' : 'none' }} >
          ДОДАТИ НАВИЧКИ
        </button>
      </div>
    </div>
  );
}

export default SkillCard;


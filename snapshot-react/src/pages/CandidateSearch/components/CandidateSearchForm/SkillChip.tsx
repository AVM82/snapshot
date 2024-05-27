import styles from './CandidateSearchForm.module.scss';

type SkillChipProps = {
  skill: string,
  getSelectedVal: (e: React.MouseEvent<HTMLDivElement>) => void
  selectedSkills: string[]
};

function SkillChip({ skill, getSelectedVal, selectedSkills }: SkillChipProps): JSX.Element {
  return <div
    key={skill}
    role="button"
    tabIndex={0}
    style={{ backgroundColor: `${selectedSkills.includes(skill) ? '#8de3db' : '#c2cae8'}` }}
    className={styles.skillChip}
    id={skill}
    onClick={getSelectedVal}
  >
    {skill}
  </div>;
}

export default SkillChip;

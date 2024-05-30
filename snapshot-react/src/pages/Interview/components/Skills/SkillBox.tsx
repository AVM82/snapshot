import styles from './SkillBox.module.scss';

interface Props {
  onClick?: () => void;
}

export default function SkillBox({onClick: Props}): React.JSX.Element {
  return (
    <section>
      <h3>
        Мої навички
      </h3>

      <div className={styles.skill}>
        <p>ABC</p>
      </div>
    </section>
  );
}

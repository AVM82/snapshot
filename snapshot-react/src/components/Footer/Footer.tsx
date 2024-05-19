import styles from './Footer.module.scss';
import iconIn from '../../assets/icon-in.svg';
import iconF from '../../assets/icon-f.svg';
import iconTv from '../../assets/icon-tv.svg';
import classNames from 'classnames';

function Footer(): React.JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_linksContainer}>
        <div className={classNames(styles.footer_link, styles.footer_link_hr)}>HR</div>
        <div className={styles.footer_link}>Співбесіда</div>
        <div className={styles.footer_link}>Довідник скілів</div>
      </div>
      <div className={styles.footer_socialMediaLinks}>
        <img src={iconF} alt="Facebook icon" />
        <img src={iconTv} alt="Twitter icon" />
        <img src={iconIn} alt="LinkedIn icon" />
      </div>
      <div className={styles.footer_copyright}>
        SNAPSHOT IT © 2024. All rights reserved.
      </div>
    </footer >
  );
}

export default Footer;




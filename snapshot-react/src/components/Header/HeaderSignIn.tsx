import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';

import { useAppSelector } from '../../hooks/redux';
import useForce from '../../utils/useForce';
import classNames from 'classnames';

function HeaderSignIn(): React.JSX.Element {
  const user = useAppSelector((state) => state.user.userData);
  const location = useLocation();
  useForce(location);

  return (
    <header className={styles.header}>
      <div className={styles.header_top}>
        <div className={styles.header_top_location}>Україна</div>
        <div className={styles.header_top_buttonBar}>
          <Link to="sign-in" className={classNames(styles.header_top_button_signin, styles.header_link)}>УВІЙТИ</Link>
          <div className={styles.header_top_buttonBar_line}></div>
          <Link to="sign-up" className={classNames(styles.header_top_button_signup, styles.header_link)}>ЗАРЕЄСТРУВАТИСЬ</Link>
        </div>
      </div>
      <div className={styles.header_title}>SNAPSHOT IT</div>
    </header>
  );
}

export default HeaderSignIn;
// function useState(arg0: boolean): [any, any] {
//   throw new Error('Function not implemented.');
// }
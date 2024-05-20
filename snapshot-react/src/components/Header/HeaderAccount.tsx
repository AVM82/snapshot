import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';
import useForce from '../../utils/useForce';
import styles from './Header.module.scss';
import Notification from './Notification';

function HeaderAccount(): React.JSX.Element {
  const user = useAppSelector((state) => state.user.userData);
  const location = useLocation();
  useForce(location);

  return (
    <header className={styles.header}>
      <div className={styles.header_top}>
        <div className={styles.header_top_location}>Location</div>
        <div className={styles.header_top_user}>
          {user.firstname}
          <div className={styles.drop_down_profile}>
            <div className={styles.header_user_drpop_down_menu}>
              <Link className={classNames(styles.header_top_user, styles.header_top_user_hover, styles.header_user_drpop_down_link, styles.header_user_drpop_down_user)} to={`/profile/${user.id}`}>
                Мій профіль
              </Link>
              <Link className={styles.header_user_drpop_down_link} to={`/profile/${user.id}/settings`}>Налаштувати профіль</Link>
              <Link
                className={classNames(styles.header_user_drpop_down_link, styles.header_user_drpop_down_exit)}
                to="/sign-in"
              >
                Вийти
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.header_title}>SNAPSHOT IT</div>
      <div className={styles.header_linksContainer}>
        <div><Link className={styles.header_link} to={`/profile/${user.id}/settings`}>Співбесіда</Link></div>
        <div><Link className={styles.header_link} to={`/profile/${user.id}/statistics`}>Статистика</Link></div>
        <div><Link className={styles.header_link} to={`/profile/${user.id}/statistics`}>Довідник скілів</Link></div>
      </div>
      <Link to="/">
        ЛОГОТИП
      </Link>
      <Link to="/candidate-search">Знайти кандидата</Link>
      <div>
        <Link to={`/profile/${user.id}`}>
          {user.firstname}
          {' '}
          {user.lastname}
        </Link>
        {Boolean(user.id) && <Notification />}
      </div>
    </header>

  );
}

export default HeaderAccount;

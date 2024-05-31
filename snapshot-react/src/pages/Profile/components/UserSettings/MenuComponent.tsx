
import classNames from 'classnames';

import notificationsIcon from '../../../../assets/icon-bell.svg';
import deleteAccountIcon from '../../../../assets/icon-exit-second.svg';
import changePasswordIcon from '../../../../assets/icon-lock.svg';
import userIcon from '../../../../assets/icon-person.svg';
import skillsIcon from '../../../../assets/icon-star.svg';
import styles from './UserProfileNavigator.module.scss';

interface IMenuComponentProps {
  onClick: (menu: string) => void;
  activeMenu: string;
}

// function InterviewStatusSelector({ onClick,status }:IInterviewStatusSelectorProps):React.JSX.Element {
function MenuComponent({ onClick,activeMenu }:IMenuComponentProps):React.JSX.Element {
  const menuItems = [
    // { key: 'personal', label: 'Персональні дані' },
    // { key: 'skills', label: 'Мої навички' },
    // { key: 'notifications', label: 'Сповіщення' },
    // { key: 'changePassword', label: 'Змінити пароль' },
    // { key: 'deleteAccount', label: 'Видалити акаунт' },
    { key: 'personal', label: 'Персональні дані', icon: userIcon },
    { key: 'skills', label: 'Мої навички', icon: skillsIcon },
    { key: 'notifications', label: 'Сповіщення', icon: notificationsIcon },
    { key: 'changePassword', label: 'Змінити пароль', icon: changePasswordIcon },
    { key: 'deleteAccount', label: 'Видалити акаунт', icon: deleteAccountIcon },
  ];

  const handleMenuClick = (menu: string):void => {
    onClick(menu);
  };

  // className={classNames(styles.header_top_user,
  //   styles.header_top_user_hover, styles.header_user_drpop_down_link, styles.header_user_drpop_down_user)}
  return (
    <div className={styles['user-card']}>
      {menuItems.map((item) => (
        <button
          type="button"
          key={item.key}
          onClick={() => handleMenuClick(item.key)}
          className={item.key === activeMenu ? `${styles.activeLink} ${styles.link}` : styles.link}
        >
          <img src={item.icon} alt={`${item.label} icon`} className={classNames(styles.icon)} />
          {/* <p>{item.label}</p> */}
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MenuComponent;

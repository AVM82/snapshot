import React from 'react';
import { Link } from 'react-router-dom';

import userDefaultPhoto from '../../../../../assets/default-full-photo.svg';
import iconPen from '../../../../../assets/icon-pen.svg';
import Input from '../../../../Auth/components/Input';
import styles from '../UserProfileNavigator.module.scss';

function UserInfoCard(): React.JSX.Element {

  return (
    <div className={styles.main_user_settings}>
      <div className={styles.main_user_settings_title}>Особиста інформація</div>
      <div className={styles.main_user_settings_photo}>

        <img src={userDefaultPhoto} alt="User Default" className={styles.user_default_photo} />
        <div className={styles.user_icon_container}>
          <Link className={styles.icon_pen}
            to="/">
            <img src={iconPen} alt="Edit pen" />
          </Link>
        </div>
      </div>
      <div className={styles.main_user_settings_input_name}>
        <Input
          inputName="Прізвище та ім'я"
          type="text"
          id="login"
          placeholder="Введіть прізвище та ім'я" error={undefined}
        />
      </div>
      <div  className={styles.main_user_settings_input_username}>
        <Input
          inputName="Користувацьке ім'я"
          type="text"
          id="password"
          placeholder="Введіть користувацьке ім'я" error={undefined}
        />
      </div>
      <div className={styles.main_user_settings_location}>
        <Input className={styles.main_user_settings_input_country}
          inputName="Країна"
          type="text"
          id="login"
          placeholder="country" error={undefined}
        />
        {/* <CustomCountryDropdown /> */}
        <Input className={styles.main_user_settings_input_town}
          inputName="Місто"
          type="select"
          id="login"
          placeholder="town" error={undefined}
        />
      </div>
    </div>
  );
}

export default UserInfoCard;

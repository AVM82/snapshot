import React from 'react';

import userPhoto from '../../../../assets/profilePhoto.jpg';
import { useAppSelector } from '../../../../hooks/redux';
import styles from './UserCard.module.scss';

function UserCard():React.JSX.Element {
  const { avatarImgUrl, firstname, lastname } = useAppSelector((state) => state.user.userData);

  return (
    <div className={styles['user-card']}>
      <div className={styles['card-top']} />
      <div className={styles['card-content']}>
        <div className={styles['profile-picture']}>
          <img src={avatarImgUrl && userPhoto} alt="user avatar" />
        </div>
        <div className={styles['profile-name']}>
          <h3>
            {firstname}
            {' '}
            {lastname}
          </h3>
        </div>
      </div>
      <div className={styles['profile-button']}>
        <button type="button">Налаштувати профіль</button>
      </div>
    </div>
  );
}

export default UserCard;

import styles from './UserCard.module.scss';
import userPhoto from '../../../../assets/profilePhoto.jpg';

function UserCard(/*props*/) {
  return (
    <div className={styles['user-card']}>
      <div className={styles['card-top']}>
      </div>
      <div className={styles['card-content']}>
        <div className={styles['profile-picture']}>
          <img src={userPhoto} alt='Profile photo' />
        </div>
        <div className={styles['profile-name']}>
          {/*TODO add props data*/}
          <h3>John Doe</h3>
        </div>
      </div>
      <div className={styles['profile-button']}>
        <button type='button'>Налаштувати профіль</button>
      </div>
    </div>
  );
}

export default UserCard;

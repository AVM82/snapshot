
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearState } from '../../../../../store/reducers/account/accountSlice';
import deleteAccount from '../../../../../store/reducers/account/actions';
import { deleteUser } from '../../../../../store/reducers/user/userSlice';
import { AppDispatch, RootState } from '../../../../../store/store';
import styles from './SettingsDeleteAccount.module.scss';
import UseEffectAfterSuccess from './UseEffectAfterSuccess';

function SettingsDeleteAccount(): React.JSX.Element {

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { error, success } = 
  useSelector((state: RootState) => state.account);
  // const error  = useSelector((state: RootState) => state.account);

  const handleDeleteAccount = (): void => {
    const confirmed = window.confirm('Ви впевнені, що хочете видалити акаунт? Цю дію не можна скасувати.');

    if (!confirmed) {
      // dispatch(setError('Ви повинні підтвердити видалення акаунту'));

      return;
    }

    dispatch(deleteAccount());
  };
  
  // useEffect(() => {
  //   if (success) {
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('refresh_token');
  //     dispatch(deleteUser());
  //     navigate('/'); 
  //     dispatch(clearState()); 
      
  //   }
  // }, [success, navigate, dispatch]);

  return (
    <div className={styles.main_user_settings_notification}>
      <div className={styles.main_user_settings_title_notification}>Видалити акаунт?</div>
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>Акаунт успішно видалено</div>}
      <button onClick={handleDeleteAccount} className={styles.deleteButton}>
        Видалити акаунт
      </button>
      <UseEffectAfterSuccess />
    </div>
  );
}

export default SettingsDeleteAccount;

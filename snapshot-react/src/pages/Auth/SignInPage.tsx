import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import snapshotApi from '../../api/request';
import { useAppDispatch } from '../../hooks/redux';
import { ISignIn } from '../../models/auth/ISignIn';
import getUser from '../../store/reducers/user/actions';
import styles from './AuthPage.module.scss';
import OAuth2 from './OAuth2';

export default function SignInPage(): JSX.Element {
  const {
    register, handleSubmit, reset,
  } = useForm<ISignIn>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<ISignIn> = async (data): Promise<void> => {
    const token: { access_token: string, refresh_token: string } = await snapshotApi.post('/auth/authenticate', data);

    if (token) {
      localStorage.setItem('token', token.access_token);
      localStorage.setItem('refresh_token', token.refresh_token);
      dispatch(getUser());
      navigate('/');
    }

    reset();
  };

  return (
    <div className={styles['auth-container']}>
      <div className={styles['auth-form-wrapper']}>
        <h3>Вхід</h3>
        <form className={styles['auth-form']} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="login">Логін *</label>
          <input
            type="text"
            id="login"
            className={`${styles['auth-form-input']}`}
            {...register('email')}
            placeholder="Введіть електронну пошту"
            required
          />
          <label htmlFor="password">Пароль *</label>
          <input
            type="password"
            id="password"
            className={`${styles['auth-form-input']}`}
            {...register('password')}
            required
            placeholder="Введіть пароль"
          />
          <button
            type="submit"
            className={styles.signInButton}
          >
            Увійти
          </button>
        </form>
        <div
          className={styles['to-sign-in']}
          onClick={() => navigate('/sign-up')}
          role="button"
          tabIndex={0}
        >
          <p>Не має акаунта? Зареєструватись</p>
        </div>
        <br />
        <OAuth2 />
      </div>
    </div>
  );
}

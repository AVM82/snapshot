/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { IAuthForm } from '../../models/models';
import styles from './AuthPage.module.scss';
import OAuth2 from './OAuth2';

export default function SignInPage(): JSX.Element {
  const {
    register, handleSubmit, reset,
  } = useForm<IAuthForm>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IAuthForm> = (data): void => {
    toast.success(`Логін: ${data.login}
    Пароль: ${data.password}`);
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
            {...register('login')}
            placeholder="Введіть електронну пошту"
            required
          />
          <label htmlFor="paswword">Пароль *</label>
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
            className={styles['auth-form-btn']}
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
          <br />
          <OAuth2 />
        </div>
      </div>
    </div>
  );
}

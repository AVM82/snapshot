/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import EmailRegexp from '../../common/emailRegexp';
import PasswordRegex from '../../common/passwordRegexp';
import { ISignUp } from '../../models/auth/ISignUp';
import styles from './AuthPage.module.scss';
import OAuth2 from './OAuth2';

export default function SignUpPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<ISignUp>({
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<ISignUp> = (data): void => {
    toast.success(`Ім'я: ${data.firstName}
    Прізвище: ${data.lastName}
    Нікнейм: ${data.userName}
    Логін: ${data.login}
    Пароль: ${data.password}`);

    reset();
  };

  return (
    <div className={styles['auth-container']}>
      <div className={styles['auth-form-wrapper']}>
        <h3>Реєстрація</h3>
        <form className={styles['auth-form']} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="first-name">Ім&apos;я *</label>
          <input
            type="text"
            id="first-name"
            className={`${styles['auth-form-input']}`}
            {...register('firstName')}
            placeholder="Введіть ім'я"
            required
          />
          <label htmlFor="last-name">Прізвище *</label>
          <input
            type="text"
            id="last-name"
            className={`${styles['auth-form-input']}`}
            {...register('lastName')}
            placeholder="Введіть прізвище"
            required
          />
          <label htmlFor="user-name">Ім&apos;я користувача *</label>
          <input
            type="text"
            id="user-name"
            className={`${styles['auth-form-input']}`}
            {...register('userName', {
              minLength: {
                value: 3,
                message: 'Ім\'я користувача має бути не менше 3-ох символів',
              },
            })}
            placeholder="Введіть ім'я користувача"
            required
          />
          {!!errors && (
            <p className={styles['auth-form-error']}>{errors.userName?.message}</p>
          )}
          <label htmlFor="login">Логін *</label>
          <input
            type="text"
            id="login"
            className={`${styles['auth-form-input']}`}
            {...register('login', {
              pattern: {
                value: EmailRegexp,
                message: 'Incorrect email',
              },
            })}
            placeholder="Введіть електронну пошту"
            required
          />
          {!!errors && (
            <p className={styles['auth-form-error']}>{errors.login?.message}</p>
          )}
          <label htmlFor="paswword">Пароль *</label>
          <input
            type="password"
            id="password"
            className={`${styles['auth-form-input']}`}
            {...register('password', {
              pattern: {
                value: PasswordRegex,
                message: `Пароль має бути не менше 8 символів у довжину,
                містити одну велику і маленьку літери, хоча б одну цифру і спецсимволи`,
              },
            })}
            required
            placeholder="Введіть пароль"
          />
          {!!errors && (
            <p className={styles['auth-form-error']}>
              {errors.password?.message}
            </p>
          )}
          <label htmlFor="confirm-password">Підтвердити пароль *</label>
          <input
            type="password"
            id="confirm-password"
            className={`${styles['auth-form-input']}`}
            {...register('confirmPassword', {
              validate: (value) => {
                const { password } = getValues();

                return password === value || 'Passwords should match!';
              },
            })}
            required
            placeholder="Повторіть пароль"
          />
          {!!errors && (
            <p className={styles['auth-form-error']}>
              {errors.confirmPassword?.message}
            </p>
          )}
          <button type="submit" className={styles['auth-form-btn']}>
            Зареєструватись
          </button>
        </form>
        <div
          className={styles['to-sign-in']}
          onClick={() => navigate('/sign-in')}
          role="button"
          tabIndex={0}
        >
          <p>Уже маєте акаунт? Увійти</p>
          <br />
          <OAuth2 />
        </div>
      </div>
    </div>
  );
}

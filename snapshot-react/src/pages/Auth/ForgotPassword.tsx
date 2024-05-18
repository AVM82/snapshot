import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import EmailRegexp from '../../common/emailRegexp';
import { ISignIn } from '../../models/auth/ISignIn';
import styles from './AuthPage.module.scss';
import Input from './components/Input';

function ForgotPassword():React.JSX.Element {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<ISignIn>({ mode: 'onBlur' });

  const onSubmit:SubmitHandler<ISignIn> = () => {};

  return (
    <div className={styles.signContainer}>

      <form onSubmit={handleSubmit(onSubmit)}>
        <legend>
          <h2>Забули пароль?</h2>
          <p>
            Нема про що турбуватися, ми надішлемо вам повідомлення, щоб
            <br />
            допомогти вам скинути пароль.
          </p>
        </legend>
        <div>
          <div className={styles.formInputsContainer}>
            <Input
              inputName="Email"
              type="text"
              id="login"
              {...register('email', {
                pattern: {
                  value: EmailRegexp,
                  message: 'Неправильна адреса електронної пошти',
                },
                required: {
                  value: true,
                  message: 'Вкажіть ваш email',
                },
              })}
              placeholder="Введіть електронну адресу"
              error={errors.email?.message}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Надіслати посилання для скидання
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;

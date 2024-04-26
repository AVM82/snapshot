import React from 'react';
import { useForm } from 'react-hook-form';

import emailRegexp from '../../../../common/emailRegexp';
import styles from './InterviewScheduler.module.scss';

interface CustomProps {
  onClose:()=>void
}

type CombinedProps = CustomProps & React.HTMLProps<HTMLFormElement>;

function InterviewScheduler({ onClose, ...rest }:CombinedProps):React.JSX.Element {
  const { register, handleSubmit } = useForm();
  const handleOnsubmit = ():void => {
    console.log('Функцію handleOnsubmit було викликано');
  };

  return (
    <form
      name="bookInterview"
      className={styles.bookInterviewContainer}
      onSubmit={handleSubmit(handleOnsubmit)}
      {...rest}
      noValidate
    >
      <div>
        <label htmlFor="login" />
        <input
          type="text"
          id="login"
          {...register('email', {
            required: {
              value: true,
              message: 'Введіть логін шукача',
            },
            pattern: {
              value: emailRegexp,
              message: 'невірний формат',
            },
          })}
          placeholder='"Введіть електронну пошту"'
        />
      </div>

      <div>
        <label htmlFor="interviewTitle" />
        <input
          type="text"
          id="interviewTitle"
          {...register('interviewTitle', {
            required: {
              value: true,
              message: 'Введіть назву інтерв\'ю',
            },
          })}
          placeholder="Введіть назву"
        />
      </div>

      <div>
        <label htmlFor="date" />
        <input
          type="datetime-local"
          id="date"
          {...register('date', {
            required: {
              value: true,
              message: 'оберіть дату та час інтревью',
            },
          })}
        />
      </div>
      <button type="submit">
        Запланувати
      </button>

      <button
        type="button"
        onClick={onClose}
        className={styles.closeButton}
      >
        X
      </button>
    </form>

  );
}

export default InterviewScheduler;

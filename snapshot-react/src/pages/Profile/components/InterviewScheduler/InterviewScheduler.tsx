import React from 'react';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { INewInterview } from '../../../../models/profile/INewInterview';
import { addInterview, getUserByEmail } from '../../../../store/reducers/interwiew/actions';
import { getMyInterviews } from '../../../../store/reducers/profile/actions';
import styles from './InterviewScheduler.module.scss';

interface CustomProps {
  onClose:()=>void
}

type CombinedProps = CustomProps & React.HTMLProps<HTMLFormElement>;

function InterviewScheduler({ onClose, ...rest }:CombinedProps):React.JSX.Element {
  const { register, handleSubmit, watch } = useForm();
  const { searcher } = useAppSelector((state) => state.interview);
  const dispatch = useAppDispatch();
  const login = watch('login');
  const title = watch('title');
  const date = watch('date');

  const handleOnsubmit = async ():Promise<void> => {
    const formattedDateString = date.toLocaleString('en-US', { timeZone: 'UTC-0' });
    const formattedDate = new Date(formattedDateString);
    const addInterviewData:INewInterview = {
      status: 'PLANNED',
      plannedDateTime: formattedDate,
      searcherId: searcher.id,
      title,
    };
    await dispatch(addInterview(addInterviewData));
    dispatch(getMyInterviews());
    onClose();
  };
  const getSearcher = async ():Promise<void> => {
    dispatch(getUserByEmail(login));
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
          {...register('login', {
            required: {
              value: true,
              message: 'Введіть логін шукача',
            },
          })}
          onBlur={getSearcher}
          placeholder='"Введіть електронну пошту"'
        />
      </div>

      <div>
        <label htmlFor="title" />
        <input
          type="text"
          id="title"
          {...register('title', {
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

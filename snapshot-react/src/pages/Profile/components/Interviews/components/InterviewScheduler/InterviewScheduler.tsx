import React from 'react';
import {useForm} from 'react-hook-form';

import {useAppDispatch, useAppSelector} from '../../../../../../hooks/redux';
import {INewInterview} from '../../../../../../models/profile/INewInterview';
import {addInterview, getUserByEmail} from '../../../../../../store/reducers/interwiew/actions';
import styles from './InterviewScheduler.module.scss';

interface CustomProps {
  onClose: () => void;
}

type CombinedProps = CustomProps & React.HTMLProps<HTMLFormElement>;

function InterviewScheduler({
  onClose,
  ...rest
}: CombinedProps): React.JSX.Element {
  const { register, handleSubmit, watch } = useForm();
  const { searcher } = useAppSelector((state) => state.interview);
  const dispatch = useAppDispatch();
  const login = watch('login');
  const title = watch('title');
  const date = watch('date');

  const handleOnSubmit = async (): Promise<void> => {
    const formattedDateString = date.toLocaleString('en-US', {
      timeZone: 'UTC-0'
    });
    const formattedDate = new Date(formattedDateString);
    const addInterviewData: INewInterview = {
      status: 'PLANNED',
      plannedDateTime: formattedDate,
      searcherId: searcher.id,
      title
    };
    dispatch(addInterview(addInterviewData));
    onClose();
  };
  const getSearcher = async (): Promise<void> => {
    dispatch(getUserByEmail(login));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h2>Створити інтерв&apos;ю</h2>
        </div>
        <form
          className={styles.formBody}
          name="bookInterview"
          onSubmit={handleSubmit(handleOnSubmit)}
          {...rest}
          noValidate
        >
          <div>
            <label htmlFor="title">Назва співбесіди</label>
            <input
              type="text"
              id="title"
              {...register('title', {
                required: {
                  value: true,
                  message: 'Введіть назву інтерв&apos;ю'
                }
              })}
              placeholder="Введіть назву"
            />
          </div>
          <div>
            <label htmlFor="date">Дата та час</label>
            <input
              type="datetime-local"
              id="date"
              {...register('date', {
                required: {
                  value: true,
                  message: 'оберіть дату та час інтрев&apos;ю'
                }
              })}
            />
          </div>
          <div>
            <label htmlFor="login">Додати учасника</label>
            <input
              type="text"
              id="login"
              {...register('login', {
                // pattern: {
                //   value: EmailRegexp,
                //   message: 'Неправильна адреса електронної пошти',
                // },
                required: {
                  value: true,
                  message: 'Введіть логін шукача'
                }
              })}
              onBlur={getSearcher}
              placeholder='"Введіть електронну пошту"'
            />
          </div>
        </form>
        <div className={styles.formFooter}>
          <button className={styles.submitButton} type="submit">Створити співбесіду</button>
          <button className={styles.cancelButton} type="button" onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewScheduler;

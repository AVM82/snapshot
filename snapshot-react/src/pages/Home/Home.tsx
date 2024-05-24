// import { useNavigate } from 'react-router-dom';

// import { useAppDispatch } from '../../hooks/redux';
// import { deleteUser } from '../../store/reducers/user/userSlice';
import classNames from 'classnames';

import firstPagePicture from '../../assets/first-page-picture.svg';
import styles from './Home.module.scss';

function Home(): JSX.Element {
  // const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  return (
    <div className={styles.main_first_page}>
      <div className={styles.main_first_page_container}>
        <div className={styles.main_first_page_action_container}>
          <div className={styles.main_first_page_action}>

            <div className={styles.main_first_page_action_text}>
              Готові підготуватися до своєї наступної співбесіди?
            </div> 
            <button type="submit" className={classNames(styles.submitButton, styles.main_first_page_action_button)}>
              ПРАКТИКУВАТИ З КОЛЕГАМИ</button> 
          </div>
        </div>
        <div className={styles.main_first_page_image_container}>
          <img src={firstPagePicture} alt="First_page_picture" />
        </div>
       
        {/* <button type="button" onClick={() => navigate('/sign-in')}>To sign-in</button>
      <button type="button" onClick={() => navigate('/sign-up')}>To sign-up</button>
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          dispatch(deleteUser());
          navigate('/sign-in');
        }}
      >
        Вийти
      </button> */}
      </div>
      
    </div>
  );
}

export default Home;


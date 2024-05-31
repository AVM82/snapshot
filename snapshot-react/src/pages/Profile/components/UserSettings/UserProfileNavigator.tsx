// import { useEffect,useState } from 'react';
// import { useParams } from 'react-router-dom';

// import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
// import { InterviewStatuses } from '../../../../models/profile/IInterview';
// import IInterviewPreview from '../../../../models/profile/IInterviewPreview';
// import { getLowerSkills, getMyInterviews, getPortrait } from '../../../../store/reducers/profile/actions';
// import { getInterviewsByStatus } from '../../../../utils/notification/getTimeToInterview';
// import MyInterviews from '../Interviews/components/MyInterviews/MyInterviews';
// import InterviewStatusSelector from '../InterviewStatusSelector/InterviewStatusSelector';
import { useState } from 'react';

// import snapshotApi from '../../../../api/request';
// import { Criteria } from '../../../../models/candidateSearch/CandidateSearchProps';
// import ICandidateSearch from '../../../../models/candidateSearch/ICandidateSearch';
import SettingsChangePassword from './ChangePassword/SettingsChangePassword';
import SettingsDeleteAccount from './DeleteAccount/SettingsDeleteAccount';
import MenuComponent from './MenuComponent';
import UserSettingsNotification from './SettingsNotification/UserSettingsNotification';
import SkillCard from './SkillCard/SkillCard';
// import SkillSettings from './SkillSettings';
import UserInfoCard from './UserInfoCard/UserInfoCard';
// import UserInfoCard from './UserInfoCard';
import styles from './UserProfileNavigator.module.scss';

function UserProfileNavigator(): React.JSX.Element {
  // const dispatch = useAppDispatch();
  // const { userId } = useParams();
  // const [status, setStatus] = useState<InterviewStatuses>('PLANNED');
  // useEffect(() => {
  //   const fetchProfileData = async (): Promise<void> => {
  //     await dispatch(getMyInterviews());
  //     await dispatch(getLowerSkills(Number(userId)));
  //     await dispatch(getPortrait({ id: userId as string }));
  //   };

  //   (async ():Promise<void> => {
  //     await fetchProfileData();
  //   })();
  // }, [dispatch, userId]);
  // const handleChangeStatus=(newStatus: InterviewStatuses):void => {
  //   setStatus(newStatus as InterviewStatuses);
  // };

  // const interviews = useAppSelector((state) => state.profile.interviews);
  // const actualStatus: InterviewStatuses = status || '';
  // const actualInterviews:IInterviewPreview[] = actualStatus === '' ? interviews :
  //   getInterviewsByStatus(interviews, actualStatus);

  const [activeMenu, setActiveMenu] = useState('personal');

  const handleMenuClick = (menu: string):void => {
    setActiveMenu(menu);
  };

  // ----------------------------search skill
  // const [userPreviews, setUserPreviews] = useState<ICandidateSearch[]>();
  // const [formData, setFormData] = useState<Criteria[]>([]);

  // const handleSubmit = async (
  //   e: React.FormEvent<HTMLFormElement>
  // ): Promise<void> => {
  //   e.preventDefault();

  //   if (formData.length > 0) {
  //     const response: ICandidateSearch[] = await snapshotApi.post(
  //       'users/by-skills-and-grades',
  //       formData
  //     );

  //     if (response) setUserPreviews(response);
  //   }
  // };
  // -------------------------------------------

  return (
   
    <div className={styles.main_settings_container}>
      {/* <div> */}
      <MenuComponent onClick={handleMenuClick} activeMenu={activeMenu} />
      <div className={styles.content}>
        {activeMenu === 'personal' && (
          <div>
            {/* <h2>Персональні дані</h2> */}
            <UserInfoCard />
          </div>
        )}
        {activeMenu === 'skills' && (
          <div>
            {/* <h2>Мої навички</h2> */}
            <SkillCard />
            
            {/* <SkillSettings
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
            /> */}
          </div>
        )}
        {activeMenu === 'notifications' && (
          <div>
            <UserSettingsNotification />
            {/* <h2>Сповіщення</h2> */}
            {/* Тут можна додати компоненту для відображення сповіщень */}
          </div>
        )}
        {activeMenu === 'changePassword' && (
          <div>
            <SettingsChangePassword />
            {/* <h2>Змінити пароль</h2> */}
            {/* Тут можна додати компоненту для зміни паролю */}
          </div>
        )}
        {activeMenu === 'deleteAccount' && (
          <div>
            <SettingsDeleteAccount />
            {/* <h2>Видалити акаунт</h2> */}
            {/* Тут можна додати компоненту для видалення акаунту */}
          </div>
        )}
      </div>
      {/* </div> */}
      {/* <div>
            <InterviewStatusSelector onClick={handleChangeStatus} status={status}/>
          </div> */}
      {/* <div>
            <div>
              <button type="button" onClick={()=>setStatus('')}>
                <h5>всі співбесіди</h5>
              </button>
            </div>
            <MyInterviews interviews={actualInterviews}/>
          </div> */}
    </div>

  );
}

export default UserProfileNavigator;
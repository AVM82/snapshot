import { configureStore } from '@reduxjs/toolkit';

import accountSlice from './reducers/account/accountSlice';
import interactedUsersSlice from './reducers/interactedUsers/interactedUsersSlice';
import interviewSlice from './reducers/interwiew/interviewSlice';
import passwordSlice from './reducers/password/passwordSlice';
import profileMiddleware from './reducers/profile/profileMiddleware';
import profileSlice from './reducers/profile/profileSlice';
import userSkillsSlice from './reducers/skills/userSkillsSlice';
import userSlice from './reducers/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    userSkills: userSkillsSlice,
    interview: interviewSlice,
    profile: profileSlice,
    interactedUsers:interactedUsersSlice,
    password: passwordSlice,
    account: accountSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(profileMiddleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

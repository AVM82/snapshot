import { configureStore } from '@reduxjs/toolkit';

import interactedUsersSlice from './reducers/interactedUsers/interactedUsersSlice';
import interviewSlice from './reducers/interwiew/interviewSlice';
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
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(profileMiddleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

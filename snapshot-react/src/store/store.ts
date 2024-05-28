import { configureStore } from '@reduxjs/toolkit';

import interviewSlice from './reducers/interwiew/interviewSlice';
import socketMiddleware from './reducers/interwiew/socketMiddleware';
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

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(profileMiddleware,socketMiddleware()),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

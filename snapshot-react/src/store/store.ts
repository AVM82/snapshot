import { configureStore } from '@reduxjs/toolkit';

import interviewSlice from './reducers/interwiew/interviewSlice';
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
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

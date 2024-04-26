/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { configureStore } from '@reduxjs/toolkit';

import interviewSlice from './reducers/interwiew/interviewSlice';
import userSkillsSlice from './reducers/skills/userSkillsSlice';
import userReducer from './reducers/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    userSkills: userSkillsSlice,
    interview: interviewSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { configureStore } from '@reduxjs/toolkit';

import userReducer from './reducers/user/userSlice';
import userSkillsSlice from "./reducers/skills/userSkillsSlice.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userSkills:userSkillsSlice

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

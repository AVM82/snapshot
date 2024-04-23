/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../../models/user/IUser';
import getUser from './actions';

const initialState: IUser = {
  id: 0,
  usernmae: '',
  firstname: '',
  lastname: '',
  email: '',
  avatarImgUrl: '',
  description: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, { payload }: PayloadAction<IUser>) => {
      state = { ...payload };
    });
  },
});

export default userSlice.reducer;

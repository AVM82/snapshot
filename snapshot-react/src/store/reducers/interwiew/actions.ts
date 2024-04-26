import { createAsyncThunk } from '@reduxjs/toolkit';

import snapshotApi from '../../../api/request';
import { ISkills } from '../../../models/profile/ISkills';
import { IUser } from '../../../models/user/IUser';
import ActionType from './common';

const getUserByEmail = createAsyncThunk(
  ActionType.GET_USER_BY_EMAIL,
  async (email:string):Promise<IUser> => snapshotApi.post('users/by-email', { email }),
);

const getAllSkills = createAsyncThunk(
  ActionType.GET_ALL_SKILLS,
  async ():Promise<ISkills[]> => snapshotApi.get('skills/role/1'),
);

export { getAllSkills, getUserByEmail };

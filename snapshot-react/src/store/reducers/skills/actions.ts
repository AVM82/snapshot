import { createAsyncThunk } from '@reduxjs/toolkit';

import snapshotApi from '../../../api/request';
import { ISkills } from '../../../models/profile/ISkills';
import ActionType from './common';

const getRoleSkills = createAsyncThunk(
  ActionType.GET_ROLE_SKILLS,
  async (id:number):Promise<ISkills[]> => snapshotApi.get(`http://localhost:8080/skills/role/${id}`),
);
export default getRoleSkills;

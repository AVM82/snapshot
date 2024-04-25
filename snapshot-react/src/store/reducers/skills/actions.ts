import { createAsyncThunk } from '@reduxjs/toolkit';

import snapshotApi from '../../../api/request';
import { ISkills } from '../../../models/profile/ISkills';
import ActionType from './common';

const getAllSkills = createAsyncThunk(
  ActionType.GET_ALL_SKILLS,
  async (): Promise<ISkills[]> => snapshotApi.get('http://localhost:8080/skills/role/0'));
const getRoleSkills = createAsyncThunk(
  ActionType.GET_ROLE_SKILLS,
  async (id:string):Promise<ISkills[]> => snapshotApi.get(`http://localhost:8080/skills/role/${id}`),
);
export { getAllSkills, getRoleSkills };

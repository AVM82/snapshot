import { createAsyncThunk } from '@reduxjs/toolkit';

import snapshotApi from '../../../api/request';
import IQuestion from '../../../models/feedback/IQuestion';
import { IInterview } from '../../../models/profile/IInterview';
import { INewInterview } from '../../../models/profile/INewInterview';
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

const addQuestion = createAsyncThunk(
  ActionType.ADD_QUESTION_TO_SKILL,
  async (data:{
    interviewId: number,
    interviewerId: number,
    skillId: number,
    question:string
  }):Promise<IQuestion> => snapshotApi.post('/interviews/question', { ...data }),
);
const addInterview = createAsyncThunk(ActionType.Add_INTERVIEW, async (data:INewInterview):Promise<IInterview> => {
  const response :IInterview = snapshotApi.post('/interviews', { ...data });
  return response;
});
export {
  addInterview, addQuestion, getAllSkills, getUserByEmail,
};

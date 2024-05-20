import { createAsyncThunk } from '@reduxjs/toolkit';

import snapshotApi from '../../../api/request';
import { IInterview, InterviewStatuses } from '../../../models/profile/IInterview';
import { INewInterview } from '../../../models/profile/INewInterview';
import IQuestion from '../../../models/profile/IQuestion';
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

const addInterview = createAsyncThunk(
  ActionType.Add_INTERVIEW,
  async (data: INewInterview): Promise<IInterview> => snapshotApi.post('/interviews', { ...data }),
);
const updateInterviewStatus = createAsyncThunk(
  ActionType.CHANGE_INTERVIEW_STATUS,
  async ({ id, status }: { id: number, status: InterviewStatuses }):Promise<IInterview> => snapshotApi.patch(`/interviews/status/${id}?status=${status}`),
);
const getInterviewId = createAsyncThunk(
  ActionType.GET_INTERVIEW_ID,
  async (data:INewInterview):Promise<number> => {
    const response:IInterview = await snapshotApi.post('/interviews', { ...data });

    return response.id;
  },
);
const getSkillQuestions = createAsyncThunk(
  ActionType.GET_SKILL_QUESTIONS_BY_ID,
  async (skillId:number):Promise<IQuestion[]> => snapshotApi.get(`interviews/questions/skill/${skillId}?id=${skillId}`),
);

export {
  addInterview, addQuestion, getAllSkills, getInterviewId,
  getSkillQuestions,
  getUserByEmail,
  updateInterviewStatus,
};


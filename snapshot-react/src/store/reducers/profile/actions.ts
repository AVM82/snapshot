import { createAsyncThunk } from '@reduxjs/toolkit';

import snapshotApi from '../../../api/request';
import { IInterview } from '../../../models/profile/IInterview';
import IInterviewPreview from '../../../models/profile/IInterviewPreview';
import { IPortrait } from '../../../models/profile/IPortrait';
import IStatistics from '../../../models/profile/IStatistics';
import ActionType from './common';

type PatchQuestion = {
  id: number,
  interviewId: number,
  grade: string,
};

type PatchFeedBack = {
  interviewId: number,
  feedback: string,
};

type PatchedQuestion = {
  id: number,
  grade: string,
};

type GetStatistics = {
  id: number,
  from: string,
  to: string
};

const changeGrade = createAsyncThunk(
  ActionType.CHANGE_GRADE,
  async (data: PatchQuestion): Promise<PatchedQuestion> => {
    const response: PatchedQuestion = await snapshotApi.patch('/interviews/question/grade', data);

    return response;
  },
);

const changeFeedback = createAsyncThunk(
  ActionType.CHANGE_FEEDBACK,
  async (data: PatchFeedBack): Promise<{ feedback: string }> => {
    const response: { feedback: string } = await snapshotApi.patch(`/interviews/${data.interviewId}/feedback`, data);

    return response;
  },
);

const getMyInterviews = createAsyncThunk(
  ActionType.GET_MY_INTERVIEWS,
  async (): Promise<IInterviewPreview[]> => {
    const response: IInterviewPreview[] = await snapshotApi.get('/interviews');

    return response;
  },
);

const getInterviewById = createAsyncThunk(
  ActionType.GET_INTERVIEW_BY_ID,
  async (id: number): Promise<IInterview> => {
    const response: IInterview = await snapshotApi.get(`/interviews/${id}`);

    return response;
  },
);

const getLowerSkills = createAsyncThunk(
  ActionType.GET_LOWER_SKILLS,
  async (id: number): Promise<string[]> => {
    const response: string[] = await snapshotApi.get(`/skills/${id}`);

    return response;
  },
);

const getPortrait = createAsyncThunk(
  ActionType.GET_PORTRAIT,
  async (id: number): Promise<IPortrait[]> => {
    const response: IPortrait[] = await snapshotApi.get(`/users/portrait/${id}`);

    return response;
  },
);

const getStatistics = createAsyncThunk(
  ActionType.GET_STATISTICS,
  async ({ id, from, to }: GetStatistics): Promise<IStatistics[]> => {
    const response: IStatistics[] = await snapshotApi.get(`/users/statistic/${id}?from=${from}&to=${to}`);

    return response;
  },
);

export {
  changeFeedback, changeGrade, getInterviewById, getLowerSkills,
  getMyInterviews, getPortrait, getStatistics
};


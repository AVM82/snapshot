import { createAsyncThunk } from '@reduxjs/toolkit';

import snapshotApi from '../../../api/request';
import IInterviewPreview from '../../../models/profile/IInterviewPreview';
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

export { changeFeedback, changeGrade, getMyInterviews };


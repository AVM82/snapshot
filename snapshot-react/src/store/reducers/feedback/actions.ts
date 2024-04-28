import { createAsyncThunk } from '@reduxjs/toolkit';

import snapshotApi from '../../../api/request';
import IFeedback from '../../../models/feedback/IFeedback.';
import ActionType from './common';

const getFeedback = createAsyncThunk(ActionType.GET_FEEDBACK, async (): Promise<IFeedback> => {
  const response: IFeedback = await snapshotApi.get('/interviews/1/results');

  return response;
});

type PatchQuestion = {
  id: number,
  interviewId: number,
  grade: string,
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

export { changeGrade, getFeedback };


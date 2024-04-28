import { createAsyncThunk } from '@reduxjs/toolkit';

import snapshotApi from '../../../api/request';
import IFeedback from '../../../models/feedback/IFeedback.';
import ActionType from './common';

const getFeedback = createAsyncThunk(ActionType.GET_FEEDBACK, async (): Promise<IFeedback> => {
  const response: IFeedback = await snapshotApi.get('/interviews/1/results');

  return response;
});

export default getFeedback;

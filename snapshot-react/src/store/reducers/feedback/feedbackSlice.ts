/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import IFeedback from '../../../models/feedback/IFeedback.';
import getFeedback from './actions';

const initialState: IFeedback = {
  questions: [],
  feedback: '',
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getFeedback.fulfilled, (state, { payload }) => {
      state.questions = [...payload.questions];
      state.feedback = payload.feedback;
    });
  },
});

export default feedbackSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import IFeedback from '../../../models/feedback/IFeedback.';
import { changeGrade, getFeedback } from './actions';

const initialState: IFeedback = {
  questions: [],
  feedback: '',
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFeedback.fulfilled, (state, { payload }) => {
        state.questions = [...payload.questions];
        state.feedback = payload.feedback;
      })
      .addCase(changeGrade.fulfilled, (state, { payload }) => {
        state.questions.forEach((question) => {
          if (question.id === payload.id) {
            question.grade = payload.grade;
          }
        });
      });
  },
});

export default feedbackSlice.reducer;

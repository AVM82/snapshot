/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { IInterview } from '../../../models/profile/IInterview';
import IInterviewPreview from '../../../models/profile/IInterviewPreview';
import { changeFeedback, changeGrade, getMyInterviews } from './actions';

interface IProfile {
  interviews: IInterviewPreview[],
  interview: IInterview,
}

const initialState: IProfile = {
  interviews: [],
  interview: {
    id: 0,
    title: '',
    status: '',
    interviewer_id: 0,
    searcher_id: 0,
    planned_date_time: null,
    start_date_time: null,
    end_date_time: null,
    feedback: '',
    questions: [],
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyInterviews.fulfilled, (state, { payload }) => {
        state.interviews = payload;
      })
      .addCase(changeFeedback.fulfilled, (state, { payload }) => {
        state.interview.feedback = payload.feedback;
      })
      .addCase(changeGrade.fulfilled, (state, { payload }) => {
        state.interview.questions.forEach((question) => {
          if (question.id === payload.id) {
            question.grade = payload.grade;
          }
        });
      });
  },
});

export default profileSlice.reducer;

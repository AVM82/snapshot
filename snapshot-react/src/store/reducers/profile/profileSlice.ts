/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { IInterview } from '../../../models/profile/IInterview';
import IInterviewPreview from '../../../models/profile/IInterviewPreview';
import { IPortrait } from '../../../models/profile/IPortrait';
import buildInterviewPreview from '../../../utils/interview/buildInterviewPreview';
import { addInterview } from '../interwiew/actions';
import {
  changeFeedback, changeGrade, getInterviewById, getLowerSkills, getMyInterviews,
  getPortrait,
} from './actions';

interface IProfile {
  interviews: IInterviewPreview[],
  interview: IInterview,
  lowerSkills: string[],
  portrait: IPortrait[],
}

const initialState: IProfile = {
  interviews: [],
  interview: {
    id: 0,
    title: '',
    status: '',
    interviewer: {
      id: 0,
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      avatarImgUrl: '',
      description: '',
      roles: [],
    },
    searcher: {
      id: 0,
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      avatarImgUrl: '',
      description: '',
      roles: [],
    },
    plannedDateTime: null,
    startDateTime: null,
    endDateTime: null,
    feedback: '',
    questions: [],
  },
  lowerSkills: [],
  portrait: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyInterviews.fulfilled, (state, { payload }) => ({
        ...state,
        interviews: payload,
      }))
      .addCase(getInterviewById.fulfilled, (state, { payload }) => {
        state.interview = payload;
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
      })
      .addCase(getLowerSkills.fulfilled, (state, { payload }) => {
        state.lowerSkills = payload;
      })
      .addCase(getPortrait.fulfilled, (state, { payload }) => {
        state.portrait = payload;
      })
      .addCase(addInterview.fulfilled, (state, { payload }) => {
        const preview :IInterviewPreview = buildInterviewPreview(payload);
        state.interviews.push(preview);
      });
  },
});

export default profileSlice.reducer;

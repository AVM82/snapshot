import { createSlice } from '@reduxjs/toolkit';

import IQuestion from '../../../models/feedback/IQuestion';
import { IInterview } from '../../../models/profile/IInterview';
import { ISkills } from '../../../models/profile/ISkills';
import { IUser } from '../../../models/user/IUser';
import {
  calculateAndSortSharedSkills,
  flattenSkillsHierarchy,
} from '../../../utils/interview/calculateAndSortSharedSkills';
import getUser from '../user/actions';
import {
  addQuestion, getAllSkills, getInterviewData, getUserByEmail,
} from './actions';

const defaultUser:IUser = {
  id: 0,
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  avatarImgUrl: '',
  description: '',
  roles: [{
    id: 0,
    name: '',
    skills: [],
  }],
};

interface IInitialState extends IInterview {
  allSkills:ISkills[]
  sharedSkills:ISkills[]
  isLoading:boolean
  interviewer: IUser
  searcher:IUser
  lowLvlSkills:ISkills[]
  questions:IQuestion[]
}

const initialState:IInitialState = {
  id: 0,
  title: '',
  status: 'prepare',
  interviewer_id: 0,
  interviewer: { ...defaultUser },
  searcher_id: 0,
  searcher: { ...defaultUser },
  allSkills: [],
  sharedSkills: [],
  isLoading: false,
  planned_date_time: null,
  start_date_time: null,
  end_date_time: null,
  feedback: '',
  lowLvlSkills: [],
  questions: [],

};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getInterviewData.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }));
    builder.addCase(getUser.fulfilled, (state, action) => ({
      ...state,
      interviewer: action.payload,
      sharedSkills:
        calculateAndSortSharedSkills(state.lowLvlSkills, state.allSkills, action.payload.roles[0].skills)
      ,
    }));
    builder.addCase(getUserByEmail.fulfilled, (state, action) => ({
      ...state,
      searcher: action.payload,
      sharedSkills:
        calculateAndSortSharedSkills(
          state.lowLvlSkills,
          action.payload.roles[0].skills,
          state.interviewer.roles[0].skills,
        ),
    }));
    builder.addCase(getAllSkills.fulfilled, (state, action) => ({
      ...state,
      allSkills: action.payload,
      lowLvlSkills: flattenSkillsHierarchy(action.payload),
    }));
    builder.addCase(addQuestion.fulfilled, (state, action) => ({
      ...state,
      questions: [...state.questions, action.payload],
    }));
  },
});
export default interviewSlice.reducer;

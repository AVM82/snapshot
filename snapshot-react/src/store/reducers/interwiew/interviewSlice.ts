import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import IQuestion from '../../../models/feedback/IQuestion';
import { IInterview } from '../../../models/profile/IInterview';
import { ISkills } from '../../../models/profile/ISkills';
import { IRoles } from '../../../models/user/IRoles';
import { IUser } from '../../../models/user/IUser';
import {
  calculateAndSortSharedSkills,
  flattenSkillsHierarchy,
} from '../../../utils/interview/calculateAndSortSharedSkills';
import getUser from '../user/actions';
import {
  addInterview,
  addQuestion, getAllSkills, getUserByEmail,
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
    id: NaN,
    name: '',
    skills: [],
  }],
};

interface IInitialState extends IInterview {
  allSkills:ISkills[]
  sharedSkills:ISkills[]
  isLoading:boolean
  lowLvlSkills:ISkills[]
  questions:IQuestion[]
}

const initialState:IInitialState = {
  id: 0,
  title: '',
  status: 'PLANNED',
  interviewer: { ...defaultUser },
  searcher: { ...defaultUser },
  allSkills: [],
  sharedSkills: [],
  isLoading: false,
  plannedDateTime: null,
  startDateTime: null,
  endDateTime: null,
  feedback: '',
  lowLvlSkills: [],
  questions: [],
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    setTitle: (state, action:PayloadAction<string>) => ({
      ...state,
      title: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(addInterview.fulfilled, (state, action) => {
      const searcherSkills = action.payload.searcher.roles.filter((roles) => roles.id === 1)[0].skills;
      const interviewSkills = action.payload.interviewer.roles.filter((roles:IRoles) => roles.id === 2)[0].skills;

      return {
        ...state,
        ...action.payload,
        sharedSkills:
          calculateAndSortSharedSkills(
            state.lowLvlSkills,
            searcherSkills,
            interviewSkills,
          ),
      };
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      const interviewSkills:ISkills[] = action.payload.roles.filter((roles:IRoles) => roles.id === 2)[0].skills;

      return {
        ...state,
        interviewer: action.payload,
        sharedSkills:
        calculateAndSortSharedSkills(state.lowLvlSkills, state.allSkills, interviewSkills)
        ,
      };
    });
    builder.addCase(getUserByEmail.fulfilled, (state, action) => ({
      ...state,
      searcher_id: action.payload.id,
      searcher: action.payload,
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
export const { setTitle } = interviewSlice.actions;

export default interviewSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import IQuestion from '../../../models/feedback/IQuestion';
import { IInterview } from '../../../models/profile/IInterview';
import { ISkills } from '../../../models/profile/ISkills';
import { IRoles, RolesTypes } from '../../../models/user/IRoles';
import { IUser } from '../../../models/user/IUser';
import {
  calculateAndSortSharedSkills,
  flattenSkillsHierarchy,
} from '../../../utils/interview/calculateAndSortSharedSkills';
import { getInterviewById } from '../profile/actions';
import getUser from '../user/actions';
import {
  addQuestion, getAllSkills, getInterviewId, getSkillQuestions, getUserByEmail, updateInterviewStatus,
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
  currentProfileRole: RolesTypes
  allSkills:ISkills[]
  sharedSkills:ISkills[]
  isLoading:boolean
  lowLvlSkills:ISkills[]
  questions:IQuestion[]
  currentSkillQuestions:IQuestion[]
}

const initialState:IInitialState = {
  id: 0,
  currentProfileRole: '',
  title: '',
  status: '',
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
  currentSkillQuestions: [],
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    resetInterviewState: () => initialState,
    setTitle: (state, action:PayloadAction<string>) => ({
      ...state,
      title: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getInterviewId.fulfilled, (state, action) => ({
      ...state,
      id: action.payload,
    }));
    builder.addCase(getUser.fulfilled, (state, action) => {
      const { roles } = action.payload;

      if (roles.find((role) => role.id === 2)) {
        const interviewSkills:ISkills[] = action.payload.roles.filter((role:IRoles) => role.id === 2)[0].skills;

        return {
          ...state,
          currentProfileRole: 'INTERVIEWER',
          interviewer: action.payload,
          sharedSkills:
            calculateAndSortSharedSkills(state.lowLvlSkills, state.allSkills, interviewSkills),
        };
      }

      return {
        ...state,
        currentProfileRole: roles[0].name,
        sharedSkills: flattenSkillsHierarchy(roles[0].skills),
      };
    });
    builder.addCase(getUserByEmail.fulfilled, (state, action) => {
      const searcherSkills = action.payload.roles.filter((roles:IRoles) => roles.id === 1)[0].skills;
      const interviewSkills = state.interviewer.roles.filter((roles:IRoles) => roles.id === 2)[0].skills;

      return {
        ...state,
        searcher_id: action.payload.id,
        searcher: action.payload,
        sharedSkills:
        calculateAndSortSharedSkills(
          state.lowLvlSkills,
          searcherSkills,
          interviewSkills,
        ),
      };
    });
    builder.addCase(getAllSkills.fulfilled, (state, action) => {
      const lowLvlSkills:ISkills[] = flattenSkillsHierarchy(action.payload);
      const interviewSkills:ISkills[] = state.interviewer.roles.filter((roles:IRoles) => roles.id === 2)[0].skills;

      return {
        ...state,
        allSkills: action.payload,
        lowLvlSkills: flattenSkillsHierarchy(action.payload),
        sharedSkills:
          calculateAndSortSharedSkills(lowLvlSkills, action.payload, interviewSkills),
      };
    });
    builder.addCase(addQuestion.fulfilled, (state, action) => ({
      ...state,
      questions: [...state.questions, action.payload],
    }));
    builder.addCase(updateInterviewStatus.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }));
    builder.addCase(getSkillQuestions.fulfilled, (state, action) => ({
      ...state,
      currentSkillQuestions: action.payload,
    }));
    builder.addCase(getInterviewById.fulfilled, (state, action) => {
      const searcherSkills = action.payload.searcher.roles.filter((roles:IRoles) => roles.id === 1)[0].skills;
      const interviewSkills = action.payload.interviewer.roles.filter((roles:IRoles) => roles.id === 2)[0].skills;
      const lowLvlSkills = flattenSkillsHierarchy(state.allSkills);

      const sharedSkills = calculateAndSortSharedSkills(
        lowLvlSkills,
        searcherSkills,
        interviewSkills,
      );

      return {
        ...state,
        ...action.payload,
        sharedSkills,
      };
    });
  },
});
export const { setTitle, resetInterviewState } = interviewSlice.actions;

export default interviewSlice.reducer;

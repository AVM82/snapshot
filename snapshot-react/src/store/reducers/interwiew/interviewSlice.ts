import { createSlice } from '@reduxjs/toolkit';

import { ISkills } from '../../../models/profile/ISkills';
import { IUser } from '../../../models/user/IUser';
import getUser from '../user/actions';
import { getAllSkills, getUserByEmail } from './actions';

interface IInitialState {
  id: string
  allSkills:ISkills[]
  allLowLvlSkills:ISkills[]
  userSkills:ISkills[]
  sharedSkills:ISkills[]
  isLoading:boolean
  currentUser: IUser
  interviewee:IUser
  intervieweeSkills: ISkills[]
}

const initialState:IInitialState = {
  id: '0',
  allSkills: [],
  userSkills: [],
  sharedSkills: [],
  allLowLvlSkills: [],
  isLoading: false,
  currentUser: {
    id: 0,
    usernmae: '',
    firstname: '',
    lastname: '',
    email: '',
    avatarImgUrl: '',
    description: '',
  },
  interviewee: {
    id: 0,
    usernmae: '',
    firstname: '',
    lastname: '',
    email: '',
    avatarImgUrl: '',
    description: '',
  },
  intervieweeSkills: [],
};

const getLowLvlSkills = (skills:ISkills[]):
ISkills[] => {
  function getLowLevelSkills(skill: ISkills): ISkills[] {
    if (skill.children.length === 0) {
      return [skill];
    }

    return skill.children.flatMap((child) => getLowLevelSkills(child));
  }

  const lowLevelSkills: ISkills[] = [];
  skills.forEach((skill) => {
    const lowLevelSkill = getLowLevelSkills(skill);
    lowLevelSkills.push(...lowLevelSkill);
  });

  return lowLevelSkills;
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => ({
      ...state,
      currentUser: action.payload,
    }));
    builder.addCase(getUserByEmail.fulfilled, (state, action) => ({
      ...state,
      interviewee: action.payload,
    }));
    builder.addCase(getAllSkills.fulfilled, (state, action) => ({
      ...state,
      allSkills: action.payload,
      allLowLvlSkills: getLowLvlSkills(action.payload),
    }));
  },
});

export default interviewSlice.reducer;

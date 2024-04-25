import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISkills } from '../../../models/profile/ISkills';
import { getAllSkills, getRoleSkills } from './actions';

interface IInitialState {
  id: number,
  allSkills: ISkills[]
  filteredByInputSkills: ISkills[]
  allLowLevelSkills: ISkills[]
  isLoading:boolean
}

const initialState: IInitialState = {
  id: 0, allSkills: [], allLowLevelSkills: [], isLoading: false, filteredByInputSkills: [],
};

const handleFulfilledGetSkills = (state: IInitialState, action: PayloadAction<ISkills[]>):IInitialState => {
  const allSkills = action.payload;

  function getLowLevelSkills(skill: ISkills): ISkills[] {
    if (skill.children.length === 0) {
      return [skill];
    }

    return skill.children.flatMap((child) => getLowLevelSkills(child));
  }

  const allLowLevelSkills: ISkills[] = [];
  allSkills.forEach((skill) => {
    const lowLevelSkills = getLowLevelSkills(skill);
    allLowLevelSkills.push(...lowLevelSkills);
  });

  return {
    ...state,
    isLoading: true,
    allSkills,
    allLowLevelSkills,
  };
};
const userSkillsSlice = createSlice({
  name: 'addUserSkills',
  initialState,
  reducers: {
    getFilterSkillsByInput: (state, action:PayloadAction<string>) => {
      const filteredSkills = state.allLowLevelSkills.filter((skill: ISkills) => skill
        .name.toLowerCase().includes(action.payload.toLowerCase()));

      return {
        ...state,
        filteredByInputSkills: filteredSkills,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSkills.fulfilled, (state, action) => handleFulfilledGetSkills(state, action));

    builder.addCase(getRoleSkills.fulfilled, (state, action) => handleFulfilledGetSkills(state, action));
  },
});
export const { getFilterSkillsByInput } = userSkillsSlice.actions;
export default userSkillsSlice.reducer;

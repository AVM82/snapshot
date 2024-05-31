import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import deleteAccount from './actions';

interface AccountState {
  error: string | null;
  success: boolean;
}

const initialState: AccountState = {
  error: null,
  success: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearState: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteAccount.fulfilled, (state) => {
      state.success = true;
      state.error = null;
    });
    builder.addCase(deleteAccount.rejected, (state, action: PayloadAction<string>) => {
      state.success = false;
      state.error = action.payload;
    });
  },
});

export const { clearState } = accountSlice.actions;
export default accountSlice.reducer;


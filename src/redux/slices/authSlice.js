import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    set: (state, action) => {
      state = { ...state, ...action.payload };
    },
    reset: () => {
      state = {};
    },
  },
});

export const { set, reset } = authSlice.actions;

export default authSlice.reducer;

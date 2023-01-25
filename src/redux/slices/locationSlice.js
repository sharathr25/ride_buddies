import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: [],
  reducers: {
    set: (_, action) => action.payload,
    reset: () => [],
  },
});

export const { set, reset } = locationSlice.actions;

export const selectLocation = (state) => state.location;

export default locationSlice.reducer;

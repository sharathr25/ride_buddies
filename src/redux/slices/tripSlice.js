import { createSlice } from '@reduxjs/toolkit';

const tripSlice = createSlice({
  name: 'trip',
  initialState: {},
  reducers: {
    set: (state, action) => ({ ...state, ...action.payload }),
    reset: () => {},
  },
});

export const { set, reset } = tripSlice.actions;

export const selectTrip = (state) => state.trip;

export const selectRiders = (state) => state.trip?.riders || [];

export const selectExpenses = (state) => state.trip?.expenses || [];

export const selectEvents = (state) => state.trip?.events || [];

export default tripSlice.reducer;

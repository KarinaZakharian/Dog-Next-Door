import { createAction, createReducer } from '@reduxjs/toolkit';

import axios from 'axios';

interface HomeState {
  animal: string | null;
  city: string | null;
  date: string | null;
  size: string | null;
  radius: string | null;
}
export const initialState: HomeState = {
  animal: '',
  city: '',
  date: '',
  size: '',
  radius: '',
};
export const addData = createAction<HomeState>('state/add-data');
const homeReducer = createReducer(initialState, (builder) => {
  builder.addCase(addData, (state, action) => {
    // je traduis mon action
    state.animal = action.payload.animal;
    state.city = action.payload.city;
    state.date = action.payload.date;
    state.size = action.payload.size;
    state.radius = action.payload.radius;
    console.log(action.payload);
  });
});

export default homeReducer;

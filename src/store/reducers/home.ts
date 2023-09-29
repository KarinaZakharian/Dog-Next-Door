/* eslint-disable prettier/prettier */
import { createAction, createReducer } from '@reduxjs/toolkit';

import axios from 'axios';

interface HomeState {
  animal: string | null;
  city: string | null;
  date: string | null;
  size: string | null;
}
export const initialState: HomeState = {
  animal: '',
  city: '',
  date: '',
  size: '',
};
export const addData = createAction<HomeState>('state/add-data');
const homeReducer = createReducer(initialState, (builder) => {
  builder.addCase(addData, (state, action) => {
    // je traduis mon action
    state.animal = action.payload.animal;
    state.city = action.payload.city;
    state.date = action.payload.date;
    state.size = action.payload.size;
    console.log(action.payload);
    // j'efface mon input
    // state.currentMessage = '';
  });
});

export default homeReducer;

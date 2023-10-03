import { createAction, createReducer } from '@reduxjs/toolkit';

import axios from 'axios';

interface SearchState {
  animal: string | null;
  city: string | null;
  date: string | null;
  size: string | null;
}
export const initialState: SearchState = {
  animal: '',
  city: '',
  date: '',
  size: '',
};
export const search = createAction<SearchState>('state/add-data');
const searchReducer = createReducer(initialState, (builder) => {
  builder.addCase(search, (state, action) => {
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

export default searchReducer;

import { createAction, createReducer } from '@reduxjs/toolkit';

import axios from 'axios';

interface HomeState {
  animal: string | null;
  user_address: string | null;
  disponibility_date: string | null;
  size: string | null;
  radius: string | null;
  longitude: string | null;
  latitude: string | null;
}
export const initialState: HomeState = {
  animal: '',
  user_address: '',
  disponibility_date: '',
  size: '',
  radius: '',
  longitude: '',
  latitude: '',
};
export const addData = createAction<HomeState>('state/add-data');
const homeReducer = createReducer(initialState, (builder) => {
  builder.addCase(addData, (state, action) => {
    // je traduis mon action
    state.animal = action.payload.animal;
    state.user_address = action.payload.user_address;
    state.disponibility_date = action.payload.disponibility_date;
    state.size = action.payload.size;
    state.radius = action.payload.radius;
    state.longitude = action.payload.latitude;
    state.latitude = action.payload.longitude;
    console.log(action);
  });
});

export default homeReducer;

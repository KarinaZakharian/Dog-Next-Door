import { createAction, createReducer } from '@reduxjs/toolkit';
import { HomeState } from '../../@types/user';

// Define the initial state of the Home state
export const initialState: HomeState = {
  animal: null,
  user_address: null,
  disponibility_date: null,
  size: null,
  radius: null,
  longitude: null,
  latitude: null,
};

// Create an action to add data to the Home state
export const addData = createAction<HomeState>('state/add-data');
// Define the homeReducer to handle the Home state
const homeReducer = createReducer(initialState, (builder) => {
  builder.addCase(addData, (state, action) => {
    // Update the state with data from the action
    state.animal = action.payload.animal;
    state.user_address = action.payload.user_address;
    state.disponibility_date = action.payload.disponibility_date;
    state.size = action.payload.size;
    state.radius = action.payload.radius;
    state.longitude = action.payload.longitude;
    state.latitude = action.payload.latitude;
  });
});

export default homeReducer;

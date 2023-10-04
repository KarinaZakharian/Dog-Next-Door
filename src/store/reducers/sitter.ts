import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axios, { AxiosError } from 'axios';

import axiosInstance from '../../utils/axios';

interface ValidationErrors {
  errorMessage: string
  field_errors: Record<string, string>
}

interface User {
  firstname: string;
  lastname: string;
  user_address: string;
}

interface SitterState {  
  user: User | null;
  error: string | undefined;
  message: string | null;

}
export const initialState: SitterState = {
  user: null,
  error: undefined,
  message: null,
 
};



// Create an async thunk for fetching user information by ID
export const fetchUserById = createAsyncThunk<
any, // type de la valeur retourné //  TODO
number, // type de userID // paramètre du callback
{
  rejectValue: string
}
>(
  'user/fetchById',
  async (userId, thunkAPI) => {
    console.log("reduser userId"+ userId)
    try {
      const response = await axiosInstance.get(`petsitter/${userId}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      if (typeof error === 'string') {
        return thunkAPI.rejectWithValue(error);
      }

      console.error(error);

      // à conserver au cas où
      // let error = err as AxiosError<ValidationErrors> // cast the error for access
      // if (!error.response) {
      //   throw err
      // }
      // // We got validation errors, let's return those so we can reference in our component and set form errors
      // return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create a success action
export const fetchUserSuccess = createAction('user/fetchSuccess');

// Create the user reducer
const sitterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUserById.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload
      } else {
        state.error = action.error.message
      }

      // state.error = action.payload.response.data;
      state.message = null;
    })
    .addCase(fetchUserById.fulfilled, (state, action) => {
      console.log('fulffilled');
      console.log(action);
      state.error = undefined;
      state.message = 'User fetched successfully'; // You can customize this message
      state.user = action.payload;
    })
    .addCase(fetchUserSuccess, (state) => {
      state.error = undefined;
      state.message = null;
    })
    
});

export default sitterReducer;
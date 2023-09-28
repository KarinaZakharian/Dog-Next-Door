/* eslint-disable prettier/prettier */
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import axios from 'axios';

interface SignupState {
  firstname: string | null;
  error: unknown;
}
export const initialState: SignupState = {
  firstname: null,
  error: null,
};

export const signup = createAsyncThunk(
  'user/signup',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
try{

  const { data } = await axios.post(
    'http://localhost:3000/subscribe',
    objData
  );
  return data as { firstname: string };
  console.log('data dans middleware', data);
}
 catch (error) {
  return thunkAPI.rejectWithValue(error);
}
  }
);
const signupReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(signup.rejected, (state, action) => {
    console.log('action rejected', action);
      state.error = action.payload.response.data.message;
  })
  .addCase(signup.fulfilled, (state, action) => {
    // state.logged = true;
    console.log('action fulfilled', action);
    state.firstname = action.payload.firstname;
    state.error = null;
  

    // state.token = action.payload.token;
  })
});

export default signupReducer;

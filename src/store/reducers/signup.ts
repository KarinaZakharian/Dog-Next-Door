import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface SignupState {
  message: string | null;
  error: unknown;
}
export const initialState: SignupState = {
  message: null,
  error: null,
};

export const signup = createAsyncThunk(
  'user/signup',
  async (formData: FormData, thunkAPI) => {
    try {
      const objData = Object.fromEntries(formData.entries());
      const { data } = await axiosInstance.post('/subscribe', objData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const success = createAction('signup/success ');

const signupReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(signup.rejected, (state, action) => {
      console.log(action.payload);
      state.error = action.payload.response.data;
      //state.error = action.payload;
      state.message = null;
    })
    .addCase(signup.fulfilled, (state, action) => {
      console.log(action.payload);
      state.error = null;
      state.message = action.payload;
    })
    .addCase(success, (state) => {
      state.error = null;
      state.message = null;
    });
});

export default signupReducer;

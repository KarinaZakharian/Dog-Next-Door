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
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData.entries());
    const { data } = await axiosInstance.post('/subscribe', objData);
    return data;
  }
);

export const success = createAction('signup/success ');

const signupReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(signup.rejected, (state, action) => {
      state.error = action.payload;
      state.message = null;
    })
    .addCase(signup.fulfilled, (state, action) => {
      state.error = null;
      state.message = action.payload.data;
    })
    .addCase(success, (state) => {
      state.error = null;
      state.message = null;
    });
});

export default signupReducer;

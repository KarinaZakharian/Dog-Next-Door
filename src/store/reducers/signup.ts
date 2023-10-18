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

export const signup = createAsyncThunk<
  any, // type de la valeur retourné //  TODO
  FormData, // type de formData // paramètre du callback
  {
    rejectValue: string;
  }
>('user/signup', async (formData: FormData, thunkAPI) => {
  const objData = Object.fromEntries(formData);
  try {
    const data = await axiosInstance.post('/subscribe', objData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

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

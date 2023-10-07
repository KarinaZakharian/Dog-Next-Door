import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';

import axios from 'axios';
import axiosInstance from '../../utils/axios';

interface ProfilState {
  message: string | null;
  error: unknown;
  myMessage: string | null;
  myError: unknown;
}
export const initialState: ProfilState = {
  message: null,
  error: null,
  myError: null,
  myMessage: null,
};

export const fillProfilForm = createAsyncThunk(
  'user/form',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const { data } = await axiosInstance.patch('/account/form', objData);
      return data as {
        message: string;
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateSignupForm = createAsyncThunk(
  'signupform/update',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const { data } = await axiosInstance.patch('/account/form2', objData);
      return data as {
        myMessage: string;
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const success = createAction('form/success ');

const profilFormReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillProfilForm.rejected, (state, action) => {
      console.log('action rejected', action);
      state.error = action.payload.response.data.message;
      state.message = null;
    })
    .addCase(fillProfilForm.fulfilled, (state, action) => {
      // state.logged = true;
      console.log('action fulfilled', action);
      // state.firstname = action.payload.firstname;
      state.error = null;
      state.message = action.payload;

      // state.token = action.payload.token;
    })
    .addCase(updateSignupForm.rejected, (state, action) => {
      console.log('action rejected', action);
      state.myError = action.payload.response.data.message;
      state.myMessage = null;
    })
    .addCase(updateSignupForm.fulfilled, (state, action) => {
      // state.logged = true;
      console.log('action fulfilled', action);
      // state.firstname = action.payload.firstname;
      state.myError = null;
      state.myMessage = action.payload;

      // state.token = action.payload.token;
    })
    .addCase(success, (state) => {
      state.error = null;
      state.message = null;
      state.myError = null;
      state.myMessage = null;
    });
});

export default profilFormReducer;

/* eslint-disable prettier/prettier */
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
  description: string;
  accommodation: string;
  garden: string;
  additionalOptions: string[];
  size: string[];
}
export const initialState: ProfilState = {
  message: null,
  error: null,
  description: '',
  accommodation: '',
  garden: '',
  additionalOptions: [],
  size: [],
};

export const fillProfilForm = createAsyncThunk(
  'user/form',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const { data } = await axios.post(
        'http://localhost:3000/account',
        objData
      );
      return data as {
        description: string;
        accommodation: string;
        garden: string;
        additionalOptions: string[];
        size: string[];
        message: string;
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
      state.message = action.payload.message;
      state.description = action.payload.accommodation;
      state.garden = action.payload.garden;
      state.size = action.payload.size;
      state.additionalOptions = action.payload.additionalOptions;

      // state.token = action.payload.token;
    })
    .addCase(success, (state) => {
      state.error = null;
      state.message = null;
    });
});

export default profilFormReducer;

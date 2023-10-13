/* eslint-disable prettier/prettier */
import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';

import axios from 'axios';
import axiosInstance from '../../utils/axios';

interface BookingState {
  message: string | null;
  error: unknown;
}
export const initialState: BookingState = {
  message: null,
  error: null,
};

export const fillBookingForm = createAsyncThunk(
  'booking/form',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    console.log(objData)
    try {
      const data = await axiosInstance.post(`/petsitter/${objData.id}/booking`, objData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const success = createAction('form/success ');

const bookingFormReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillBookingForm.rejected, (state, action) => {
      console.log('action rejected', action);
      state.error = action.payload.response.data.message;
      state.message = null;
    })
    .addCase(fillBookingForm.fulfilled, (state, action) => {
      // state.logged = true;
      console.log('action fulfilled', action);
      // state.firstname = action.payload.firstname;
      state.error = null;
      state.message = action.payload.data.message;

      // state.token = action.payload.token;
    })
    .addCase(success, (state) => {
      state.error = null;
      state.message = null;
    });
});

export default bookingFormReducer;

import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';

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
    try {
      const data = await axiosInstance.post(
        `/petsitter/${objData.petsitterId}/booking`,
        objData
      );
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
      console.log(action.payload)
      if (action.payload) {
        state.error = action.payload.response.data.message;
      }
      state.message = null;
    })
    .addCase(fillBookingForm.fulfilled, (state, action) => {
      state.error = null;
      state.message = action.payload.data.message;
    })
    .addCase(success, (state) => {
      state.error = null;
      state.message = null;
    });
});

export default bookingFormReducer;

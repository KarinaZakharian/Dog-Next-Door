import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface User {
  firstname: string;
  lastname: string;
  booking: {
    start_date: string;
    end_date: string;
    booking_status: string;
  };
  message: string;
}

interface InboxState {
  user: User[] | null;
  error: string | undefined;
  message: string | null;
}
export const initialState: InboxState = {
  user: null,
  error: undefined,
  message: null,
};

export const fetchStatus = createAsyncThunk<User, void>(
  'inbox/status',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/inbox/demands`);
      return response.data;
    } catch (error) {
      if (typeof error === 'string') {
        return thunkAPI.rejectWithValue(error);
      }
      throw error; // You should throw the error to maintain the rejected state
    }
  }
);

// Create the  reducer
const demandsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchStatus.rejected, (state, action) => {
      if (action.payload === 'string') {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }
      state.message = null;
    })
    .addCase(fetchStatus.fulfilled, (state, action) => {
      state.error = undefined;
      state.message = action.payload.message; // You can customize this message
      state.user = action.payload;
    });
});

export default demandsReducer;

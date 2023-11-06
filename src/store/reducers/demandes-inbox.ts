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
}

interface InboxState {
  user: User[] | [];
  error: string | undefined;
}
export const initialState: InboxState = {
  user: [],
  error: undefined,
};

export const fetchStatus = createAsyncThunk<User, void>(
  'inbox/status',
  async () => {
    const response = await axiosInstance.get(`/inbox/demands`);
    return response.data;
  }
);

// Create the  reducer
const demandsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchStatus.pending, (state, action) => {
      state.user = [];
    })
    .addCase(fetchStatus.fulfilled, (state, action) => {
      state.error = undefined;
      state.user = action.payload;
    });
});

export default demandsReducer;

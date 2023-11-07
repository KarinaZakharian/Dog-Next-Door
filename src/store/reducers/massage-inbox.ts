import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface Card {
  firstname: string;
  lastname: string;
  start_date: string;
  end_date: string;
  id: string;
}

interface InboxState {
  user: Card[] | [];
  error: string | null;
  message: string | null;
}
export const initialState: InboxState = {
  user: [],
  error: null,
  message: null,
};

export const fetchMessageUser = createAsyncThunk(
  'inbox/fetchmessageuser',
  async () => {
    const response = await axiosInstance.get(`/inbox/uppast`);
    return response.data;
  }
);

// Create the user reducer
const messageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchMessageUser.pending, (state, action) => {
      state.error = null;
      state.message = null;
      state.user = [];
    })
    .addCase(fetchMessageUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.error = null;
      state.message = action.payload; // You can customize this message
      state.user = action.payload;
    });
});

export default messageReducer;

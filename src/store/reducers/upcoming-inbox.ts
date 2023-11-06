import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface Card {
  type: 'cat' | 'dog';
  name: string;
  start_date: string;
  end_date: string;
  clientId: string;
}

interface InboxState {
  user: Card[] | [];
  error: string | undefined;
}
export const initialState: InboxState = {
  user: [],
  error: undefined,
};

export const fetchUpcomingAnimal = createAsyncThunk<Card, void>(
  'inbox/upcominganimal',
  async () => {
    const response = await axiosInstance.get(`/inbox/upcoming`);
    return response.data;
  }
);

// Create the  reducer
const upcomingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUpcomingAnimal.pending, (state, action) => {
      state.user = [];
    })
    .addCase(fetchUpcomingAnimal.fulfilled, (state, action) => {
      console.log(action.payload);
      state.error = undefined;
      state.user = action.payload;
    });
});

export default upcomingReducer;

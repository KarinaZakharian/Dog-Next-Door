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
  user: Card[] | null;
  error: string | undefined;
  message: string | null;
}
export const initialState: InboxState = {
  user: null,
  error: undefined,
  message: null,
};

export const fetchUpcomingAnimal = createAsyncThunk<Card, void>(
  'inbox/upcominganimal',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/inbox/upcoming`);
      return response.data;
    } catch (error) {
      if (typeof error === 'string') {
        return thunkAPI.rejectWithValue(error);
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create the  reducer
const upcomingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUpcomingAnimal.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }
      // state.error = action.payload.response.data;
      state.message = null;
    })
    .addCase(fetchUpcomingAnimal.fulfilled, (state, action) => {
      state.error = undefined;
      state.message = action.payload.message; // You can customize this message
      state.user = action.payload;
    });
});

export default upcomingReducer;

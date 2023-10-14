import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface User {
  firstname: string  ;
  lastname: string  ;
  start_date: string ;
  end_date : string;
  status: string  ;
}

interface InboxState {
  user: User | null;
  error: string | undefined;
  message: string | null;
}
export const initialState: InboxState = {
  user: null,
  error: undefined,
  message: null,
};

export const fetchStatus = createAsyncThunk<{
  rejecValue: string;
}>('inbox/status', async (thunkAPI) => {
  try {
    const response = await axiosInstance.get(`/inbox/demands`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (typeof error === 'string') {
      return thunkAPI.rejectWithValue(error);
    }
    console.error(error);
  }
});

// Create the  reducer
const demandsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchStatus.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }
      // state.error = action.payload.response.data;
      state.message = null;
    })
    .addCase(fetchStatus.fulfilled, (state, action) => {
      console.log('fulffilled');
      console.log(action);
      state.error = undefined;
      state.message = action.payload.message; // You can customize this message
      state.user = action.payload;
    });
});

export default demandsReducer;

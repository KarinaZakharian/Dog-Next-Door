import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface SearchState {
  users: string[];
  error: string | null;
  message: string | null;
}
export const initialState: SearchState = {
  users: [],
  error: null,
  message: null,
};

export const searchThunk = createAsyncThunk(
  'user/search',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const data = await axiosInstance.post('/search', objData);
      return data; // Return the data in case of success
    } catch (error) {
      if (typeof error === 'string') {
        return thunkAPI.rejectWithValue(error); // Return the error message in case of an error
      }
      throw error; // Throw the error to maintain the rejected state
    }
  }
);

const searchReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(searchThunk.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }
      state.message = null;
    })

    .addCase(searchThunk.fulfilled, (state, action) => {
      state.error = null;
      state.message = action.payload.data;
      state.users = action.payload.data;
    });
});

export default searchReducer;

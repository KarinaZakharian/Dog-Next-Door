import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface SearchState {
  users: string[];
  error: string | null;
  message: string | null;
}
export const initialState: SearchState = {
  users: [],
  error: '',
  message: '',
};

export const searchThunk = createAsyncThunk(
  'user/search',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const data = await axiosInstance.post('/search', objData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const searchReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(searchThunk.rejected, (state, action) => {
      state.error = action.payload.response.data;
      state.message = null;
    })

    .addCase(searchThunk.fulfilled, (state, action) => {
      state.error = null;
      state.message = action.payload.data;
      state.users = action.payload.data;
    });
});

export default searchReducer;

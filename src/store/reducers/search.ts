import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface SearchState {
  users: string[];
  error: string | null;
  message: string | null;
  centerCoordinates: {
    latitude: number;
    longitude: number;
  };
}

const initialState: SearchState = {
  users: [],
  error: null,
  message: null,
  centerCoordinates: {
    latitude: 48.866667,
    longitude: 2.333333,
  },
};

export const searchThunk = createAsyncThunk(
  'user/search',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const data = await axiosInstance.post('/search', objData);
      return data;
    } catch (error) {
      if (typeof error === 'string') {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateCoordinates(state, action) {
      state.centerCoordinates = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchThunk.rejected, (state, action) => {
        if (action.payload) {
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
  },
});

export const { updateCoordinates } = searchSlice.actions;

export default searchSlice.reducer;

import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axios from 'axios';

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
      const data = await axios.post('../../../../fakeData/data.json', objData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      console.log(error);
    }
  }
);

export const searchSuccess = createAction('signup/success ');

export const search = createAction<SearchState>('state/add-data');
const searchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(search, (state, action) => {
      state.users = action.payload.users;
      console.log(action.payload);
    })
    .addCase(searchThunk.rejected, (state, action) => {
      console.log('action rejected', action);
      state.error = action.payload.response.data;
      state.message = null;
    })
    .addCase(searchThunk.fulfilled, (state, action) => {
      console.log('action fulfilled', action);
      state.error = null;
      state.message = action.payload.data;
    })
    .addCase(searchSuccess, (state) => {
      state.error = null;
      state.message = null;
    });
});

export default searchReducer;

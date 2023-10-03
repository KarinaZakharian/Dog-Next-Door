import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axios from 'axios';

interface SearchState {
  animal: string | null;
  city: string | null;
  date: string | null;
  size: string | null;
  walk: string | null;
  radius: number | null;
  options: string | null;
  error: null;
}
export const initialState: SearchState = {
  animal: '',
  city: '',
  date: '',
  size: '',
  walk: '',
  radius: 0,
  options: '',
  error: null,
};

export const searchThunk = createAsyncThunk(
  'user/search',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const data = await axios.post('http://localhost:3000/search', objData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
      console.log(error);
    }
  }
);

export const search = createAction<SearchState>('state/add-data');
const searchReducer = createReducer(initialState, (builder) => {
  builder.addCase(search, (state, action) => {
    state.animal = action.payload.animal;
    state.city = action.payload.city;
    state.date = action.payload.date;
    state.size = action.payload.size;
    state.walk = action.payload.walk;
    state.radius = action.payload.radius;
    state.options = action.payload.options;
    console.log(action.payload);
  });
});

export default searchReducer;

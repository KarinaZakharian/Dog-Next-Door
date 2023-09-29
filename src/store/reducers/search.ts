import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axios from 'axios';

export const logout = createAction('user/logout');

export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData);

    const { data } = await axios.post('https://localhost:3000/search', objData);

    return data;
  }
);

const mapReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      // state.logged = true;
      state.firstname = action.payload.firstname;
      // state.token = action.payload.token;
    })
    .addCase(logout, (state) => {
      state.firstname = null;
    });
});

export default mapReducer;

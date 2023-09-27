/* eslint-disable prettier/prettier */
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axios from 'axios';

interface LoginState {
  firstname: string | null;
  error: string | null;
}
export const initialState: LoginState = {
  firstname: null,
};

export const logout = createAction('user/logout');

export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData);

    const { data } = await axios.post('http://localhost:3000/login', objData);

    return data as {
      firstname: string;
    };
  }
);

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      // state.logged = true;
      state.firstname = action.payload.firstname;
      // state.token = action.payload.token;
    })
    .addCase(login.rejected, (state, action) => {
      console.log(action);
      // je récupère l'erreur directement dans action.error
    })
    .addCase(login.rejected, (state, action) => {
      // Handle the error here and update the state accordingly
      state.error = action.payload;
      console.log(state.error); // Assuming your error message is stored in the payload
    })
    .addCase(logout, (state) => {
      state.firstname = null;

      // je supprime mon JWT de mon instance Axios
      // delete axiosInstance.defaults.headers.common.Authorization;
    });
});

export default loginReducer;

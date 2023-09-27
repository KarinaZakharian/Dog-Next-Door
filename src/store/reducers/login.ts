/* eslint-disable prettier/prettier */
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axios from 'axios';

interface LoginState {
  firstname: string | null;
  error: unknown;
}
export const initialState: LoginState = {
  firstname: null,
  error: null,
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
      state.error= null
      // state.token = action.payload.token;
    })
    .addCase(login.rejected, (state, action) => {
      console.log(action);
      state.error = action.payload;
      // state.error= action.error.code
      // je récupère l'erreur directement dans `action.error`
>>>>>>> 9deeb12 (Add error handling for Signup)
    })
    
    .addCase(logout, (state) => {
      state.firstname = null;

      // je supprime mon JWT de mon instance Axios
      // delete axiosInstance.defaults.headers.common.Authorization;
    });
});

export default loginReducer;

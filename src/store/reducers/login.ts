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
  error: null,
};

export const logout = createAction('user/logout');

export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData);

    const { data } = await axios.post('https://localhost:3000/login', objData);

    // j'utilise mon instance d'Axios
    // const { data } = await axiosInstance.post('/login', objData);

    // à la connexion, j'ajoute le token directement
    // dans mon instance Axios
    // axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    // le token est uniquement utilisé ici,
    // je peux le supprimer des mes données
    // delete data.token;

    return data as {
      firstname: string;
      token: string;
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
      state.error = action.payload;
      // je récupère l'erreur directement dans `action.error`
    })
    .addCase(logout, (state) => {
      state.firstname = null;

      // je supprime mon JWT de mon instance Axios
      // delete axiosInstance.defaults.headers.common.Authorization;
    });
});

export default loginReducer;

/* eslint-disable prettier/prettier */
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axios from 'axios';

interface LoginState {
  name: string | null;
}
export const initialState: LoginState = {
  name: null,
};

export const logout = createAction('user/logout');

export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData);

    const { data } = await axios.post(
      'https://orecipes-api.onrender.com/api/login',
      objData
    );

    // j'utilise mon instance d'Axios
    // const { data } = await axiosInstance.post('/login', objData);

    // à la connexion, j'ajoute le token directement
    // dans mon instance Axios
    // axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    // le token est uniquement utilisé ici,
    // je peux le supprimer des mes données
    // delete data.token;

    return data as {
      logged: boolean;
      name: string;
      // token: string;
    };
  }
);

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      // state.logged = true;
      state.name = action.payload.name;
      // state.token = action.payload.token;
    })
    .addCase(logout, (state) => {
      state.name = null;

      // je supprime mon JWT de mon instance Axios
      // delete axiosInstance.defaults.headers.common.Authorization;
    });
});

export default loginReducer;

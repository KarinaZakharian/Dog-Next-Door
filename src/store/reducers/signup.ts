/* eslint-disable prettier/prettier */
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import axios from 'axios';

interface SignupState {
  name: string | null;
}
export const initialState: SignupState = {
  name: null,
};

export const signup = createAsyncThunk(
  'user/signup',
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
    return data as { name: string };
  }
);
const signupReducer = createReducer(initialState, (builder) => {
  builder.addCase(signup.fulfilled, (state, action) => {});
});

export default signupReducer;

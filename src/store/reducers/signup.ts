/* eslint-disable prettier/prettier */
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import axios from 'axios';

interface SignupState {
  name: string | null;
  error: string | null;
}
export const initialState: SignupState = {
  name: null,
  error: null,
};

export const signup = createAsyncThunk(
  'user/signup',
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData);

    const { data } = await axios.post(
      'http://localhost:3000/subscribe',
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
  builder.addCase(signup.rejected, (state, action) => {
    state.error = action.payload;
    console.log(action);
    // je récupère l'erreur directement dans action.error
  });
});

export default signupReducer;

import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axios from 'axios';

 import axiosInstance from '../../utils/axios'

interface LoginState {
  firstname: string | null;
  lastname: string | null;
  city: string | null;
  description: string | null;
  accommodation: string | null;
  garden: string | null;
  additionalOptions: string[] | null;
  size: string[] | null;
  error: string | null;
}
export const initialState: LoginState = {
  firstname: null,
  lastname: null,
  city: null,
  error: null,
  description: null,
  accommodation: null,
  garden: null,
  additionalOptions: null,
  size: null,
};

export const logout = createAction('user/logout');

export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const { data } = await  axiosInstance.post('/login', objData);
      console.log(data);
      
      //localStorage.setItem("access-token", data.token);

       axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;

       delete data.token;
       
    
      return data as {
        firstname: string;
        lastname: string;
        city: string;
        description: string;
        accommodation: string;
        garden: string;
        additionalOptions: string[];
        size: string[];
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
      // state.logged = true;
      console.log('action fulfilled', action);
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.city = action.payload.city;
      state.description = action.payload.accommodation;
      state.garden = action.payload.garden;
      state.size = action.payload.size;
      state.additionalOptions = action.payload.additionalOptions;
      state.error = null;

      // state.token = action.payload.token;
    })
    .addCase(login.rejected, (state, action) => {
      console.log('action rejected', action);
      state.error = action.payload.response.data;
      state.firstname = null;
      //  console.log(action.error.message)
      // state.error= action.error.messages
      // je récupère l'erreur directement dans `action.error`
    })

    .addCase(logout, (state) => {
      state.firstname = null;
      // delete axiosInstance.defaults.headers.common.Authorization;

      // je supprime mon JWT de mon instance Axios
       delete axiosInstance.defaults.headers.common.Authorization;
    });
});

export default loginReducer;

import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axios from 'axios';

import axiosInstance from '../../utils/axios';

interface LoginState {
  firstname: string | null;
  lastname: string | null;
  user_address: string | null;
  description: string | null;
  accomodation: string | null;
  garden: string | null;
  additionnal_information: string[] | null;
  animal_size: string[] | null;
  error: string | null;
}
export const initialState: LoginState = {
  firstname: null,
  lastname: null,
  user_address: null,
  error: null,
  description: null,
  accomodation: null,
  garden: null,
  additionnal_information: null,
  animal_size: null,
};

export const logout = createAction('user/logout');

export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const { data } = await axiosInstance.post('/login', objData);
      // console.log(data);

      //localStorage.setItem("access-token", data.token);

      axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;

      delete data.token;

      return data as {
        firstname: string;
        lastname: string;
        user_address: string;
        description: string;
        accommodation: string;
        garden: string;
        additionnal_information: string[];
        animal_size: string[];
        accomodation: string;
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
      // console.log('action fulfilled', action);
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.user_address = action.payload.user_address;
      state.description = action.payload.description;
      state.garden = action.payload.garden;
      state.animal_size = action.payload.animal_size;
      state.accomodation = action.payload.accomodation;
      state.additionnal_information = action.payload.additionnal_information;
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

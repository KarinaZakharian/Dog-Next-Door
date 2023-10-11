import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';
import { LoginState } from '../../@types/user';

// Define the initial state of the Login state
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

// Create an async thunk for user logout
export const logout = createAsyncThunk('user/logout', async () => {
  try {
    const { data } = await axiosInstance.get('/logout');
    //console.log(data);
    return data;
  } catch (error) {
    //console.log(error);
  }
});

// Create an async thunk for user login
export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const { data } = await axiosInstance.post('/login', objData);
      // Set the authorization header for future requests
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;

      delete data.token;

      return data as LoginState;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Define the loginReducer to handle the Login state
const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.fulfilled, (state, action) => {
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
    })
    .addCase(login.rejected, (state, action) => {
      console.log('action rejected', action);
      state.error = action.payload.response.data;
      state.firstname = null;
      //  console.log(action.error.message)
      // state.error= action.error.messages
      // je récupère l'erreur directement dans `action.error`
    })
    .addCase(logout.fulfilled, (state) => {
      state.firstname = null;
      // delete axiosInstance.defaults.headers.common.Authorization;
      delete axiosInstance.defaults.headers.common.Authorization;
    });
});

export default loginReducer;

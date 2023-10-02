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
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const { data } = await axios.post('http://localhost:3000/login', objData);
      console.log('data dans middleware', data);
      return data as {
        firstname: string;
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

      // je supprime mon JWT de mon instance Axios
      // delete axiosInstance.defaults.headers.common.Authorization;
    });
});

export default loginReducer;

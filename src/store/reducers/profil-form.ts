import { getSignupFormUpdate, getAditionalFormUpdate } from './profil';

import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';
import { getLoginUpdate } from './login';

interface ProfilState {
  fillMessage: string | null;
  fillError: unknown;
  myMessage: string | null;
  myError: unknown;
  dateMessage: string | null;
  dateError: unknown;
}
export const initialState: ProfilState = {
  fillMessage: null,
  fillError: null,
  myError: null,
  myMessage: null,
  dateError: null,
  dateMessage: null,
};

export const fillProfilForm = createAsyncThunk(
  'user/form',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);

    try {
      const { data } = await axiosInstance.patch('/account/form', objData);
      thunkAPI.dispatch(getAditionalFormUpdate(objData));

      return data as {
        message: string;
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateSignupForm = createAsyncThunk(
  'signupform/update',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    console.log('objData update signup form', objData);
    try {
      const { data } = await axiosInstance.patch('/account/form2', objData);
      //  thunkAPI.dispatch(fillProfilUpdated(objData))
      thunkAPI.dispatch(getLoginUpdate(objData));

      thunkAPI.dispatch(getSignupFormUpdate(objData));

      return data as {
        myMessage: string;
      };
    } catch (error) {
      console.log('error updateSignupData', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fillDateForm = createAsyncThunk(
  'dateform/update',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const { data } = await axiosInstance.post(
        '/account/adddisponibility',
        objData
      );
      return data as {
        message: string;
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const success = createAction('form/success ');

const profilFormReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillProfilForm.rejected, (state, action) => {
      console.log('action fillProfilForm.rejected', action);
      state.fillError = action.payload.response.data.message;
      state.fillMessage = null;
    })
    .addCase(fillProfilForm.fulfilled, (state, action) => {
      // state.logged = true;
      console.log('action fillProfilForm.fulfilled', action);
      // state.firstname = action.payload.firstname;
      state.fillError = null;
      state.fillMessage = action.payload;

      // state.token = action.payload.token;
    })
    .addCase(updateSignupForm.rejected, (state, action) => {
      console.log('action updateSignupForm.rejected', action);
      state.myError = action.payload.response.data.message;
      state.myMessage = null;
    })
    .addCase(updateSignupForm.fulfilled, (state, action) => {
      // state.logged = true;
      console.log('action updateSignupForm.fulfilled', action);
      // state.firstname = action.payload.firstname;
      state.myError = null;
      state.myMessage = action.payload;

      // state.token = action.payload.token;
    })

    .addCase(fillDateForm.rejected, (state, action) => {
      console.log('action fillDateForm.rejected', action);
      state.dateError = action.payload.response.data.message;
      state.dateMessage = null;
    })
    .addCase(fillDateForm.fulfilled, (state, action) => {
      // state.logged = true;
      console.log('action fillDateForm.fulfilled', action);
      // state.firstname = action.payload.firstname;
      state.dateError = null;
      state.dateMessage = action.payload;

      // state.token = action.payload.token;
    })
    .addCase(success, (state) => {
      state.fillError = null;
      state.fillMessage = null;
      state.myError = null;
      state.myMessage = null;
      state.dateError = null;
      state.dateMessage = null;
    });
});

export default profilFormReducer;

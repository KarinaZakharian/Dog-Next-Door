import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';
import { getSignupFormUpdate, getAditionalFormUpdate } from './profil';

import axiosInstance from '../../utils/axios';
import { getLoginUpdate } from './login';

interface ProfilState {
  fillMessage: string | null;
  fillError: unknown;
  myMessage: string | null;
  myError: unknown;
}
export const initialState: ProfilState = {
  fillMessage: null,
  fillError: null,
  myError: null,
  myMessage: null,
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
    try {
      const { data } = await axiosInstance.patch('/account/form2', objData);
      thunkAPI.dispatch(getLoginUpdate(objData));

      thunkAPI.dispatch(getSignupFormUpdate(objData));

      return data as {
        myMessage: string;
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
      state.fillError = action.payload.response.data.message;
      state.fillMessage = null;
    })
    .addCase(fillProfilForm.fulfilled, (state, action) => {
      state.fillError = null;
      state.fillMessage = action.payload;
    })
    .addCase(updateSignupForm.rejected, (state, action) => {
      state.myError = action.payload.response.data.message;
      state.myMessage = null;
    })
    .addCase(updateSignupForm.fulfilled, (state, action) => {
      state.myError = null;
      state.myMessage = action.payload;
    })

    .addCase(success, (state) => {
      state.fillError = null;
      state.fillMessage = null;
      state.myError = null;
      state.myMessage = null;
    });
});

export default profilFormReducer;

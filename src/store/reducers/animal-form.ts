/* eslint-disable prettier/prettier */
import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';

import axios from 'axios';
import axiosInstance from '../../utils/axios';


interface AnimalState {
  message: string | null;
  error: unknown;
 
 
}
export const initialState: AnimalState = {
  message: null,
  error: null,
  
  
};

export const fillAnimalForm = createAsyncThunk(
  'animal/form',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const data = await axiosInstance.post('/account/addanimal', objData);
      return data   ;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const success = createAction('form/success ');

const animalFormReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillAnimalForm.rejected, (state, action) => {
      console.log('action rejected', action);
      state.error = action.payload.response.data.message;
      state.message = null;
      
      
    })
    .addCase(fillAnimalForm.fulfilled, (state, action) => {
      // state.logged = true;
      console.log('action fulfilled', action);
      // state.firstname = action.payload.firstname;
      state.error = null;
      state.message = action.payload.data.message;
     

      // state.token = action.payload.token;
    })
    .addCase(success, (state) => {
      state.error = null;
      state.message = null;
    });
});

export default animalFormReducer;

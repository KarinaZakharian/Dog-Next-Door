import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

// Define the initial state of the animal form
interface AnimalState {
  message: string | null;
  error: unknown;
}
export const initialState: AnimalState = {
  message: null,
  error: null,
};

// Create an asynchronous thunk to handle form submission
export const fillAnimalForm = createAsyncThunk(
  'animal/form',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const data = await axiosInstance.post('/account/addanimal', objData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// Create an action for a successful form submission
export const success = createAction('form/success ');

// Define the animal form reducer
const animalFormReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillAnimalForm.rejected, (state, action) => {
      // Handle form submission rejection
      if (action.payload) {
        state.error = action.payload.response.data.message;
      }

      state.message = null;
    })
    .addCase(fillAnimalForm.fulfilled, (state, action) => {
      // Handle a successful form submission
      state.error = null;
      state.message = action.payload.data.message;
    })
    .addCase(success, (state) => {
      // Reset the state when success action is dispatched
      state.error = null;
      state.message = null;
    });
});

export default animalFormReducer;

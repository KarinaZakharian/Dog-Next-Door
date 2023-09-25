/* eslint-disable prettier/prettier */
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

interface SignupState {
  isOpen: boolean;
  name: string | null;
}
export const initialState: SignupState = {
  isOpen: true,
  name: null,
};

const signupReducer = createReducer(initialState, (builder) => {});

export default signupReducer;

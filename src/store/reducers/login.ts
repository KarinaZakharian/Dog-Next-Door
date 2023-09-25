/* eslint-disable prettier/prettier */
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

interface LoginState {
  isOpen: boolean;
  name: string | null;
}
export const initialState: LoginState = {
  isOpen: true,
  name: null,
};

const loginReducer = createReducer(initialState, (builder) => {});

export default loginReducer;

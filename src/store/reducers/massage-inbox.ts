import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface Card {
  firstname: string | null;
  lastname: string | null;
  dates: string | null;
  id: string | null;
}

interface InboxState {
  user: Card | null;
  error: string | undefined;
  message: string | null;
  messageError: string | undefined;
  messageMessage: string | null;
}
export const initialState: InboxState = {
  user: null,
  error: undefined,
  message: null,
  messageError: undefined,
  messageMessage: null,
};

export const fetchMessageUser =
  createAsyncThunk<// type de la valeur retourné //  TODO
  {
    rejecValue: string;
  }>('inbox/fetchmessageuser', async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`account/inbox/uppast`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (typeof error === 'string') {
        return thunkAPI.rejectWithValue(error);
      }
      console.error(error);
    }
  });

export const sendMessage = createAsyncThunk<
  any, // type de la valeur retourné //  TODO
  FormData, // type de userID // paramètre du callback
  {
    rejectValue: string;
  }
>('inbox/sendmessage', async (formData: FormData, thunkAPI) => {
  try {
    const objData = Object.fromEntries(formData);
    const response = await axiosInstance.post('account/message', objData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (typeof error === 'string') {
      return thunkAPI.rejectWithValue(error);
    }
    console.error(error);
  }
});

// Create the user reducer
const messageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchMessageUser.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }
      // state.error = action.payload.response.data;
      state.message = null;
    })
    .addCase(fetchMessageUser.fulfilled, (state, action) => {
      console.log('fulffilled');
      console.log(action);
      state.error = undefined;
      state.message = action.payload.message; // You can customize this message
      state.user = action.payload;
    })

    .addCase(sendMessage.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.messageError = action.payload;
      } else {
        state.messageError = action.error.message;
      }
      // state.error = action.payload.response.data;
      state.messageMessage = null;
    })
    .addCase(sendMessage.fulfilled, (state, action) => {
      console.log('fulffilled');
      console.log(action);
      state.messageError = undefined;
      state.messageMessage = action.payload.message; // You can customize this message
    });
});

export default messageReducer;

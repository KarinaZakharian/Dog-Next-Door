import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface Card {
  firstname: string;
  lastname: string;
  start_date: string;
  end_date: string;
  id: string;
}

interface InboxState {
  user: Card[] | [];
  error: string | null;
  message: string | null;
  messageError: string | undefined;
  messageMessage: string | null;
}
export const initialState: InboxState = {
  user: [],
  error: null,
  message: null,
  messageError: undefined,
  messageMessage: null,
};



export const fetchMessageUser = createAsyncThunk(
  'inbox/fetchmessageuser',
  async () => {
    const response = await axiosInstance.get(`/inbox/uppast`);
    return response.data;
  }
);

export const sendMessage = createAsyncThunk<
  any, // type de la valeur retourné //  TODO
  FormData, // type de userID // paramètre du callback
  {
    rejectValue: string;
  }
>('inbox/sendmessage', async (formData: FormData, thunkAPI) => {
  try {
    const objData = Object.fromEntries(formData);
    const response = await axiosInstance.post('inbox/past', objData);
    return response.data;
  } catch (error) {
    if (typeof error === 'string') {
      return thunkAPI.rejectWithValue(error);
    }
    return thunkAPI.rejectWithValue(error);
  }
});

// Create the user reducer
const messageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchMessageUser.pending, (state, action) => {
      state.error = null;
      state.message = null;
      state.user = [];
    })
    .addCase(fetchMessageUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.error = null;
      state.message = action.payload; // You can customize this message
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
      state.messageError = undefined;
      state.messageMessage = action.payload.message; // You can customize this message
    });
});

export default messageReducer;

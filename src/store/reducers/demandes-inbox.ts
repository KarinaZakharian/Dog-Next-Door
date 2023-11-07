import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface User {
  id: string;
  animal: {
    petsitter_lastname: string;
    petsitter_firstname: string;
  };
  booking: {
    start_date: string;
    end_date: string;
    booking_status: string;
  };
}

interface InboxState {
  user: User[] | [];
  error: string | null | undefined;
  messageError: string | undefined | null;
  messageMessage: string | null;
}
export const initialState: InboxState = {
  user: [],
  error: null,
  messageError: null,
  messageMessage: null,
};

export const success = createAction('form/success ');

export const fetchStatus = createAsyncThunk<User, void>(
  'inbox/status',
  async () => {
    const response = await axiosInstance.get(`/inbox/demands`);
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
// Create the  reducer
const demandsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchStatus.pending, (state, action) => {
      state.user = [];
    })
    .addCase(fetchStatus.fulfilled, (state, action) => {
      state.error = undefined;
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
    })
    .addCase(success, (state) => {
      state.messageError = null;
      state.messageMessage = null;
    });
});

export default demandsReducer;

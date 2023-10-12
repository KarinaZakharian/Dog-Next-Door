import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

interface Card {
  type: string | null;
  name: string | null;
  dates: string | null;
  id: string | null;
}

interface InboxState {
  animal: Card | null;
  error: string | undefined;
  message: string | null;
  acceptError: string | undefined;
  acceptMessage: string | null;
  declineError: string | undefined;
  declineMessage: string | null;
}
export const initialState: InboxState = {
  animal: null,
  error: undefined,
  message: null,
  acceptError: undefined,
  acceptMessage: null,
  declineError: undefined,
  declineMessage: null,
};

export const fetchInboxAnimal = createAsyncThunk<
  any, // type de la valeur retourné //  TODO
  {
    rejecValue: string;
  }
>('inbox/fetchanimal', async (thunkAPI) => {
  try {
    const response = await axiosInstance.get(`account/inbox`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (typeof error === 'string') {
      return thunkAPI.rejectWithValue(error);
    }
    console.error(error);
  }
});

export const clientAccept = createAsyncThunk<
  any, // type de la valeur retourné //  TODO
  number, // type de userID // paramètre du callback
  {
    rejectValue: string;
  }
>('inbox/accept', async (clientId, thunkAPI) => {
  console.log('reduser userId' + clientId);
  try {
    const response = await axiosInstance.post('account/accept', clientId);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (typeof error === 'string') {
      return thunkAPI.rejectWithValue(error);
    }
    console.error(error);
  }
});

export const clientDecline = createAsyncThunk<
  any, // type de la valeur retourné //  TODO
  number, // type de userID // paramètre du callback
  {
    rejectValue: string;
  }
>('inbox/decline', async (clientId, thunkAPI) => {
  console.log('reduser userId' + clientId);
  try {
    const response = await axiosInstance.post('account/decline', clientId);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (typeof error === 'string') {
      return thunkAPI.rejectWithValue(error);
    }
    console.error(error);
  }
});

// Create a success action
export const fetchAnimalSuccess = createAction('animal/fetchSuccess');

// Create the user reducer
const accountReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchInboxAnimal.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }
      // state.error = action.payload.response.data;
      state.message = null;
    })
    .addCase(fetchInboxAnimal.fulfilled, (state, action) => {
      console.log('fulffilled');
      console.log(action);
      state.error = undefined;
      state.message = action.payload.message; // You can customize this message
      state.animal = action.payload;
    })
    .addCase(fetchAnimalSuccess, (state) => {
      state.error = undefined;
      state.message = null;
    })
    .addCase(clientAccept.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.acceptError = action.payload;
      } else {
        state.acceptError = action.error.message;
      }
      // state.error = action.payload.response.data;
      state.acceptMessage = null;
    })
    .addCase(clientAccept.fulfilled, (state, action) => {
      console.log('fulffilled');
      console.log(action);
      state.acceptError = undefined;
      state.acceptMessage = action.payload.message; // You can customize this message
    })
    .addCase(clientDecline.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.declineError = action.payload;
      } else {
        state.declineError = action.error.message;
      }
      // state.error = action.payload.response.data;
      state.acceptMessage = null;
    })
    .addCase(clientAccept.fulfilled, (state, action) => {
      console.log('fulffilled');
      console.log(action);
      state.declineError = undefined;
      state.declineMessage = action.payload.message; // You can customize this message
    });
});

export default accountReducer;

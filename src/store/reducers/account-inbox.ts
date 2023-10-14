import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface Card {
  type: 'cat' | 'dog';
  name: string ;
  start_date: string ;
  end_date: string ;
  clientId: string ;
 
}

interface InboxState {
  user: Card []| null;
  error: string | undefined;
  message: string | null;
  acceptError: string | undefined;
  acceptMessage: string | null;
  declineError: string | undefined;
  declineMessage: string | null;
}
export const initialState: InboxState = {
  user: null,
  error: undefined,
  message: null,
  acceptError: undefined,
  acceptMessage: null,
  declineError: undefined,
  declineMessage: null,
};

export const fetchInboxAnimal =
  createAsyncThunk<// type de la valeur retourné //  TODO
  {
    rejecValue: string;
  }>('inbox/fetchanimal', async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/inbox/awaiting`);
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
  FormData, // type de userID // paramètre du callback
  {
    rejectValue: string;
  }
>('inbox/accept-decline', async (formData: FormData, thunkAPI) => {
  const objData = Object.fromEntries(formData);
  console.log(objData)
  try {
    const response = await axiosInstance.post('/inbox/awaiting', objData);
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
      console.log('fulffilled',action);
      console.log(action);
      state.error = undefined;
      state.message = action.payload.message; // You can customize this message
      state.user = action.payload;
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
    });
});

export default accountReducer;

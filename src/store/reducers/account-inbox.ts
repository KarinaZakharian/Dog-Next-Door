import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface Card {
  type: 'Cat' | 'Dog';
  name: string;
  start_date: string;
  end_date: string;
  clientId: string;
  message: string | null | undefined;
}

interface InboxState {
  user: Card[] | null;
  acceptError: string | null;
  acceptMessage: string | null;
}
export const initialState: InboxState = {
  user: null,
  acceptError: null,
  acceptMessage: null,
};

export const fetchInboxAnimal = createAsyncThunk(
  'inbox/fetchanimal',
  async () => {
    const { data } = await axiosInstance.get(`/inbox/awaiting`);
    return data;
  }
);

export const clientAccept = createAsyncThunk(
  'inbox/accept',
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData.entries());
    const { data } = await axiosInstance.post('/inbox/awaiting', objData);
    return data;
  }
);

// Create the user reducer
const accountReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchInboxAnimal.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    })
    .addCase(clientAccept.rejected, (state, action) => {
      if (action.payload) {
        if (typeof action.payload === 'string') {
          state.acceptError = action.payload;
        } else {
          state.acceptError = 'An unknown error occurred';
        }
      }

      state.acceptMessage = null;
    })
    .addCase(clientAccept.fulfilled, (state, action) => {
      state.acceptError = null;
      state.acceptMessage = action.payload.message; // You can customize this message
    });
});

export default accountReducer;

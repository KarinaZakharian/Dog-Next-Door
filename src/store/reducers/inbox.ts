import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface InboxState {
  firstname: string | null;
  lastname: string | null;
  user_address: string | null;
  description: string | null;
  accomodation: string | null;
  garden: string | null;
  walking_duration: string | null;
  additionnal_information: string[] | null;
  animal_size: string[] | null;
  error: string | null;
  disponibility_date: string | null;
}
export const initialState: InboxState = {
  firstname: null,
  lastname: null,
  user_address: null,
  error: null,
  description: null,
  accomodation: null,
  garden: null,
  additionnal_information: null,
  walking_duration: null,
  animal_size: null,
  disponibility_date: null,
};

export const fetchBooking = createAsyncThunk('booking/fetch', async () => {
  try {
    const { data } = await axiosInstance.get('/account/inbox');
    return data as {
      firstname: string;
      lastname: string;
      user_address: string;
      description: string;
      accommodation: string;
      garden: string;
      walking_duration: string;
      additionnal_information: string[];
      animal_size: string[];
      accomodation: string;
      disponibility_date: string;
    };
  } catch (error) {
    console.log(error);
  }
});

export const acceptBooking = createAsyncThunk(
  'accept/Booking',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const data = await axiosInstance.post('/account/inbox', objData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const bookingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchBooking.fulfilled, (state, action) => {
      if (action.payload) {
        state.firstname = action.payload.firstname;
        state.lastname = action.payload.lastname;
        state.user_address = action.payload.user_address;
        state.description = action.payload.description;
        state.garden = action.payload.garden;
        state.animal_size = action.payload.animal_size;
        state.accomodation = action.payload.accomodation;
        state.additionnal_information = action.payload.additionnal_information;
        state.walking_duration = action.payload.walking_duration;
        state.disponibility_date = action.payload.disponibility_date;
      }

      state.error = null;

      // state.token = action.payload.token;
    })
    .addCase(fetchBooking.rejected, (state, action) => {
      state.error = action.payload.response.data;
      state.firstname = null;
      // je récupère l'erreur directement dans `action.error`
    })

    .addCase(acceptBooking.fulfilled, (state, action) => {})
    .addCase(acceptBooking.rejected, (state, action) => {})

    .addCase(deliteBooking.fulfilled, (state, action) => {})
    .addCase(deliteBooking.rejected, (state, action) => {});
});

export default bookingReducer;

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
    const { data } = await axiosInstance.get<Omit<InboxState, 'error'>>(
      '/account/inbox'
    );
    return data;
  } catch (error) {
    // console.log(error);
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
        const {
          firstname,
          lastname,
          user_address: userAddress,
          description,
          garden,
          walking_duration: walkingDuration,
          additionnal_information: additionnalInformation,
          animal_size: animalSize,
          accomodation,
          disponibility_date: disponibilityDate,
        } = action.payload;

        state.firstname = firstname;
        state.lastname = lastname;
        state.user_address = userAddress;
        state.description = description;
        state.garden = garden;
        state.animal_size = animalSize;
        state.accomodation = accomodation;
        state.additionnal_information = additionnalInformation;
        state.walking_duration = walkingDuration;
        state.disponibility_date = disponibilityDate;
      }

      state.error = null;
    })
    .addCase(fetchBooking.rejected, (state, action) => {
      state.error = action.payload.response.data;
      state.firstname = null;
    });

  // .addCase(acceptBooking.fulfilled, (state, action) => {})
  // .addCase(acceptBooking.rejected, (state, action) => {})

  // .addCase(deliteBooking.fulfilled, (state, action) => {})
  // .addCase(deliteBooking.rejected, (state, action) => {});
});

export default bookingReducer;

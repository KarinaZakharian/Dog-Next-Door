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
interface User {
  accomodation: string | null;
  additionnal_information: null | [];
  animal: Animal | null;
  animal_size: null | [];
  avatar: string | null;
  booking: Booking | null;
  description: string | null;
  disponibility: Disponibility | null;
  email: string | null;
  firstname: string | null;
  garden: string | null;
  id: number | null;
  lastname: string | null;
  latitude: number | null;
  longitude: number | null;
  user_address: string | null;
  walking_duration: string | null;
  size: string | null;
  testimonies: Testimonial | null;
  error: string | null;
}
interface Testimonial {
  comment: string | null;
  id: string | null;
}
interface Animal {
  name: string | null;
  size: string | null;
  birth_date: string | null;
  type: string | null;
  energy: string | null;
  mealhours: string | null;
  walk: string | null;
  race: string | null;
  // Add more properties as needed
}
interface Booking {
  id: number | null;
  start_date: string | null;
  end_date: string | null;
  message: string | null;
  booking_status: string | null;
  // Add more properties as needed
}

interface Disponibility {
  id: string | null;
  start_date: string | null;
  end_date: string | null;
  // Add more properties as needed
}

interface SitterState {
  user: User | null;
  error: string | undefined;
  message: string | null;
}
export const initialState: SitterState = {
  user: null,
  error: undefined,
  message: null,
};

// Create an async thunk for fetching user information by ID
export const fetchUserById = createAsyncThunk<
  any, // type de la valeur retourné //  TODO
  number, // type de userID // paramètre du callback
  {
    rejectValue: string;
  }
>('user/fetchById', async (userId, thunkAPI) => {
  //  console.log('reduser userId' + userId);
  try {
    const response = await axiosInstance.get(`petsitter/${userId}`);
    return response.data;
  } catch (error) {
    if (typeof error === 'string') {
      return thunkAPI.rejectWithValue(error);
    }
    throw error;
  }
});

// Create a success action
export const fetchUserSuccess = createAction('user/fetchSuccess');

// Create the user reducer
const sitterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUserById.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }

      // state.error = action.payload.response.data;
      state.message = null;
    })
    .addCase(fetchUserById.fulfilled, (state, action) => {
      state.error = undefined;
      state.message = 'User fetched successfully'; // You can customize this message
      state.user = action.payload;
    })
    .addCase(fetchUserSuccess, (state) => {
      state.error = undefined;
      state.message = null;
    });
});

export default sitterReducer;

import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface User {
  accomodation: string | null;
  additionnal_information: (null | unknown)[];
  animal: Animal | null;
  animal_size: (null | unknown)[];
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
  error: unknown;
  dateError: unknown;
  updateError: unknown;
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
  id: number | null;
  start_date: string | null;
  end_date: string | null;
  // Add more properties as needed
}
const initialUserState: User = {
  accomodation: null,
  additionnal_information: [],
  animal: null,
  animal_size: [],
  avatar: null,
  booking: null,
  description: null,
  disponibility: null,
  email: null,
  firstname: null,
  garden: null,
  id: null,
  lastname: null,
  latitude: null,
  longitude: null,
  user_address: null,
  walking_duration: null,
  error: null,
  dateError: null,
  updateError: null,
};

export const success = createAction('form/success ');

export const getSignupFormUpdate = createAction(
  'getUpdate/signupform',
  (objData) => {
    return {
      payload: {
        objData,
      },
    };
  }
);

export const getAditionalFormUpdate = createAction(
  'getUpdate/aditionalform',
  (objData) => {
    return {
      payload: {
        objData,
      },
    };
  }
);

export const fetchUser = createAsyncThunk('user/fetch', async () => {
  try {
    const { data } = await axiosInstance.get('/account');
    return data as User;
  } catch (error) {}
});

export const fillDateForm = createAsyncThunk(
  'dateform/fill',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const { data } = await axiosInstance.post(
        '/account/adddisponibility',
        objData
      );
      return data as Disponibility;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateDateForm = createAsyncThunk(
  'dateform/update',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const { data } = await axiosInstance.patch(
        '/account/adddisponibility',
        objData
      );
      return data as Disponibility;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const profilReducer = createReducer(initialUserState, (builder) => {
  builder
    .addCase(fetchUser.fulfilled, (state, action) => {
      const userData = action.payload;

      if (userData) {
        state.firstname = userData.firstname;
        state.lastname = userData.lastname;
        state.avatar = userData.avatar;
        state.user_address = userData.user_address;
        state.longitude = userData.longitude;
        state.latitude = userData.latitude;
        state.description = userData.description;
        state.garden = userData.garden;
        state.animal_size = userData.animal_size;
        state.accomodation = userData.accomodation;
        state.additionnal_information = userData.additionnal_information;
        state.walking_duration = userData.walking_duration;
        state.disponibility = userData.disponibility;

        if (userData.animal) {
          state.animal = {
            name: userData.animal.name,
            size: userData.animal.size,
            birth_date: userData.animal.birth_date,
            type: userData.animal.type,
            energy: userData.animal.energy,
            mealhours: userData.animal.mealhours,
            walk: userData.animal.walk,
            race: userData.animal.race,
          };
        }
      }

      state.error = null;
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.error = action.payload;
      state.firstname = null;
    })
    .addCase(fillDateForm.rejected, (state, action) => {
      state.dateError = action.payload;
    })
    .addCase(fillDateForm.fulfilled, (state, action) => {
      state.dateError = null;
      const userData = action.payload;
      if (userData) {
        state.disponibility = {
          start_date: userData.start_date,
          end_date: userData.end_date,
          id: userData.id,
        };
      }
    })
    .addCase(updateDateForm.rejected, (state, action) => {
      state.updateError = action.payload;
    })
    .addCase(updateDateForm.fulfilled, (state, action) => {
      state.updateError = null;
      const userData = action.payload;
      if (userData) {
        state.disponibility = {
          start_date: userData.start_date,
          end_date: userData.end_date,
          id: userData.id,
        };
      }
    })
    .addCase(getSignupFormUpdate, (state, action) => {
      if (action.payload) {
        state.lastname = action.payload.objData.lastname;
        state.firstname = action.payload.objData.firstname;
        state.user_address = action.payload.objData.user_address;
        state.latitude = action.payload.objData.latitude;
        state.longitude = action.payload.objData.longitude;
      }
    })
    .addCase(getAditionalFormUpdate, (state, action) => {
      const userData = action.payload.objData;
      if (userData) {
        state.description = userData.description;
        state.garden = userData.garden;
        state.animal_size = userData.animal_size;
        state.accomodation = userData.accomodation;
        state.additionnal_information = userData.additionnal_information;
        state.walking_duration = userData.walking_duration;
        state.disponibility = userData.disponibility;
      }
    })
    .addCase(success, (state) => {
      state.dateError = null;
      state.updateError = null;
    });
});

export default profilReducer;

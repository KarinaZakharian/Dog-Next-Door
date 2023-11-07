import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';
import { LoginState } from '../../@types/user';

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
  testimonies: Testimonial[] | [];
  error: unknown;
  dateError: unknown;
  dateMessage: string | null;
  updateError: unknown;
  updateMessage: string | null;
  logoutMessage: string | null;
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
  id: number | null;
  start_date: string | null;
  end_date: string | null;
  // Add more properties as needed
}
const initialUserState: User = {
  accomodation: null,
  additionnal_information: [],
  animal: [],
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
  testimonies: [],
  error: null,
  dateError: null,
  dateMessage: null,
  updateError: null,
  updateMessage: null,
  logoutMessage: null,
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

export const fetchUser = createAsyncThunk('user/fetch', async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get('/account');
    return data as User;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
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
        '/account/update-disponibility',
        objData
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create an async thunk for user logout
export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get('/logout');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// Create an async thunk for user login
export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData, thunkAPI) => {
    const objData = Object.fromEntries(formData);
    try {
      const { data } = await axiosInstance.post('/login', objData);
      // Set the authorization header for future requests
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      localStorage.setItem('token', data.token);
      delete data.token;

      return data as LoginState;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const reconnect = createAction<string | null>('reconnect');
const profilReducer = createReducer(initialUserState, (builder) => {
  builder
    .addCase(fetchUser.fulfilled, (state, action) => {
      console.log(action.payload);
      const userData = action.payload;

      if (userData) {
        state.firstname = userData.firstname;
        state.lastname = userData.lastname;
        state.testimonies = userData.testimonies;
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
      console.log(action.payload);
      state.dateError = action.payload;
    })
    .addCase(fillDateForm.fulfilled, (state, action) => {
      console.log(action.payload);
      state.dateError = null;
      state.dateMessage = action.payload.message;
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
      console.log(action.payload);
      state.updateError = action.payload;
    })
    .addCase(updateDateForm.fulfilled, (state, action) => {
      console.log(action.payload);
      state.updateError = null;
      const userData = action.payload;
      state.updateMessage = action.payload.message;
      console.log(action.payload.message);
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
      }
    })
    .addCase(success, (state) => {
      state.dateError = null;
      state.dateMessage = null;
      state.updateError = null;
      state.updateMessage = null;
      state.logoutMessage = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.error = null;
    })
    .addCase(login.rejected, (state, action) => {
      console.log(action.payload);
      state.error = action.payload.response.data;
      state.firstname = null;
      // je récupère l'erreur directement dans `action.error`
    })

    .addCase(logout.fulfilled, (state, action) => {
      //console.log(action.payload);
      state.logoutMessage = action.payload.message;
      state.firstname = null;
      delete axiosInstance.defaults.headers.common.Authorization;
      localStorage.clear();
    })
    .addCase(reconnect, (state, action) => {
      console.log(action.payload);
      state.firstname = action.payload;
    });
});

export default profilReducer;

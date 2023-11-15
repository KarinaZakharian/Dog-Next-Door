import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';
import { LoginState } from '../../@types/user';
import { Interface } from 'readline';

interface User {
  accomodation: string | null;
  additionnal_information: (null | unknown)[];
  animal: Animal;
  animal_size: (null | unknown)[];
  avatar: string | null;
  booking: Booking;
  description: string | null;
  disponibility: Disponibility;
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
  dateMessage: string | null;
  updateError: unknown;
  updateMessage: string | null;
  logoutMessage: string | null;
  isLoading: boolean;
}
interface Testimonial {
  id: number | null;
  body: string | null;
  sender_id: number | null;
  // Add more properties as needed
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
const initialUserState: User = {
  accomodation: null,
  additionnal_information: [],
  animal: {
    name: null,
    size: null,
    birth_date: null,
    type: null,
    energy: null,
    mealhours: null,
    walk: null,
    race: null,
  },
  animal_size: [],
  avatar: null,
  booking: {
    id: null,
    start_date: null,
    end_date: null,
    message: null,
    booking_status: null,
  },
  description: null,
  disponibility: {
    id: null,
    start_date: null,
    end_date: null,
  },
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
  dateMessage: null,
  updateError: null,
  updateMessage: null,
  logoutMessage: null,
  isLoading: false,
};
const initialTestimonialsState: Testimonial[] = [];

const initialState = {
  user: initialUserState,
  userTestimonials: initialTestimonialsState,
};

interface UserData {
  user: User;
  userTestimonials: Testimonial[];
}

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
    const { data } = await axiosInstance.get<UserData>('/account');
    return data as UserData;
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
const profilReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user.isLoading = false;
      const userData = action.payload.user;
      console.log(action.payload.userTestimonials);
      state.userTestimonials = [...action.payload.userTestimonials];

      if (userData) {
        state.user.firstname = userData.firstname;
        state.user.lastname = userData.lastname;
        state.user.avatar = userData.avatar;
        state.user.user_address = userData.user_address;
        state.user.longitude = userData.longitude;
        state.user.latitude = userData.latitude;
        state.user.description = userData.description;
        state.user.garden = userData.garden;
        state.user.animal_size = userData.animal_size;
        state.user.accomodation = userData.accomodation;
        state.user.additionnal_information = userData.additionnal_information;
        state.user.walking_duration = userData.walking_duration;
        state.user.disponibility = userData.disponibility;

        if (userData.animal) {
          state.user.animal = {
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

      state.user.error = null;
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.user.isLoading = false;
      state.user.error = action.payload;
      state.user.firstname = null;
    })
    .addCase(fetchUser.pending, (state, action) => {
      state.user.isLoading = true;
      state.user.error = action.payload;
    })
    .addCase(fillDateForm.rejected, (state, action) => {
      console.log(action.payload);
      state.user.dateError = action.payload;
    })
    .addCase(fillDateForm.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user.dateError = null;
      state.user.dateMessage = 'success';
      const userData = action.payload;
      if (userData) {
        state.user.disponibility = {
          start_date: userData.start_date,
          end_date: userData.end_date,
          id: userData.id,
        };
      }
    })
    .addCase(updateDateForm.rejected, (state, action) => {
      console.log(action.payload);
      state.user.updateError = action.payload;
    })
    .addCase(updateDateForm.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user.updateError = null;
      const userData = action.payload;
      state.user.updateMessage = action.payload.message;
      console.log(action.payload.message);
      if (userData) {
        state.user.disponibility = {
          start_date: userData.start_date,
          end_date: userData.end_date,
          id: userData.id,
        };
      }
    })
    .addCase(getSignupFormUpdate, (state, action) => {
      if (action.payload) {
        state.user.lastname = action.payload.objData.lastname;
        state.user.firstname = action.payload.objData.firstname;
        state.user.user_address = action.payload.objData.user_address;
        state.user.latitude = action.payload.objData.latitude;
        state.user.longitude = action.payload.objData.longitude;
      }
    })
    .addCase(getAditionalFormUpdate, (state, action) => {
      const userData = action.payload.objData;
      if (userData) {
        state.user.description = userData.description;
        state.user.garden = userData.garden;
        state.user.animal_size = userData.animal_size;
        state.user.accomodation = userData.accomodation;
        state.user.additionnal_information = userData.additionnal_information;
        state.user.walking_duration = userData.walking_duration;
      }
    })
    .addCase(success, (state) => {
      state.user.dateError = null;
      state.user.dateMessage = null;
      state.user.updateError = null;
      state.user.updateMessage = null;
      state.user.logoutMessage = null;
      state.user.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.user.firstname = action.payload.firstname;
      state.user.lastname = action.payload.lastname;
      state.user.error = null;
    })
    .addCase(login.rejected, (state, action) => {
      console.log(action.payload);
      state.user.error = action.payload?.response?.data;
      state.user.firstname = null;
      // je récupère l'erreur directement dans `action.error`
    })

    .addCase(logout.fulfilled, (state, action) => {
      //console.log(action.payload);
      state.user.logoutMessage = action.payload.message;
      state.user.firstname = null;
      delete axiosInstance.defaults.headers.common.Authorization;
      localStorage.clear();
    })

    .addCase(reconnect, (state, action) => {
      console.log(action.payload);
      state.user.firstname = action.payload;
    });
});

export default profilReducer;

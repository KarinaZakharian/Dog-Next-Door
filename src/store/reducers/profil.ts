import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface LoginState {
  firstname: string | null;
  lastname: string | null;
  avatar: string | null;
  user_address: string | null;
  description: string | null;
  accomodation: string | null;
  garden: string | null;
  walking_duration: string | null;
  additionnal_information: string[] | null;
  animal_size: string[] | null;
  error: string | null;
  disponibility_date: string | null;
  animal: string | null;
  date_birth: string | null;
  energy: string | null;
  mealhours: string | null;
  name: string | null;
  race: string | null;
  size: string | null;
  walk: string | null;
  latitude: number | null;
  longitude: number | null;
}
export const initialState: LoginState = {
  firstname: null,
  lastname: null,
  avatar: null,
  user_address: null,
  error: null,
  description: null,
  accomodation: null,
  garden: null,
  additionnal_information: null,
  walking_duration: null,
  animal_size: null,
  disponibility_date: null,
  animal: null,
  date_birth: null,
  energy: null,
  mealhours: null,
  name: null,
  race: null,
  size: null,
  walk: null,
  latitude: null,
  longitude: null,
};

export const fetchUser = createAsyncThunk('user/fetch', async () => {
  try {
    const { data } = await axiosInstance.get('/account');

    return data as {
      firstname: string;
      lastname: string;
      avatar: string;
      user_address: string;
      description: string;
      accommodation: string;
      garden: string;
      walking_duration: string;
      additionnal_information: string[];
      animal_size: string[];
      accomodation: string;
      disponibility_date: string;
      animal: string;
      date_birth: string;
      energy: string;
      mealhours: string;
      name: string;
      race: string;
      size: string;
      walk: string;
      latitude: number;
      longitude: number;
    };
  } catch (error) {}
});

const profilReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.avatar = action.payload.avatar;
      state.user_address = action.payload.user_address;
      state.longitude = action.payload.longitude;
      state.latitude = action.payload.latitude;
      state.description = action.payload.description;
      state.garden = action.payload.garden;
      state.animal_size = action.payload.animal_size;
      state.accomodation = action.payload.accomodation;
      state.additionnal_information = action.payload.additionnal_information;
      state.walking_duration = action.payload.walking_duration;
      state.disponibility_date = action.payload.disponibility_date;
      state.animal = action.payload?.animal.type;
      state.date_birth = action.payload?.animal.birth_date;
      state.energy = action.payload?.animal.energy;
      state.mealhours = action.payload?.animal.mealhours;
      state.name = action.payload?.animal.name;
      state.race = action.payload?.animal.race;
      state.size = action.payload?.animal.size;
      state.walk = action.payload?.animal.walk;

      state.error = null;
    })
    .addCase(fetchUser.rejected, (state, action) => {
      state.error = action.payload.response.data;
      state.firstname = null;
    });
});

export default profilReducer;

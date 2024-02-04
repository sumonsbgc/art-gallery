import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// types
import { UserData, Country } from './auth.types';

let accessToken;

if (typeof window !== 'undefined') {
  accessToken = Cookies.get('accessToken');
}

export interface IAuth {
  accessToken: string;
  user: UserData;
  countryList: Country[];
  isAuthModalOpen: boolean;
}

const initialState: IAuth = {
  accessToken: accessToken ?? '',
  user: {
    id: 0,
    name: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    email_verified_at: '',
    mobile: '',
    user_type: '',
    user_photo: '',
    image_path: '',
    address: '',
    user_token: '',
    user_auth_token: '',
    earnings: 0,
    total_product_review: 0,
    total_follower: 0,
    country: {
      country_id: 0,
      country_name: '',
      vat_price: 0,
      country_badges: ''
    },
    city: '',
    zip_code: '',
    profile_heading: '',
    about: '',
    verified: 0,
    created_at: '',
    updated_at: '',
    payment_detail: '',
    is_artist: null,
    is_critic: null
  },
  countryList: [],
  isAuthModalOpen: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      const { data, token } = action.payload;
      state.accessToken = token;
      state.user = data;
      Cookies.set('accessToken', token);
    },
    register: (state, action: PayloadAction<any>) => {
      const { data, token } = action.payload;
      state.accessToken = token;
      state.user = data;
      Cookies.set('accessToken', token);
    },
    logout: (state) => {
      state.accessToken = '';
      Cookies.remove('accessToken');
      state = initialState;
      location.replace('/');
    },
    setProfile: (state, action: PayloadAction<any>) => {
      const { data } = action.payload;
      state.user = data;
    },
    setCountryList: (state, action: PayloadAction<any>) => {
      const { data } = action.payload;
      state.countryList = data;
    },
    openAuthModal: (state) => {
      state.isAuthModalOpen = true;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    }
  }
});

export const {
  login,
  register,
  logout,
  setProfile,
  setCountryList,
  openAuthModal,
  closeAuthModal
} = authSlice.actions;
export default authSlice.reducer;

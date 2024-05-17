//redux
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
//constants
import { JWT_TOKEN } from '@/shared/libs/constants/jwtToken';
//types
import { IUser, UserStateSchema } from '../types/userTypes';

const initialState: UserStateSchema = {
  isLoggedIn: false,
  user: {
    username: '',
    email: '',
    password: '',
    products: []
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.user = initialState.user;
      localStorage.removeItem(JWT_TOKEN);
    }
  }
});

export const { actions: userActions, reducer: userReducer } = userSlice;

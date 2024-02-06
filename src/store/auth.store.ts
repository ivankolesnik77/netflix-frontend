import { PayloadAction, combineReducers, createSlice } from "@reduxjs/toolkit";

interface IAuthSliceState {
  isAuth?: boolean;
  email?: string;
  password?: string;
  token?: string;
}

const userInitialState: IAuthSliceState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState: userInitialState,
  reducers: {
    setAuth: (state) => {
      state.isAuth = true;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const { setAuth, setPassword } = authSlice.actions;

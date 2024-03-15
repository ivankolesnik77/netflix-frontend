import { PayloadAction, combineReducers, createSlice } from "@reduxjs/toolkit";

interface IAuthSliceState {
  isAuth?: boolean | null;
  email?: string;
  password?: string;
  token?: string;
}

const userInitialState: IAuthSliceState = { isAuth: null };

export const authSlice = createSlice({
  name: "auth",
  initialState: userInitialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = !action.payload ? true : action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const { setAuth, setPassword } = authSlice.actions;

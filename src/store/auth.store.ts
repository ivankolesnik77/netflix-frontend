import { PayloadAction, combineReducers, createSlice } from "@reduxjs/toolkit";

interface IAuthSliceState {
  isAuth?: boolean;
  token?: string;
}

const userInitialState: IAuthSliceState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState: userInitialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IAuthSliceState>) => {
      state.isAuth = true;
    },
  },
});

export const { setAuth } = authSlice.actions;

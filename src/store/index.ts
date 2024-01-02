// import { api } from '../services/api';
import { configureStore } from "@reduxjs/toolkit";
import { cartSlice, userSlice } from "./redux.store";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice.reducer,
      user: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
    devTools: true,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

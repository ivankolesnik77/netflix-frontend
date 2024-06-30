// import { api } from '../services/api';
import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './reducers/redux.slice'
import { authSlice } from './reducers/auth.slice'
import { userSlice } from './reducers/user.slice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartSlice.reducer,
            user: userSlice.reducer,
            auth: authSlice.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
        devTools: true,
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

import { PayloadAction, combineReducers, createSlice } from '@reduxjs/toolkit'

interface IAuthSliceState {
    isAuth: boolean | null
    resetPasswordToken: string | null
    password?: string
}

interface ISetAuthData
    extends Pick<IAuthSliceState, 'resetPasswordToken' | 'isAuth'> {}

const userInitialState: IAuthSliceState = {
    isAuth: null,
    resetPasswordToken: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: userInitialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = !action.payload ? true : action.payload
        },
        setAuthData: (state, action: PayloadAction<ISetAuthData>) => {
            const { resetPasswordToken, isAuth } = action.payload
            state.resetPasswordToken = resetPasswordToken
            state.isAuth = isAuth
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
    },
})

export const { setAuthData, setAuth, setPassword } = authSlice.actions

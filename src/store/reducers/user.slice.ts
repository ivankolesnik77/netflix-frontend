import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SubscriptionType } from './redux.slice'

export interface IUserSliceState {
    id?: number
    email: string
    name?: string
    phone?: string
    userName?: string
    subscriptionType?: SubscriptionType
}

const userInitialState: IUserSliceState = { email: '' }

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setUser: (state, action: PayloadAction<Partial<IUserSliceState>>) => {
            state = { ...state, ...action.payload }
            return state
        },
    },
})

export const { setUser } = userSlice.actions

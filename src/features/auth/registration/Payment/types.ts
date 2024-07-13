import { IUserSliceState } from '@/store/reducers/user.slice'

export interface IPaySubscription {
    currentUser: IUserSliceState
    paymentMethodId: string
}

import { IUserSliceState } from '../../../../store/reducers/redux.slice'

export interface IPaySubscription {
    currentUser: IUserSliceState
    paymentMethodId: string
}

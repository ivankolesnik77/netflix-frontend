import { IUserSliceState } from "../../../../store/redux.store";

export interface IPaySubscription {
  currentUser: IUserSliceState;
  paymentMethodId: string;
}

import { PayloadAction, combineReducers, createSlice } from "@reduxjs/toolkit";

export interface IProduct {
  id: number;
  title: string;
  category: string;
  image?: string | null;
}

export interface ICartProduct extends IProduct {
  quantity?: number;
}

interface ICart {
  products: ICartProduct[];
  clientSecret: string | null;
  paymentMethod: string | null;
}

const initialState: ICart = {
  products: [],
  clientSecret: null,
  paymentMethod: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeProducts: (state, action: any) => {
      console.log(action.payload);
      state.products = action.payload;
    },
    increaseCount: (state, action: PayloadAction<number>) => {
      state.products = state.products.map((item) =>
        item.id !== action.payload
          ? item
          : { ...item, quantity: item.quantity ? item.quantity + 1 : 2 },
      );
      sessionStorage.setItem("cart", JSON.stringify(state.products));
    },
    toggle: (state, action: PayloadAction<IProduct>) => {
      const isExist = state.products.some(
        (product) => product.id === action.payload.id,
      );
      if (isExist) {
        state.products = state.products.filter(
          (item) => item.id !== action.payload.id,
        );
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      sessionStorage.setItem("cart", JSON.stringify(state.products));
    },
    setPaymentCredentials: (state, action: PayloadAction<any>) => {
      console.log("token");
      return { ...state, clientSecret: action.payload.clientSecret };
    },
  },
});

export interface IUserSliceState {
  id?: number;
  email?: string;
  name?: string;
  userName?: string;
  subscriptionType?: SubscriptionType;
}

export enum SubscriptionType {
  Basic = "Basic",
  Advanced = "Advanced",
  Premium = "Premium",
}

const userInitialState: IUserSliceState = {};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserSliceState>) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const {
  initializeProducts,
  toggle,
  increaseCount,
  setPaymentCredentials,
} = cartSlice.actions;
export const { setUser } = userSlice.actions;

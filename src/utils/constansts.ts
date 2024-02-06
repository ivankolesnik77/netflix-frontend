import { SubscriptionType } from "../store/redux.store";

export const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "TV Shows",
    href: "/",
  },
  {
    name: "Movies",
    href: "/",
  },
  {
    name: "News & Popular",
    href: "/",
  },
  {
    name: "My List",
    href: "/",
  },
  {
    name: "Browse by Languages",
    href: "/",
  },
];

export const subscriptionRates = {
  [SubscriptionType.Basic]: 10,
  [SubscriptionType.Advanced]: 50,
  [SubscriptionType.Premium]: 15,
};

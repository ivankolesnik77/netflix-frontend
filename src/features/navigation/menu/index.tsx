import Avatar from "/public/images/avatar.png";
import Image from "next/image";
import Link from "next/link";
import { menuItems } from "../../../utils/constants";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { initializeProducts } from "../../../store/redux.store";
import { Cart } from "./components/Cart";

import editProfileSvg from "/public/icons/editProfile.svg";
import transferSvg from "/public/icons/transfer.svg";
import securitySvg from "/public/icons/security.svg";
import accountSvg from "/public/icons/account.svg";
import helpSvg from "/public/icons/help.svg";
import Illustration from "../static/Rolling-1s-200px.svg";
import { useAppSelector } from "../../../utils/hooks";
import { setAuth } from "../../../store/auth.store";
import { Router, useRouter } from "next/router";
const popoverNavItems = [
  {
    title: "Manage Profiles",
    svg: editProfileSvg,
    link: "/profile",
  },
  {
    title: "Transfer Profile",
    svg: transferSvg,
    link: "/profile",
  },
  {
    title: "Account",
    svg: accountSvg,
    link: "/profile",
  },
  {
    title: "Help Center",
    svg: helpSvg,
    link: "/profile",
  },
];

const MenuPopover = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const signOut = () => {
    localStorage.clear();
    dispatch(setAuth(false));
  };
  const router = useRouter();
  const onClick = (index: number) => {
    router.push(popoverNavItems[index].link);
  };
  return (
    <div
      data-popover
      id="popover-user-profile"
      role="tooltip"
      className="invisible absolute -right-0 z-10 inline-block w-48 text-sm  opacity-0  shadow-sm transition-opacity duration-300 group-hover:visible group-hover:opacity-100  "
    >
      <span
        className="my-1 ml-auto mr-2 block h-0 w-0
                            border-b-[7.5px] border-l-[7px]
                            border-r-[7px] border-l-transparent
                            border-r-transparent border-t-white"
      />
      <div className="border border-gray-200 bg-[rgba(0,0,0,0.7)] py-2 text-white dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
        <div className="mb-2 flex items-center px-2">
          <a href="#">
            <img
              className="h-10 w-10 rounded-full"
              src="https://occ-0-7968-1433.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABZ1hPxFNsnCdyahbuw4mR4kErO0wlIZ8tsWFfM53SpC_Lda8LMqECXvTMTRyS2LmVk93kwTfwBksnzECj8NXBqtIw18bYkU.png?r=eb5"
              alt="Jese Leos"
            />
          </a>
          <Image
            src={securitySvg}
            height={15}
            width={15}
            alt="secure"
            className="ml-auto mr-5 invert"
          />
        </div>

        <ul
          className="border-gray border-b-[1px] border-t-[1px] px-2"
          aria-label="Account"
        >
          {popoverNavItems.map((item, key) => (
            <li
              className="mx-1 my-2 flex flex-row gap-4"
              role="listitem"
              key={`popover-list-item-${key}`}
              onClick={() => onClick(key)}
            >
              <Image
                src={item.svg}
                alt={item.svg}
                className=""
                width={15}
                height={15}
              />
              <a
                aria-label="Manage Profiles"
                className="hover:underline"
                href={item.link}
              >
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="border-t-1 border-gray mx-1 my-2 px-2">
          <span className="hover:underline" onClick={signOut}>
            Sign out of Netflix
          </span>
        </div>
      </div>
    </div>
  );
};

const Menu = () => {
  const [isShowCart, setIsShowCart] = useState(false);
  const products = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch();
  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    const data = storedCart ? JSON.parse(storedCart) : [];

    dispatch(initializeProducts(data));
  }, []);

  return (
    <nav className="w-100 flex items-center py-4 font-light text-white md:text-[10px] lg:text-lg">
      <img
        src="/icons/logo.svg"
        alt="logo"
        className="mr-8 md:mr-6 md:w-[90px]"
      />
      <ul className="align font-netflixLight flex grow whitespace-nowrap md:gap-3 lg:justify-center lg:gap-5">
        {menuItems.map((item, key) => (
          <li key={`menu-item-${key}`}>
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-5">
        <img src="/icons/search.svg" alt="logo" width="20" />
        <p className="p-0 ">Kids</p>
        <img src="/icons/bell.svg" alt="logo" width="22" />
        <div className="flex items-center gap-1">
          {!!products.length && (
            <span className="mt-1 font-extrabold text-red-600">
              {products.length}
            </span>
          )}
          <img
            width="25"
            height="25"
            className="invert"
            src="https://cdn-icons-png.flaticon.com/512/118/118096.png"
            onClick={() => setIsShowCart(!isShowCart)}
          />
        </div>

        <div className="flex cursor-pointer items-center">
          <div className="group relative inline-block">
            <Image
              src={Avatar}
              alt="logo"
              width="36"
              data-popover-target="popover-default"
            />
            <MenuPopover />
          </div>
        </div>
      </div>

      {isShowCart && <Cart />}
    </nav>
  );
};

export default Menu;

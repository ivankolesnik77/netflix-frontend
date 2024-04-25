import Avatar from "/public/images/avatar.png";
import Image from "next/image";
import Link from "next/link";
import { menuItems } from "../../../../utils/constants";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { initializeProducts } from "../../../../store/redux.store";
import { Cart } from "./components/Cart";
import classNames from "classnames";
import editProfileSvg from "/public/icons/editProfile.svg";
import transferSvg from "/public/icons/transfer.svg";
import securitySvg from "/public/icons/security.svg";
import accountSvg from "/public/icons/account.svg";
import helpSvg from "/public/icons/help.svg";
import Illustration from "../static/Rolling-1s-200px.svg";
import { useAppSelector } from "../../../../utils/hooks";
import { setAuth } from "../../../../store/auth.store";
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
              <Link
                aria-label="Manage Profiles"
                className="hover:underline"
                href={item.link}
              >
                <span>{item.title}</span>
              </Link>
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
  const router = useRouter();
  const dispatch = useDispatch();
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <nav
      className={classNames(
        "sticky top-0 z-20 flex h-[68px] w-full items-center gap-[21px] py-4  md:px-10  lg:px-[60px]",
        { "bg-[#333]": scrollY > 0 },
      )}
    >
      <Link href="/" type="replace">
        <Image
          width={92.5}
          height={30}
          src="/icons/logo.svg"
          alt="logo"
          className=" h-[30px] md:mr-6 "
        />
      </Link>
      <ul className="flex w-3/5 flex-auto items-center gap-5 whitespace-nowrap font-netflix md:gap-3 lg:gap-5">
        {menuItems.map((item, key) => (
          <li className="leading-[16.8px]" key={`menu-item-${key}`}>
            <Link
              className={classNames(
                "flex text-[14px] leading-[1.2] text-white transition-colors hover:text-gray-300",
                {
                  "font-semibold": item.href == router.route,
                },
              )}
              href={item.href}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-[21px] pl-[6px]">
        <div className="flex items-center">
          <button
            className="searchTab"
            tabIndex={0}
            aria-label="Search"
            data-uia="search-box-launcher"
          >
            <Image src="/icons/search.svg" alt="logo" width="24" height={24} />{" "}
          </button>
        </div>
        <p className="p-0 text-sm text-white">Kids</p>
        <Image src="/icons/bell.svg" alt="logo" width="24" height={20} />

        <div className="flex cursor-pointer items-center">
          <div className="group relative inline-block">
            <div className="flex items-center gap-[10px]">
              <Image
                src={Avatar}
                alt="logo"
                width="32"
                data-popover-target="popover-default"
                className="rounded-lg"
              />
              <span
                className="block h-0 w-0
                            border-l-[5px] border-r-[5px]
                            border-t-[5.5px] border-l-transparent
                            border-r-transparent border-t-white"
              />
            </div>

            <MenuPopover />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;

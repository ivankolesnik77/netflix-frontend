import Avatar from "../../../../public/images/avatar.png";
import Image from "next/image";
import Link from "next/link";
import { menuItems } from "../../../utils/constansts";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { initializeProducts } from "../../../store/redux.store";
import { Cart } from "./components/Cart";

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
          <Image src={Avatar} alt="logo" width="36" />
          <span
            className="ml-2 h-0 w-0 
                            border-l-[5px] border-r-[5px]
                            border-t-[7.5px] border-l-transparent
                            border-r-transparent border-t-white"
          />
        </div>
      </div>
      {isShowCart && <Cart />}
    </nav>
  );
};

export default Menu;

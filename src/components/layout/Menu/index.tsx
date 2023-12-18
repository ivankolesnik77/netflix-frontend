import Avatar from 'public/images/avatar.png';
import Image from 'next/image';
import Link from 'next/link';
import { menuItems } from '../../../utils/constansts';

const Menu = () => {
    return (
        <nav className="flex font-netflixLight text-white  items-center py-4 w-100 md:text-[10px] lg:text-lg">
            <img src="/icons/logo.svg" alt="logo" className="mr-8 md:mr-6 md:w-[90px]" />
            <ul className="flex font-netflixLight lg:gap-5 align whitespace-nowrap lg:justify-center grow md:gap-3">
                {menuItems.map((item, key) => (
                    <li key={key}>
                        <Link href={item.href}>{item.name}</Link>
                    </li>
                ))}
            </ul>
            <div className="flex gap-5 items-center">
                <img src="/icons/search.svg" alt="logo" width="20" />
                <p className="p-0 ">Kids</p>
                <img src="/icons/bell.svg" alt="logo" width="22" />
                <div className="flex items-center cursor-pointer">
                    <Image src={Avatar} alt="logo" width="36" />
                    <span
                        className="ml-2 w-0 h-0 
                            border-l-[5px] border-l-transparent
                            border-t-[7.5px] border-t-white
                            border-r-[5px] border-r-transparent"
                    />
                </div>
            </div>
        </nav>
    );
};

export default Menu;

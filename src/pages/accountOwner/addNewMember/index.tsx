import Image from "next/image";
import React from "react";
import infoSvg from "/public/icons/info.svg";
import inviteCardPng from "/public/images/inviteCard.png";
import Link from "next/link";
import DefaultButton from "@/components/layout/buttons/DefaultButton";
const benefits = [
  "Their own account and password",
  "An existing profile or a new one",
  "All of Netflix on 1 device at a time",
];

const AddNewMember = () => {
  return (
    <div className="mx-auto h-[91vh] w-full bg-white text-primary">
      <div className="mx-auto my-5 mt-16 max-w-[440px]">
        <Image src={inviteCardPng} width={120} alt="info" className="mb-2" />
        <h2 className="font-bold text-[32px] leading-10">
          Invite an extra member to enjoy all of Netflix
        </h2>
        <p className="text mb-4 mt-5 whitespace-nowrap font-bold text-lg">
          For EUR 2.99 a month, they get:
        </p>
        <ul className="space-y-4 text-left  ">
          {benefits.map((benefit, key) => (
            <li
              key={`benefit-${key}`}
              className="flex items-center space-x-3 whitespace-nowrap rtl:space-x-reverse"
            >
              <svg
                className="h-7 w-7 flex-shrink-0 text-red-700 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 28 21"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2 9.667L10.828 19.5 26 2"
                />
              </svg>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <div className="my-4 mb-5 flex gap-2">
          <Image
            src={infoSvg}
            width={15}
            height={15}
            alt="info"
            className="max-h-[15px] invert"
          />
          <span className="text-sm text-black">
            Extra members need to set up their account in the country where you
            started your membership.
          </span>
        </div>
        <Link href={"/accountOwner/memberInfo"}>
          <DefaultButton value="Next" className="w-full rounded " />
        </Link>
      </div>
    </div>
  );
};

export default AddNewMember;

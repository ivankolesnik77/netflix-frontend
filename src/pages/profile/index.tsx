import Image from "next/image";
import React, { useEffect, useState } from "react";
import premiumSvg from "/public/icons/premium.svg";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

const Profile = () => {
  const [isTooltip, setIsTooltip] = useState(false);

  return (
    <div className="bg-[#f2f2f2]">
      <div className="container mx-auto my-5 max-w-[1024px]  text-base font-medium  text-gray-700">
        <div className="flex items-center gap-5 border-b-[1px] border-gray-500 pb-5">
          <h3 className="text-4xl">Account</h3>
          <div className="flex items-center gap-2">
            <img
              src="https://assets.nflxext.com/ffe/siteui/account/svg/membersince.svg"
              alt=""
            />
            <p>Member Since July 2020</p>
          </div>
        </div>
        <div className="border-gray flex border-b-[1px] pb-5 pt-2">
          <div className="w-[28%]">
            <p className="text-gr text-lg text-gray-300">
              MEMBERSHIP & BILLING
            </p>
            <div className="">Cancel Membership</div>
          </div>
          <div className="w-[72%]">
            <div>
              <div className="flex justify-between ">
                <p>apximax@gmail.com</p>
                <a href="">Change account email</a>
              </div>
              <div className="flex justify-between">
                <p>Password: ********</p>
                <a href="">Change password</a>
              </div>
              <div className="flex justify-between">
                <p>Phone: 050 170 4692</p>
                <a href="">Change phone number</a>
              </div>
            </div>
            <br />
            <div>
              <div className="flex justify-between">
                <div className="flex ">
                  <img
                    src="	https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/MASTERCARD.png"
                    alt=""
                  />
                  <span> MASTERCARD •••• •••• •••• 2115</span>
                </div>
                <a href="">Manage payment method</a>
              </div>
              <div className="flex justify-between ">
                <span>Your next billing date is March 29, 2024.</span>
                <a href="">Add backup payment method</a>
              </div>
              <div className="ml-auto">
                <a href="">Billing details</a>
              </div>
            </div>
            <br />
          </div>
        </div>
        <div className="border-gray flex border-b-[1px] pb-5 pt-2">
          <p className="text-gr min-w-[28%] text-lg text-gray-300">
            PLAN DETAILS
          </p>
          <div className="flex justify-between">
            <p>Premium</p>
            <Image src={premiumSvg} alt="" height={20} />
          </div>
          <a href="" className="ml-auto">
            Change plan
          </a>
        </div>
        <div className="border-gray flex border-b-[1px] pb-5 pt-2">
          <div className="text-gr min-w-[28%] text-lg text-gray-300">
            <p> SECURITY & PRIVACY</p>
          </div>

          <p className="max-w-[30%]">
            Control access to this account, view the most recently active
            devices and more.
          </p>

          <div className="ml-auto">
            <div className="ml-auto flex">
              <div className="mr-1 rounded-lg bg-[#0f84fa] px-1 pt-[2px] text-sm font-semibold text-white">
                New
              </div>
              <a href="">NEW Manage access and devices</a>
            </div>
            <div className="flex justify-end">
              <a href="">Sign out of all devices</a>
            </div>
            <div className="flex justify-end">
              <a href="">Download your personal information</a>
            </div>
          </div>
        </div>
        <div className="border-gray flex   border-b-[1px] pb-5 pt-2">
          <p className="text-gr min-w-[28%] text-lg text-gray-300">
            EXTRA MEMBERS
          </p>
          <div className="ml-auto">
            <p>
              Share your Netflix with someone who doesn’t live with you by
              adding an extra member. Learn more in our Help Center.
            </p>
            <a href="">Help Center</a>.
          </div>
          <div className="relative">
            <Link
              href="/accountOwner/addNewMember"
              data-tooltip-target="tooltip-invite"
              className="ml-auto text-end"
            >
              Buy an extra member slot
            </Link>

            {isTooltip && (
              <div
                id="tooltip-default"
                role="tooltip"
                className="tooltip absolute -bottom-5 -left-4 z-10 inline-block whitespace-nowrap rounded-lg bg-blue-300 px-5 py-2 text-sm font-medium text-white  shadow-sm transition-opacity duration-300 dark:bg-gray-700"
              >
                <div className="absolute -top-2 left-16 h-0 w-0 border-x-8 border-b-[9px] border-x-transparent border-b-blue-300"></div>
                Invite was copied!
              </div>
            )}
          </div>
        </div>
        <div className="flex pb-5 pt-2">
          <p className="text-gr w-[28%] whitespace-pre-wrap text-lg text-gray-300 ">
            PROFILE & PARENTAL CONTROLS
          </p>
          <div>
            <div className="flex  justify-between">
              <div className="flex ">
                <img
                  className="mr-2 h-10 w-10 rounded-full"
                  src="https://occ-0-7968-1433.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABZ1hPxFNsnCdyahbuw4mR4kErO0wlIZ8tsWFfM53SpC_Lda8LMqECXvTMTRyS2LmVk93kwTfwBksnzECj8NXBqtIw18bYkU.png?r=eb5"
                  alt="Jese Leos"
                />
                <div>
                  <p>Viktor</p>
                  <p>All Maturity Ratings</p>
                </div>
              </div>
              <div>
                <Image
                  src="/public/icons/security.svg"
                  alt=""
                  width="15"
                  height="15"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

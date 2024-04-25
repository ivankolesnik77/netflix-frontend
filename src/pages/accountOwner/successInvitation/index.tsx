import Image from "next/image";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import memberIcon from "/public/images/avatar.png";
import DefaultButton from "@/components/layout/buttons/DefaultButton";
import Link from "next/link";
import { useRouter } from "next/router";

interface IFormInput {
  email: string;
  name: string;
  fromName: number;
}

const SuccessInvitation = () => {
  const router = useRouter();
  const { name, email } = router.query;

  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-[500px] flex-col gap-2 pb-8 pt-5 text-gray-500">
        <h1 className="mb-3 mt-5   text-4xl text-black">
          <b>Success! Invitation sent</b>
        </h1>
        <p className=" mb-3 text-xl text-black">
          {"You don't need to lift a finger from here."}
        </p>

        <div className="my-1 flex border border-gray-400">
          <Image className="h-16 w-16" src={memberIcon} alt="member icon" />
          <div className="ml-3 flex flex-col justify-center gap-1">
            <p className="text-md m-0 text-black">
              <b>{name}</b>
            </p>
            <p className="m-0 text-sm text-black">{email}</p>
          </div>
        </div>
        <p className=" mb-3 text-xl text-black">
          Remember: You can update your membership at any time in your Account.
        </p>
        <Link href="/">
          <DefaultButton value="Back to Netflix" className="w-full rounded" />
        </Link>
      </div>
    </div>
  );
};

export default SuccessInvitation;

import React from "react";

const Footer = () => {
  return (
    <div className="font-netflix mx-auto mt-[100px] flex gap-10 gap-8  pl-[30px] text-[16px] leading-relaxed text-slate-400">
      <ul className="flex min-w-[300px] flex-col gap-2">
        <li className="hover:text-white">Audio and Subtitle</li>
        <li className="hover:text-white">Media</li>
        <li className="hover:text-white">Privacy</li>
        <li className="hover:text-white">Contact Us</li>
      </ul>
      <ul className="flex min-w-[300px] flex-col gap-2">
        <li className=" hover:text-white">Subtitle</li>
        <li className="hover:text-white">Investor</li>
        <li className="hover:text-white">Notice</li>
        <li className="">Help Center</li>
      </ul>
      <ul>
        <li className="hover:text-white">Jobs</li>
        <li className="">Gift</li>
        <li className="hover:text-white">Subscription</li>
      </ul>
    </div>
  );
};

export default Footer;

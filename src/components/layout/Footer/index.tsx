import React from 'react';

const Footer = () => {
    return (
        <div className=" flex gap-10 mt-[100px] font-netflix font-normal text-slate-400 font-[16px] pl-[30px] leading-relaxed">
            <ul className=" ">
                <li className="hover:text-white">Audio and Subtitle</li>
                <li className="hover:text-white">Media</li>
                <li className="hover:text-white">Privacy</li>
                <li className="hover:text-white">Contact Us</li>
                <li className="mt-2 hover:text-white">Subtitle</li>
            </ul>
            <ul>
                <li className="hover:text-white">Investor</li>
                <li className="hover:text-white">Notice</li>
                <li className="mt-2">Help Center</li>
                <li className="hover:text-white">Jobs</li>
                <li className="mt-2">Gift</li>
                <li className="hover:text-white">Subscription</li>
            </ul>
        </div>
    );
};

export default Footer;

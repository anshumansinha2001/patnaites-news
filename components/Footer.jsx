import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-around flex-col gap-4 sm:gap-0 sm:flex-row bg-black text-white py-5 items-center">
      {/* Logo */}
      <Link
        href="/"
        className="text-sm sm:text-lg font-medium font-serif tracking-widest uppercase 
        hover:cursor-pointer underline underline-offset-4 
        decoration-4 decoration-dotted"
      >
        Patnaites News
      </Link>
      <p className="text-xs md:text-sm">
        &copy; Patnaites News 2024. All rights reserved.
      </p>
      <div className="flex gap-2">
        <Image src={assets.facebook_icon} alt="facebook" width={40} />
        <Image src={assets.twitter_icon} alt="twitter" width={40} />
        <Image src={assets.googleplus_icon} alt="googleplus" width={40} />
      </div>
    </div>
  );
};

export default Footer;

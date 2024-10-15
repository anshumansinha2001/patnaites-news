import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg md:text-2xl font-medium text-[#ff0000] font-serif tracking-widest uppercase 
        hover:cursor-pointer underline underline-offset-4 
        decoration-4 decoration-dotted"
        >
          Patnaites News
        </Link>
        {/* Get Started Button */}
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black border-solid shadow-[-7px_7px_0px_#ff0000] text-xs sm:text-base active:bg-black active:text-white">
          Get Started <Image src={assets.arrow} alt="arrow" />
        </button>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest News</h1>
        <p className="mt-10 max-w-[740px] mx-auto text-xs sm:text-base">
          Stay informed with the most up-to-date and reliable news on local and
          global events.
        </p>
        {/* NewsLetter */}
        <form
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mt-10 mx-auto border border-black shadow-[-7px_7px_0px_#ff0000]"
          action=""
        >
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="pl-4 outline-none"
          />
          <button
            type="submit"
            className="border-l border-black py-4 px-4 sm:px-8 active:bg-[#ff0000] active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;

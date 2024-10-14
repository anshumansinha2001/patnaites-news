import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const NewsCard = ({ image, title, description, category }) => {
  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#ff0000] rounded-lg overflow-hidden">
      <Image
        src={image}
        alt={title || "image"}
        width={400}
        height={400}
        className="border-b border-black transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
      />
      <p className="ml-5 mt-5 px-1 inline-block bg-[#ff0000] text-white text-sm">
        {category}
      </p>
      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="mb-3 text-sm tracking-tight text-grey-700">
          {description}
        </p>
        <div className="inline-flex items-center py-2 font-semibold text-center hover:cursor-pointer">
          Read more
          <Image src={assets.arrow} className="ml-2" alt="arrow" width={12} />
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

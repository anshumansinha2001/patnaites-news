"use client";
import { blog_data, assets } from "@/assets/assets";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const [post, setPost] = useState(null);

  const fetchNewspost = () => {
    // TODO: Fetch news post from API
    for (let i = 0; i < blog_data.length; i++) {
      if (params.slug === blog_data[i].slug) {
        setPost(blog_data[i]);
        // console.log(blog_data[i]);
        break;
      }
    }
  };

  useEffect(() => {
    fetchNewspost();
  }, []);

  // Handle the case where post hasn't been fetched yet
  if (!post || !post.title) {
    return <p>POST NOT FOUND</p>;
  }
  return (
    <>
      <div className="bg-gray-100 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg md:text-2xl font-medium text-black font-serif tracking-widest uppercase 
     hover:cursor-pointer underline underline-offset-4
     decoration-4 decoration-dotted"
          >
            Patnaites News
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black border-solid shadow-[-7px_7px_0px_#000000] text-xs sm:text-base active:bg-[#ff0000] active:text-white"
          >
            Return Home <Image src={assets.arrow} alt="arrow" />
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[800px] mx-auto">
            {post.title}
          </h1>
          <p className="mt-5 md:mt-10 max-w-[740px] mx-auto text-xs sm:text-base">
            - {post.author}
          </p>
        </div>
      </div>
      {/* Page Image */}
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-80px] mb-10">
        <Image
          className="rounded-md shadow-md border-4 border-white"
          src={post.image}
          alt={post.title || "image"}
          width={1280}
          height={720}
        />
        <div className="flex justify-between items-center my-4 md:my-8">
          <p className="px-1 inline-block bg-black text-white text-sm md:text-base">
            {post.category}
          </p>
          <span className="text-sm md:text-base">
            {moment(post.date).fromNow()}
          </span>
        </div>
        <p>{post.description}</p>
      </div>
    </>
  );
};

export default Page;

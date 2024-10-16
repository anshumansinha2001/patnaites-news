import { blog_data, assets } from "@/assets/assets";
import Footer from "@/components/Footer";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const post = blog_data.find((post) => post.slug === params.slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "The post you are looking for does not exist.",
    };
  }

  const absoluteImageUrl =
    post.image?.src && post.image.src.startsWith("http")
      ? post.image.src
      : `https://patnaitesnews.vercel.app${
          post.image.src || "/path-to-your-default-image.jpg"
        }`;

  return {
    title: `${post.title} | Patnaites News`,
    description: post.description,
    alternates: {
      canonical: `https://patnaitesnews.vercel.app/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://patnaitesnews.vercel.app/${params.slug}`,
      siteName: "Patnaites News",
      type: "article",
      publishedTime: moment(post.date).format("YYYY-MM-DD"),
      images: [
        {
          url: absoluteImageUrl,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [absoluteImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const Page = async ({ params }) => {
  let post = null;

  // TODO: Add API call to get post data
  for (let i = 0; i < blog_data.length; i++) {
    if (params.slug === blog_data[i].slug) {
      post = blog_data[i];
      console.log(post.image.src);
      break;
    }
  }

  // Handle the case where the post doesn't exist
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
            href="/report"
            className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black border-solid shadow-[-7px_7px_0px_#000000] text-xs sm:text-base active:bg-[#ff0000] active:text-white"
          >
            Report <Image src={assets.arrow} alt="arrow" />
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
        {/* Placeholder content */}
        <h3 className="my-5 text-[18px] font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, at!
        </h3>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, at!
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque
        </p>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, at!
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque
        </p>

        {/* Social sharing */}
        <div className="my-24">
          <div className="font-semibold my-4">
            Share this news on your social media.
            <div className="flex">
              <Image src={assets.facebook_icon} alt="facebook" width={50} />
              <Image src={assets.twitter_icon} alt="twitter" width={50} />
              <Image src={assets.googleplus_icon} alt="googleplus" width={50} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;

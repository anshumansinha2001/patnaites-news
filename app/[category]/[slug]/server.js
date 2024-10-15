// server.js
import { blog_data } from "@/assets/assets";

export async function generateMetadata({ params }) {
  const post = blog_data.find((post) => post.slug === params.slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "The post you are looking for does not exist.",
    };
  }

  return {
    title: post.title, // Dynamic title
    description: post.description, // Dynamic description
    openGraph: {
      title: post.title, // Make sure this is properly used
      description: post.description,
      images: [post.image || "/path-to-your-default-image.jpg"],
      url: `https://patnaitesnews.vercel.app/${params.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title, // Dynamic title for Twitter
      description: post.description,
      images: [post.image || "/path-to-your-default-image.jpg"],
    },
  };
}

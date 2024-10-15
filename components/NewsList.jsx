import { blog_data } from "@/assets/assets";
import NewsCard from "./NewsCard";
import { useEffect, useState } from "react";

const NewsList = () => {
  const [menu, setMenu] = useState("All");
  const [isSticky, setIsSticky] = useState(false);

  // Extract unique categories from blog_data
  // TODO: Add categories from API
  const categories = [
    "All",
    ...new Set(blog_data.map((blog) => blog.category)),
  ];

  // Adding an effect to track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top function
  const handleMenuChange = (newMenu) => {
    setMenu(newMenu);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Adds smooth scrolling effect
    });
  };

  return (
    <div>
      {/* for Categories List */}
      <div
        className={`${
          isSticky ? "shadow-lg" : ""
        } transition-shadow duration-300 sticky top-0 flex justify-start md:justify-center gap-6 my-6 p-2 md:p-4 bg-white z-10 overflow-y-auto`}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleMenuChange(category)}
            className={
              menu === category
                ? "bg-[#ff0000] text-white py-1 px-4 rounded-sm"
                : undefined
            }
          >
            {category}
          </button>
        ))}
      </div>

      {/* for news cards */}
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blog_data.filter((blog) =>
          menu === "All" ? true : blog.category === menu
        ).length === 0 ? (
          <h3 className="text-center text-gray-500">No news found!</h3>
        ) : (
          blog_data
            .filter((blog) => (menu === "All" ? true : blog.category === menu))
            .map((blog) => <NewsCard key={blog.id} {...blog} />)
        )}
      </div>
    </div>
  );
};

export default NewsList;

import config from "@config/config.json";
import social from "@config/social.json";
import ImageFallback from "@layouts/components/ImageFallback";
import Logo from "@layouts/components/Logo";
import Social from "@layouts/components/Social";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useState } from "react";
import { FaRegCalendar } from "react-icons/fa";

const { blog_folder } = config.settings;
const { about, featured_posts, newsletter } = config.widgets;

const Sidebar = ({ posts, className }) => {
  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter((post) => post.frontmatter.featured);

  const [showRecent, setShowRecent] = useState(true);

  return (
    <aside className={`${className} px-0 lg:col-4 lg:px-6`}>
      {about.enable && (
        <div className="relative rounded border border-border p-6 text-center dark:border-darkmode-border">
          <ImageFallback
            className="-z-[1]"
            src="/images/map.svg"
            fill={true}
            alt="bg-map"
          />
          <Logo />
          {about.content && markdownify(about.content, "p", "mt-8")}
          <Social
            className="socials sidebar-socials mt-6 justify-center"
            source={social}
          />
        </div>
      )}

      {featured_posts.enable && (
        <div className="mt-6 rounded border border-border p-6 dark:border-darkmode-border">
          <h4 className="section-title mb-12 text-center">Featured</h4>
          <div className="mb-12 flex items-center justify-center">
            <button
              className={`btn px-5 py-2 ${
                showRecent ? "btn-outline-primary" : "btn-primary"
              }`}
              onClick={() => setShowRecent(false)}
            >
              Featured
            </button>
            <button
              className={`btn ml-3  px-5 py-2 ${
                showRecent ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setShowRecent(true)}
            >
              Recent
            </button>
          </div>
          {showRecent
            ? sortPostByDate
                .slice(0, featured_posts.showPost)
                .map((post, i, arr) => (
                  <div
                    className={`flex items-center ${
                      i !== arr.length - 1 &&
                      "mb-6 border-b border-border pb-6 dark:border-darkmode-border"
                    }`}
                    key={`key-${i}`}
                  >
                    {post.frontmatter.image && (
                      <ImageFallback
                        className="mr-3 h-[85px] w-[85px] rounded-full object-cover"
                        src={post.frontmatter.image}
                        alt={post.frontmatter.title}
                        width={105}
                        height={85}
                      />
                    )}
                    <div>
                      <h3 className="h5 mb-2">
                        <Link
                          href={`/${blog_folder}/${post.slug}`}
                          className="block hover:text-primary"
                        >
                          {post.frontmatter.title}
                        </Link>
                      </h3>
                      <p className="inline-flex items-center font-secondary text-xs">
                        <FaRegCalendar className="mr-1.5" />
                        {dateFormat(post.frontmatter.date)}
                      </p>
                    </div>
                  </div>
                ))
            : featuredPosts
                .slice(0, featured_posts.showPost)
                .map((post, i, arr) => (
                  <div
                    className={`flex items-center pb-6 ${
                      i !== arr.length - 1 &&
                      "mb-6 border-b dark:border-b-darkmode-border"
                    }`}
                    key={`key-${i}`}
                  >
                    {post.frontmatter.image && (
                      <ImageFallback
                        className="mr-3 h-[85px] w-[85px] rounded-full object-cover"
                        src={post.frontmatter.image}
                        alt={post.frontmatter.title}
                        width={105}
                        height={85}
                      />
                    )}
                    <div>
                      <h3 className="h5 mb-2">
                        <Link
                          href={`/${blog_folder}/${post.slug}`}
                          className="block hover:text-primary"
                        >
                          {post.frontmatter.title}
                        </Link>
                      </h3>
                      <p className="inline-flex items-center font-secondary text-xs">
                        <FaRegCalendar className="mr-1.5" />
                        {dateFormat(post.frontmatter.date)}
                      </p>
                    </div>
                  </div>
                ))}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;


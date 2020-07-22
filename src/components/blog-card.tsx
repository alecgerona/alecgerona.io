import * as React from "react";
import { Link } from "gatsby";

interface ProjectCardProps {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  slug: string;
}

const BlogCard: React.FC<ProjectCardProps> = ({
  title,
  excerpt,
  date,
  slug,
  readingTime,
}) => {
  return (
    <div className="text-white light:text-black m-6 max-w-2xl project-card mt-10">
      <Link to={slug}>
        <p className="flex text-xl font-sans text-primary-light">{title}</p>
      </Link>
      <p className="text-left mt-6 text-sm leading-7 tracking-wide">
        {excerpt}
      </p>
      <div className="text-sm mt-6 flex tracking-wide leading-7 font-bold">
        <span>{date}</span>
        <span className="ml-6 text-orange uppercase">{readingTime}</span>
      </div>
    </div>
  );
};
export default BlogCard;

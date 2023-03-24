import * as React from "react";
import { Link } from "gatsby";

interface ProjectCardProps {
  title: string;
  description: string;
  date: string;
  timeToRead: number;
  slug: string;
}

const BlogCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  date,
  slug,
  timeToRead,
}) => {
  return (
    <Link to={slug}>
      <div className="text-white light:text-black m-6 max-w-2xl project-card mt-10">
        <p className="flex text-xl font-sans text-primary-light">{title}</p>
        <p className="text-left mt-6 text-sm leading-7 tracking-wide">
          {description}
        </p>
        <div className="text-sm mt-6 flex tracking-wide leading-7 font-bold">
          <span>{date}</span>
          <span className="ml-6 text-orange uppercase">{timeToRead} min read</span>
        </div>
      </div>
    </Link>
  );
};
export default BlogCard;

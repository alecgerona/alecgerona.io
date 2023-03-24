import * as React from "react";
import { graphql, StaticQuery } from "gatsby";
import BlogCard from "../components/blog-card";

interface FieldProps {
  slug: string;
}

interface FrontmatterProps {
  date: string;
  title: string;
  description: string;
}

interface NodeProps {
  timeToRead: number;
  frontmatter: FrontmatterProps;
  fields: FieldProps;
}

interface PostProps {
  node: NodeProps;
}

const FeaturedBlogs: React.FC = () => (
  <StaticQuery
    query={graphql`
      query {
        posts: allMarkdownRemark(
          sort: { order: DESC, fields: frontmatter___date }
        ) {
          edges {
            node {
              timeToRead
              frontmatter {
                title
                description
                date(formatString: "MMMM DD, YYYY")
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      return (
        <div className="max-w-2xl m-auto mt-10">
          <div className="text-center mb-10">
            <span className="text-3xl text-white light:text-gray-900">
              featured<span className="text-green">Blog</span>
            </span>
          </div>

          {data.posts.edges.map((post: PostProps) => {
            return (
              <BlogCard
                key={post.node.fields.slug}
                date={post.node.frontmatter.date}
                description={post.node.frontmatter.description}
                timeToRead={post.node.timeToRead}
                title={post.node.frontmatter.title}
                slug={post.node.fields.slug}
              />
            );
          })}
        </div>
      );
    }}
  />
);

export default FeaturedBlogs;

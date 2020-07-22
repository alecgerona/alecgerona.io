import * as React from "react";
import { graphql, StaticQuery } from "gatsby";
import BlogCard from "../components/blog-card";

interface ReadingTimeProps {
  text: string;
}

interface FieldProps {
  readingTime: ReadingTimeProps;
  slug: string;
}

interface FrontmatterProps {
  date: string;
  title: string;
}

interface NodeProps {
  excerpt: string;
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
              frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
              }
              excerpt(pruneLength: 160)
              fields {
                readingTime {
                  text
                }
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
                excerpt={post.node.excerpt}
                readingTime={post.node.fields.readingTime.text}
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

import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import SEO from "../components/seo";
import BlogLayout from "../components/blog-layout";

// @ts-ignore
import { Disqus } from "gatsby-plugin-disqus";

interface BlogPostTemplateProps {
  data: any;
  pageContext: any;
  location: any;
}

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({
  data,
  pageContext,
}) => {
  const GITHUB_USERNAME = `alecgerona`;
  const GITHUB_REPO_NAME = `alecgerona.io`;
  const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/content/posts${pageContext.slug}index.md`;
  const post = data.markdownRemark;
  const { previous, next } = pageContext;
  const image = post.frontmatter.featuredImage
    ? post.frontmatter.featuredImage.childImageSharp.resize
    : null;
  const disqusConfig = {
    url: GITHUB_REPO_NAME + pageContext.slug,
    identifier: pageContext.slug,
    title: post.frontmatter.title,
  };

  return (
    <BlogLayout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={image}
      />
      <article>
        {post.frontmatter.featuredImage && (
          <div className="mb-5">
            <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />
            <div className="mt-3 text-white light:text-gray-700 text-sm text-center">
              {post.frontmatter.caption}
            </div>
          </div>
        )}
        <header className="text-white light:text-gray-700 text-center">
          <span className="font-sans text-center font-black text-4xl">
            {post.frontmatter.title}
          </span>
          <div className="flex justify-center mt-3">
            <span>{post.frontmatter.date}</span>
            <span className="font-sans ml-8">
              {post.fields.readingTime.text}
            </span>
          </div>
        </header>

        <section
          className="my-10 prose prose-lg font-serif"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <a
          className="text-primary-light mt-6"
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Questions? Typos? Violent reactions? Help me improve this post.
        </a>
        <hr className="mt-6 mb-3" />
      </article>
      <nav>
        <ul className="flex flex-col p-0 text-primary-light sm:flex-row sm:justify-between">
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li className="text-right">
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <Disqus config={disqusConfig} />
    </BlogLayout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
        caption
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`;

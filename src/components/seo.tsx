/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

interface MetaWithName {
  name: string;
  content: string;
}

interface MetaWithProperty {
  property: string;
  content: string;
}

interface MetaImage {
  src: string;
  height: number;
  width: number;
}

interface SEOProps {
  description?: string;
  lang?: string;
  meta?: MetaWithProperty[] | MetaWithName[];
  image?: MetaImage;
  title: string;
}

const SEO: React.FC<SEOProps> = ({ description, lang, meta, image, title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const imageSrc =
    image && image.src ? `${site.siteMetadata.siteUrl}${image.src}` : null;
  console.log(image, "image");
  console.log(imageSrc, "imageSrc");

  return (
    <Helmet
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          imageSrc
            ? [
                {
                  property: "og:image",
                  content: imageSrc,
                },
                {
                  property: "og:image:width",
                  content: image.width,
                },
                {
                  property: "og:image:height",
                  content: image.height,
                },
                {
                  name: "twitter:card",
                  content: "summary_large_image",
                },
              ]
            : [
                {
                  name: "twitter:card",
                  content: "summary",
                },
              ]
        )
        .concat(meta)}
    >
      <html lang={lang} />
    </Helmet>
  );
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

export default SEO;

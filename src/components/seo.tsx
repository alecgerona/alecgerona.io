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
  const { site, siteImage } = useStaticQuery(
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
        siteImage: file(relativePath: { eq: "alecgerona-share-photo.jpg" }) {
          childImageSharp {
            resize(width: 1200) {
              src
              width
              height
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const imageDetails =
    image && image.src ? image : siteImage.childImageSharp.resize;

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
        .concat([
          {
            property: "og:image",
            content: `${site.siteMetadata.siteUrl}${imageDetails.src}`,
          },
          {
            property: "og:image:width",
            content: imageDetails.width,
          },
          {
            property: "og:image:height",
            content: imageDetails.height,
          },
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
        ])
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

import * as React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Intro from "../sections/intro";
import Frontend from "../sections/frontend";
import Backend from "../sections/backend";
import FeaturedBlogs from "../sections/featured-blogs";

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <Intro />
    <Frontend />
    <Backend />
    <FeaturedBlogs />
  </Layout>
);

export default IndexPage;

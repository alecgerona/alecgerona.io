import * as React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { Link } from "gatsby";

const NotFoundPage: React.FC = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className="h-intro flex flex-col justify-center text-center max-w-2xl m-auto text-white light:text-gray-900 -mt-32">
      <div className="mx-6">
        <h1 className="text-6xl font-bold">NOT FOUND</h1>
        <p className="text-4xl">Seems like you took a wrong turn.</p>
        <Link className="text-2xl text-primary-light" to="/">
          Take me back.
        </Link>
      </div>
    </div>
  </Layout>
);

export default NotFoundPage;

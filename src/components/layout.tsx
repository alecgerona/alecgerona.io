/*
:author: Alexandre Gerona
:copyright: 2020-Present by Alexandre Gerona.
:license: MIT, see LICENSE for more details.
*/

import * as React from "react";
import { StaticQuery, graphql } from "gatsby";

import Header from "./header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={() => (
      <div className="bg-primary-dark light:bg-offwhite transition-all duration-200 ease-linear antialiased font-sans">
        <Header />
        <div>
          <main>{children}</main>
          <footer className="text-white light:text-black max-w-2xl mt-auto mx-auto mb-6 px-6 pt-12 pb-6">
            © {new Date().getFullYear()}, Alexandre Gerona
            {` `}
          </footer>
        </div>
      </div>
    )}
  />
);

export default Layout;

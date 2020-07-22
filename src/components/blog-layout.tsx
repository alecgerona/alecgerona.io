import React from "react";
// @ts-ignore
import Header from "./header";

interface BlogLayoutProps {
  children: React.ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="ml-auto mr-auto mb-10 max-w-2xl pt-10 px-5">
        <main>{children}</main>
        <footer className="text-white light:text-black m-6 mt-10">
          © {new Date().getFullYear()}, Alexandre Gerona
        </footer>
      </div>
    </div>
  );
};

export default BlogLayout;

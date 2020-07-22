import * as React from "react";
import DarkModeToggle from "./dark-mode-toggle";
import { Link } from "gatsby";

const Header: React.FC = () => {
  return (
    <div className="">
      <header className="flex justify-between px-4 py-3 max-w-2xl m-auto">
        <Link className="mt-2" to="/">
          <span className="text-2xl font-sans text-primary-light cursor-pointer font-bold">
            alecgerona.io
          </span>
        </Link>
        <div className="cursor-pointer flex text-primary-light">
          <DarkModeToggle />
        </div>
      </header>
    </div>
  );
};
export default Header;

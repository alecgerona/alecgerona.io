import * as React from "react";
import Social from "../components/social";
import ArrowDown from "../components/icons/arrow-down";

const realInterests = [
  `Troy and Abed`,
  `High School Musical`,
  `videogamedunkey`,
  `Melon Lord`,
  `General Kenobi`,
  `Arthur Morgan`,
  `Hamilton`,
  `Spider-man`,
  `Battlestar Galactica`,
];

const Intro: React.FC = () => {
  return (
    <div className="h-intro flex flex-col justify-center text-center text-white light:text-gray-900 max-w-2xl m-auto -mt-16">
      <span className="text-6xl mx-6 font-medium leading-none">
        alec gerona
      </span>
      <Social className="mt-10" />
      <span className="mt-10 mx-8 relative font-sans">
        Hi! I’m Alec. I’m a programmer who develop across multiple
        platforms—Web, Frontend, Backend, and Mobile. Here I write about my
        interests: coding (and my misadventures with it) and{" "}
        <del>{realInterests[(realInterests.length * Math.random()) | 0]}</del>.
      </span>
      <div className="absolute bottom-0 mb-6 self-center">
        <ArrowDown />
      </div>
    </div>
  );
};
export default Intro;

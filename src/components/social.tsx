import * as React from "react";
import StackOverflow from "./icons/stack-overflow";
import Github from "./icons/github";
import Gitlab from "./icons/gitlab";
import Linkedin from "./icons/linkedin";
import { animated, useTrail } from "react-spring";

const Social: React.FC<{ className?: string }> = ({ className }) => {
  const SocialItems = [
    <StackOverflow key="1" />,
    <Github key="2" />,
    <Gitlab key="3" />,
    <Linkedin key="4" />,
  ];
  const trail = useTrail(SocialItems.length, {
    opacity: 1,
    marginTop: 0,
    from: { opacity: 0, marginTop: -75 },
  });

  return (
    <div className={className}>
      <div className="flex flex-row justify-center">
        {trail.map((props, index) => (
          <animated.div key={index} style={props}>
            {SocialItems[index]}
          </animated.div>
        ))}
      </div>
    </div>
  );
};
export default Social;

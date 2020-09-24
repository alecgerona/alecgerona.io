import * as React from "react";
import Android from "./android";
import Angular from "./angular";
import Django from "./django";
import Flask from "./flask";
import Gatsby from "./gatsby";
import Python from "./python";
import Nuxt from "./nuxt";

interface FrameworkIconProps {
  icon: string;
}

const FrameworkIcon: React.FC<FrameworkIconProps> = ({ icon }) => {
  const icons: { [Key: string]: React.FC } = {
    android: Android,
    angular: Angular,
    django: Django,
    flask: Flask,
    gatsby: Gatsby,
    python: Python,
    nuxt: Nuxt,
  };
  const Icon = icons[icon];
  return <Icon />;
};
export default FrameworkIcon;

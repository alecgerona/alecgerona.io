import * as React from "react";
import projects from "../data/projects.json";
import ProjectCard from "../components/project-card";

const Frontend: React.FC = () => {
  return (
    <div className="flex flex-col mt-20 justify-center text-center text-white light:text-black">
      <span className="text-3xl">
        featured<span className="text-green">Frontend</span>
      </span>
      <div className="m-auto mt-6 md:flex">
        {projects.frontend.map(
          ({ name, photo, description, source, frameworks, url }) => {
            return (
              <ProjectCard
                key={name}
                name={name}
                photo={photo}
                description={description}
                source={source}
                frameworks={frameworks}
                url={url}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default Frontend;

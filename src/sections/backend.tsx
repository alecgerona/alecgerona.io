import * as React from "react";
import projects from "../data/projects.json";
import ProjectCard from "../components/project-card";

const Backend: React.FC = () => {
  return (
    <div className="flex flex-col mt-12 justify-center text-center text-white light:text-black">
      <span className="text-3xl">
        featured<span className="text-green">_backend</span>
      </span>
      {projects.backend.map(
        ({ name, description, source, frameworks }, index) => {
          return (
            <div key={index} className="m-auto mt-6">
              <ProjectCard
                name={name}
                description={description}
                source={source}
                frameworks={frameworks}
              />
            </div>
          );
        }
      )}
    </div>
  );
};

export default Backend;

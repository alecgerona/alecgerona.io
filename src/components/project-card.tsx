import * as React from "react";
import Image from "./image";
import Repository from "./icons/repository";
import FrameworkIcon from "./icons/framework-icon";

interface ProjectCardProps {
  name: string;
  photo?: string;
  description: string;
  source: string;
  url?: string;
  frameworks: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  photo,
  description,
  source,
  frameworks,
  url,
}) => {
  return (
    <div className="text-white light:text-black border rounded m-4 w-project-card project-card max-w-xs">
      <div className="p-4">
        <Image filename={photo} alt="sample" />
      </div>
      <div className="flex text-xl">
        <Repository /> {name}
      </div>
      <div className="text-left mx-4 mt-3 text-sm">{description}</div>
      <div className="flex">
        <span className="text-left mx-4 mt-3">Built with: </span>
        {frameworks.map((src) => {
          return (
            <div key={src} className="mt-3 mx-1">
              <FrameworkIcon icon={src} />
            </div>
          );
        })}
      </div>
      <div className="text-left text-primary-light text-lg uppercase font-bold leading-tight m-3">
        {source && (
          <a
            href={source}
            className="mr-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            source
          </a>
        )}
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer">
            view site
          </a>
        )}
      </div>
    </div>
  );
};
export default ProjectCard;

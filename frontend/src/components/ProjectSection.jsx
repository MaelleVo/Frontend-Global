import ProjectCard from "./ProjectCard";
import { projectsData } from "../utils/projects"; // ton fichier utils

const ProjectSection = () => {
  return (
    <section className="projects-section">
      <div className="projects-container">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;

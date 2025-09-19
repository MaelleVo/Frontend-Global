import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <img src={project.image} className="project-image" />
      <div className="project-info">
        <h3>
          {project.title}{" "}
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} color="#5170ff" />
          </a>
        </h3>
        <div className="project-stacks">
          {project.stacks.map((stack, idx) => (
            <span key={idx} className="stack-badge">
              {stack}
            </span>
          ))}
        </div>
        <a
          href={project.website}
          rel="noopener noreferrer"
          className="project-website"
        >
          Voir le site
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;

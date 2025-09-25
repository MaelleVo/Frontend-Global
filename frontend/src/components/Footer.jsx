import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="container footer-container">
        <Link to="/" className="footer-logo">
          <h3>
            <FontAwesomeIcon icon={faHouse} color="#5170ff" size="x" />
            Portfolio
          </h3>
        </Link>
        <div className="footer-links">
          <a
            href="https://github.com/MaelleVo"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <FontAwesomeIcon
              icon={faGithub}
              color="#5170ff"
              style={{ marginRight: 6 }}
            />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/maëlle-volz-606146337"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              color="#5170ff"
              style={{ marginRight: 6 }}
            />
            LinkedIn
          </a>
        </div>
        <div>
          <p>© 2025 Projets Data & IA : Volz Maelle</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

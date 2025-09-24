import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { projectsData } from "../utils/projects";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const currentProject = projectsData.find((project) =>
    location.pathname.includes(project.website)
  );

  const name = currentProject ? currentProject.name : "Voxora";
  const subname = currentProject ? currentProject.subname : "Lab";

  return (
    <header>
      <div className="container navbar">
        <h2 className="logo">
          <span className="logo-span">{name}</span> {subname}
        </h2>
        {/* <h2 className="logo">
          <span className="logo-span">Voxora</span> Lab
        </h2> */}
        <div className="links-nav">
          {/* <NavLink
            to="/tts"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            TTS
          </NavLink> */}
          {/* <NavLink
            to="/voice-clone"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Voice Clone
          </NavLink> */}
        </div>
        <nav>
          {!token ? (
            <>
              <NavLink to="/login" className="button-link">
                Login
              </NavLink>
              <NavLink to="/signup" className="button-link">
                Signup
              </NavLink>
            </>
          ) : (
            <button onClick={handleLogout}>Se déconnecter</button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

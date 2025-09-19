import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container navbar">
        <h2 className="logo">
          <span className="logo-span">Voxora</span> Lab
        </h2>
        <div className="links-nav">
          <NavLink
            to="/tts"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            TTS
          </NavLink>
          <NavLink
            to="/voice-clone"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Voice Clone
          </NavLink>
        </div>
        <nav>
          <button>Login</button>
          <button>Register</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

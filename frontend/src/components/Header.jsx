import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // vérifier si connecté

  const handleLogout = () => {
    localStorage.removeItem("token"); // supprimer le token
    navigate("/login"); // rediriger vers login
  };

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

import { Link } from "react-router-dom";
import logo from "/images/logo-circle.png";

const HeaderHome = () => {
  return (
    <header>
      <div className="container navbar">
        <img src={logo} alt="logo" className="logo-img" />
      </div>
    </header>
  );
};

export default HeaderHome;

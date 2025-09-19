import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import ProjectSection from "../components/ProjectSection";
import HeaderHome from "../components/HeaderHome";

const Home = () => {
  return (
    <section>
      <HeaderHome />
      <main>
        <div className="main-home">
          <h1>
            Bienvenue sur mon portfolio <span>Data & IA</span>
          </h1>
          <p>
            Je suis développeuse Full Stack et je me reconvertis dans le domaine
            de la data et intelligence artificielle. <br /> <br />
            Voici quelques-uns de mes projets réalisés et les projets en cours.
          </p>

          <ProjectSection />
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default Home;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Utilisateur créé avec succès !");
        setTimeout(() => navigate("/tts"), 1500);
      } else {
        setMessage(data.detail || "Erreur inconnue");
      }
    } catch {
      setMessage("Erreur réseau");
    }
  };

  return (
    <main className="container">
      <section className="signup-page">
        <Link to="/tts" className="back-link">
          ← Retour
        </Link>
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">S'inscrire</button>
        </form>
        {message && <p>{message}</p>}
        <Link to="/login" className="button-link">
          Déjà inscrit ? Se connecter
        </Link>
      </section>
    </main>
  );
};

export default Signup;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  if (!API_URL) {
    console.error("Erreur : VITE_API_URL n'est pas défini dans .env");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        const token = data.access_token;
        localStorage.setItem("token", token);
        setMessage("Connexion réussie !");
        setTimeout(() => navigate("/tts"), 1000);
      } else {
        console.error("Erreur login:", data);
        setMessage(data.detail || "Email ou mot de passe incorrect");
      }
    } catch (err) {
      console.error("Erreur réseau login:", err);
      setMessage("Erreur réseau : impossible de contacter le serveur");
    }
  };

  return (
    <section className="signup-page">
      <Link to="/" className="back-link">
        ← Retour
      </Link>
      <h1>Connexion</h1>
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
        <button type="submit">Se connecter</button>
      </form>
      {message && <p>{message}</p>}
      <Link to="/signup" className="button-link">
        Pas encore de compte ? S'inscrire
      </Link>
    </section>
  );
};

export default Login;

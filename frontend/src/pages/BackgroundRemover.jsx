import { useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

// COMPONENTS IMPORT
import Header from "../components/Header";
import Footer from "../components/Footer";

const BackgroundRemover = () => {
  const [file, setFile] = useState(null);
  const [resultUrl, setResultUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResultUrl("");
    setDownloadUrl("");
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Veuillez sélectionner un fichier avant d'envoyer.");
      return;
    }

    setIsLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_URL}/remove-background`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const { result_url, download_url } = res.data.data;

      setResultUrl(result_url);
      setDownloadUrl(download_url);
    } catch (err) {
      console.error(
        "Erreur détaillée BackgroundRemover:",
        err.response || err.message
      );
      setError(
        err.response?.data?.detail ||
          "Impossible de se connecter au serveur ou traitement échoué."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = file?.name || "result";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section>
      <Header />
      <main>
        <h1>Supprimez l’arrière-plan de vos images et vidéos facilement !</h1>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,video/*"
          style={{ margin: "20px 0" }}
        />

        <div className="tts-controls">
          <button
            className="button-sent"
            onClick={handleUpload}
            disabled={isLoading || !file}
          >
            {isLoading ? "Traitement en cours..." : "Envoyer"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {resultUrl && (
          <div className="audio-container">
            {file.type.startsWith("image") ? (
              <img
                src={resultUrl}
                alt="Résultat"
                style={{ maxWidth: "60%", borderRadius: "10px" }}
              />
            ) : (
              <video controls src={resultUrl} style={{ maxWidth: "60%" }} />
            )}
            <button
              className="download-button"
              onClick={handleDownload}
              title="Télécharger le résultat"
            >
              <FontAwesomeIcon icon={faDownload} color="#5170ff" size="2x" />
            </button>
          </div>
        )}
      </main>
      <Footer />
    </section>
  );
};

export default BackgroundRemover;

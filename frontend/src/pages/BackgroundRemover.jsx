import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

// COMPONENTS IMPORT
import Header from "../components/Header";
import Footer from "../components/Footer";

const BackgroundRemover = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const API_URL =
    import.meta.env.VITE_BG_REMOVER ||
    import.meta.env.BG_REMOVER ||
    import.meta.env.VITE_API_URL_BG ||
    import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl, resultUrl]);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setResultUrl("");
    setError("");
    if (!f) {
      setFile(null);
      return;
    }
    if (!f.type.startsWith("image")) {
      setError("Seules les images sont supportées pour le moment.");
      setFile(null);
      return;
    }
    setFile(f);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Veuillez sélectionner un fichier avant d'envoyer.");
      return;
    }

    setIsLoading(true);
    setError("");
    setResultUrl("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_URL}/remove-bg`, formData, {
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "image/png" });
      const url = URL.createObjectURL(blob);

      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(url);
    } catch (err) {
      console.error("Erreur détaillée BackgroundRemover:", err);
      if (err.response) {
        setError(
          `Erreur serveur : ${err.response.status} ${err.response.statusText}`
        );
      } else {
        setError("Impossible de contacter le serveur ou traitement échoué.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const link = document.createElement("a");
    link.href = resultUrl;
    const originalName = file?.name || "result.png";
    link.download = originalName.replace(/\.[^/.]+$/, "") + "-no-bg.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section>
      <Header />
      <main>
        <h2>Supprimez l’arrière-plan de vos images facilement !</h2>

        <div className="bg-wrapper">
          <div className="preview-column card">
            <label className="file-dropzone" htmlFor="file-input">
              {!previewUrl ? (
                <>
                  <div className="drop-hint">
                    Cliquez pour sélectionner une image <br />
                    <span className="drop-sub">(png, jpeg)</span>
                  </div>

                  <div className="choose-file-button">Choisir un fichier</div>
                </>
              ) : (
                <img src={previewUrl} alt="Aperçu" className="preview-image" />
              )}

              <input
                id="file-input"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden-input"
              />
            </label>

            <div className="center-button">
              <button
                className="button-sent"
                onClick={handleUpload}
                disabled={isLoading || !file}
              >
                {isLoading ? "Traitement en cours..." : "Envoyer"}
              </button>
            </div>

            {error && <p className="error">{error}</p>}
          </div>

          <div className="result-column card">
            {resultUrl ? (
              <>
                <div className="result-image-wrap">
                  <img
                    src={resultUrl}
                    alt="Sans background"
                    className="result-image"
                  />
                </div>

                <div className="result-bottom">
                  <button
                    className="download-button result-download"
                    onClick={handleDownload}
                    title="Télécharger le résultat"
                  >
                    <FontAwesomeIcon
                      icon={faDownload}
                      color="#5170ff"
                      size="lg"
                    />
                    <span style={{ marginLeft: 8 }}>Télécharger</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-result">
                Le résultat s'affichera ici après traitement.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
};

export default BackgroundRemover;

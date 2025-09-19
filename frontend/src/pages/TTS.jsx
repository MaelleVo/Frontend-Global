import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

// COMPONENTS IMPORT
import Header from "../components/Header";
import Footer from "../components/Footer";

// UTILS IMPORT
import { LANG_VOICES } from "../utils/langs";

const TTS = () => {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(""); // Nouvelle état pour download_url
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState("fr"); // Langue sélectionnée
  const [voice, setVoice] = useState("ff_siwis");
  const audioRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const handleChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);
    if (inputText.length > 200) {
      setError("Le texte ne peut pas dépasser 200 caractères.");
    } else {
      setError("");
    }
  };

  const handleSpeak = async () => {
    if (!text.trim()) {
      setError("Veuillez entrer du texte avant d'envoyer.");
      return;
    }
    if (text.length > 200) {
      setError("Le texte ne peut pas dépasser 200 caractères.");
      return;
    }

    // Réinitialise audio et download
    setAudioUrl("");
    setDownloadUrl("");
    setError("");
    setIsLoading(true);

    setIsLoading(true);
    try {
      const res = await axios.post(`${API_URL}/tts`, { text, lang, voice });
      const { audio_url, download_url } = res.data.data;
      const fullAudioUrl = `${API_URL}${audio_url}`;
      const fullDownloadUrl = `${API_URL}${download_url}`;
      console.log("URL audio générée :", fullAudioUrl);
      console.log("URL téléchargement générée :", fullDownloadUrl);
      setAudioUrl(fullAudioUrl);
      setDownloadUrl(fullDownloadUrl);
      setError("");
    } catch (error) {
      console.error("Erreur détaillée :", error.response || error.message);
      if (error.response) {
        setError(
          `Erreur du serveur : ${
            error.response.data.detail || error.response.statusText
          }`
        );
      } else {
        setError(
          `Impossible de se connecter au serveur. Vérifiez qu'il est en cours d'exécution sur ${API_URL}.`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "audio.mp3";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    return () => {
      if (audioUrl && audioUrl.startsWith("blob:")) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return (
    <section>
      <Header />
      <main>
        <h1>Transformez votre texte en voix en quelques secondes !</h1>
        <textarea
          className="text-home"
          value={text}
          onChange={handleChange}
          maxLength={200}
          placeholder="Tapez votre texte ici... maximum 200 caractères"
        />

        <div className="tts-controls">
          <div className="select-container">
            <label>
              Langue :
              <select
                value={lang}
                onChange={(e) => {
                  setLang(e.target.value);
                  setVoice(LANG_VOICES[e.target.value][0]);
                }}
              >
                {Object.keys(LANG_VOICES).map((l) => (
                  <option key={l} value={l}>
                    {l.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Voix :
              <select value={voice} onChange={(e) => setVoice(e.target.value)}>
                {LANG_VOICES[lang].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            className="button-sent"
            onClick={handleSpeak}
            disabled={isLoading || text.length > 200}
          >
            {isLoading ? "Chargement..." : "Envoyer"}
          </button>

          <p className="char-count">{text.length} / 200 caractères</p>
        </div>
        {error && <p className="error">{error}</p>}
        {audioUrl && (
          <div className="audio-container">
            <audio
              ref={audioRef}
              controls
              src={audioUrl}
              onError={() =>
                setError(
                  "Impossible de lire l'audio. Vérifiez l'URL ou le fichier audio."
                )
              }
            />
            <button
              className="download-button"
              onClick={handleDownload}
              title="Télécharger l'audio"
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

export default TTS;

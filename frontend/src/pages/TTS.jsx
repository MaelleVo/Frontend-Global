import { useState, useRef } from "react";
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
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState("fr");
  const [voice, setVoice] = useState("ff_siwis");
  const audioRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;

  if (!API_URL) {
    console.error("Erreur : VITE_API_URL n'est pas défini dans .env");
  }

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

    setAudioUrl("");
    setDownloadUrl("");
    setError("");
    setIsLoading(true);

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `${API_URL}/tts`,
        { text, lang, voice },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { audio_url, download_url } = res.data.data;

      console.log("URL audio générée :", audio_url);
      console.log("URL téléchargement générée :", download_url);

      setAudioUrl(audio_url);
      setDownloadUrl(download_url);
      setError("");
    } catch (err) {
      console.error("Erreur détaillée TTS:", err.response || err.message);
      if (err.response) {
        if (
          err.response.data.detail ===
          "Vous devez être connecté pour utiliser le TTS"
        ) {
          setError("Vous devez être connecté pour utiliser le TTS.");
        } else {
          setError(err.response.data.detail || "Erreur du serveur");
        }
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

  return (
    <section>
      <Header />
      <main>
        <h2>Transformez votre texte en voix en quelques secondes !</h2>
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

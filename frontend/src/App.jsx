import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// PAGES IMPORT
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TTS from "./pages/TTS";
import BackgroundRemover from "./pages/BackgroundRemover";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tts" element={<TTS />} />
        <Route path="/bg-remover" element={<BackgroundRemover />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;

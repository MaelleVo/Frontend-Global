import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// PAGES IMPORT
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TTS from "./pages/TTS";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tts" element={<TTS />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

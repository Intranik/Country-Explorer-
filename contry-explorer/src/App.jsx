// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Countries from "./pages/Countries.jsx";
import CountryDetail from "./pages/CountryDetail.jsx";
import Collection from "./pages/Collection.jsx";
import Quiz from "./pages/Quiz.jsx";
import Leaderboard from "./pages/Leaderboord.jsx";
import './App.css';

export default function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:countryName" element={<CountryDetail />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  );
}

function Header() {
  return (
    <nav class = "navbar">
      <Link class = "headerLink" to="/" style={{ marginRight: 12 }}>Home</Link>
      <Link class = "headerLink" to="/countries" style={{ marginRight: 12 }}>Countries</Link>
      <Link class = "headerLink" to="/collection" style={{ marginRight: 12 }}>Collection</Link>
      <Link class = "headerLink" to="/quiz" style={{ marginRight: 12 }}>Quiz</Link>
      <Link class = "headerLink" to="/leaderboard">Leaderboard</Link>
    </nav>
  );
}

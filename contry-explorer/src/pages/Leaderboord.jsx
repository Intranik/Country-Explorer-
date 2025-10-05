import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quizResults") || "[]");
    setResults(saved);
  }, []);

  // Gruppera resultat efter region
  const regions = results.reduce((acc, r) => {
    if (!acc[r.region]) acc[r.region] = [];
    acc[r.region].push(r);
    return acc;
  }, {});

  // Sortera varje region efter poäng
  Object.keys(regions).forEach(region => {
    regions[region].sort((a, b) => b.score - a.score);
  });

  if (results.length === 0) {
    return <p>Inga resultat ännu. Spela quiz för att hamna på leaderboard!</p>;
  }

  return (
    <div>
      <h1>Leaderboard</h1>
      {Object.keys(regions).map(region => (
        <div key={region} style={{ marginBottom: "2rem", color: "white", fontSize: "2em" }}>
          <h2>{region.toUpperCase()}</h2>
          <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Användarnamn</th>
                <th>Poäng</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>
              {regions[region].map((r, i) => (
                <tr key={i}>
                  <td>{r.username}</td>
                  <td>{r.score} / {r.total}</td>
                  <td>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

// src/pages/Countries.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Countries() {
  const [region, setRegion] = useState("");
  const [countries, setCountries] = useState([]);

  // Hämta data varje gång region ändras
  useEffect(() => {
    if (!region) return;

    fetch(`https://restcountries.com/v3.1/region/${region}`)
      .then(res => res.json())
      .then(data => {
        setCountries(data);
      })
      .catch(err => console.error(err));
  }, [region]);

  return (
    <div>
      <h1>Countries</h1>

      {/* Dropdown för region */}
      <select class= "selectop" value={region} onChange={e => setRegion(e.target.value)}>
        <option value="">-- Select a region --</option>
        <option value="europe">Europe</option>
        <option value="asia">Asia</option>
        <option value="africa">Africa</option>
        <option value="americas">Americas</option>
        <option value="oceania">Oceania</option>
      </select>

      {/* Grid med flaggor */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "1rem",
        marginTop: "1rem"
      }}>
        {countries.map(country => (
          <Link 
            key={country.cca3} 
            to={`/countries/${country.name.common.toLowerCase()}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "0.5rem",
              textAlign: "center"
            }}>
              <img 
                src={country.flags.png} 
                alt={country.name.common} 
                style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "4px" }}
              />
              <p>{country.name.common}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

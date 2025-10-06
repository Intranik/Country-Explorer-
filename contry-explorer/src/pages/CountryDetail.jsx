import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCollection } from "../context/CollectionContext";

export default function CountryDetail() {
  const { countryName } = useParams();
  const location = useLocation();
  const region = location.state?.region; 

  const [country, setCountry] = useState(null);
  const { addCountry } = useCollection();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then(res => res.json())
      .then(data => setCountry(data[0]))
      .catch(err => console.error(err));
  }, [countryName]);

  if (!country) return <p>Loading...</p>;

  const { name, flags, population, currencies, maps, cca3 } = country;
  const currencyNames = currencies ? Object.values(currencies).map(c => c.name).join(", ") : "N/A";

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{name.common}</h1>
      <img src={flags.png} alt={name.common} style={{ width: "200px" }} />
      <p><b>Population:</b> {population.toLocaleString()}</p>
      <p><b>Currency:</b> {currencyNames}</p>
      <p>
        <a href={maps.googleMaps} target="_blank" rel="noreferrer">
          View on Google Maps
        </a>
      </p>

      <button onClick={() => addCountry({ name, flags, population, currencies, cca3 })}>
        Spara land
      </button>

      {region && (
        <div style={{ marginTop: "1rem" }}>
          <Link to="/countries" state={{ region }}>
            <button>Tillbaka till {region}</button>
          </Link>
        </div>
      )}
    </div>
  );
}

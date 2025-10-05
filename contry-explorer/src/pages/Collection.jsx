// src/pages/Collection.jsx
import { Link } from "react-router-dom";
import { useCollection } from "../context/CollectionContext";
import '../index.css'

export default function Collection() {
  const { collection, removeCountry } = useCollection();

  if (collection.length === 0) {
    return <p>Din collection är tom. Spara några länder först!</p>;
  }

  return (
    <div>
      <h1>My Collection</h1>
      <div class = "collectionFlag">
        {collection.map(c => (
          <div class = "flagContainer" key={c.cca3} >
            <Link to={`/countries/${c.name.common.toLowerCase()}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img src={c.flags.png} alt={c.name.common} style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "4px" }} />
              <p>{c.name.common}</p>
            </Link>
            <button onClick={() => removeCountry(c.cca3)} style={{ marginTop: "0.5rem" }}>
              Ta bort
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

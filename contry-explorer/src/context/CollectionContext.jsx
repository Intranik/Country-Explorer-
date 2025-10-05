import { createContext, useContext, useEffect, useState } from "react";

// Skapar context
const CollectionContext = createContext();

export function CollectionProvider({ children }) {
  const [collection, setCollection] = useState([]);

  // Ladda från localStorage
  useEffect(() => {
    const saved = localStorage.getItem("collection");
    if (saved) {
      setCollection(JSON.parse(saved));
    }
  }, []);

  // Spara till localStorage vid ändring
  useEffect(() => {
    localStorage.setItem("collection", JSON.stringify(collection));
  }, [collection]);

  function addCountry(country) {
    // undvik dubbletter
    if (!collection.find(c => c.cca3 === country.cca3)) {
      setCollection([...collection, country]);
    }
  }

  function removeCountry(code) {
    setCollection(collection.filter(c => c.cca3 !== code));
  }

  return (
    <CollectionContext.Provider value={{ collection, addCountry, removeCountry }}>
      {children}
    </CollectionContext.Provider>
  );
}

// Hook för enkel åtkomst
export function useCollection() {
  return useContext(CollectionContext);
}

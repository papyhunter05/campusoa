import { useState, useEffect } from 'react';

function useDonnees(donneesMock, delai = 800) {
  const [donnees, setDonnees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simuler un délai de chargement pour imiter une requête API
    const timer = setTimeout(() => {
      setDonnees(donneesMock);
      setLoading(false);
    }, delai);

    return () => clearTimeout(timer);
  }, [donneesMock, delai]);

  const ajouterElement = (nouvelElement) => {
    setDonnees([...donnees, nouvelElement]);
  };

  const modifierElement = (id, champId, elementModifie) => {
    setDonnees(
      donnees.map(element => 
        element[champId] === id ? elementModifie : element
      )
    );
  };

  const supprimerElement = (id, champId) => {
    setDonnees(donnees.filter(element => element[champId] !== id));
  };

  return {
    donnees,
    setDonnees,
    loading,
    error,
    setError,
    ajouterElement,
    modifierElement,
    supprimerElement
  };
}

export default useDonnees;

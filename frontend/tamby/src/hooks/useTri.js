import { useState, useCallback } from 'react';

function useTri(donnees, setDonnees) {
  const [champTri, setChampTri] = useState(null);
  const [directionTri, setDirectionTri] = useState('asc');

  const trierDonnees = useCallback((champ) => {
    // Si on clique sur le même champ, on inverse la direction
    const nouvelleDirection = champ === champTri && directionTri === 'asc' ? 'desc' : 'asc';
    
    const donneeTriees = [...donnees].sort((a, b) => {
      if (a[champ] < b[champ]) return nouvelleDirection === 'asc' ? -1 : 1;
      if (a[champ] > b[champ]) return nouvelleDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    setDonnees(donneeTriees);
    setChampTri(champ);
    setDirectionTri(nouvelleDirection);
  }, [donnees, setDonnees, champTri, directionTri]);

  return {
    champTri,
    directionTri,
    trierDonnees
  };
}

export default useTri;

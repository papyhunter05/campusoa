import { useState, useCallback } from 'react';

function useRecherche(donnees, fonctionFiltre) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [criteresFiltres, setCriteresFiltres] = useState({});

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const toggleAdvancedSearch = useCallback(() => {
    setShowAdvancedSearch(prev => !prev);
  }, []);

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setCriteresFiltres(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const resultatsRecherche = useCallback(() => {
    return donnees.filter(item => fonctionFiltre(item, searchTerm, criteresFiltres));
  }, [donnees, searchTerm, criteresFiltres, fonctionFiltre]);

  return {
    searchTerm,
    setSearchTerm,
    showAdvancedSearch,
    setShowAdvancedSearch,
    criteresFiltres,
    setCriteresFiltres,
    handleSearchChange,
    toggleAdvancedSearch,
    handleFilterChange,
    resultatsRecherche
  };
}

export default useRecherche;

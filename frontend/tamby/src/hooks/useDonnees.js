import { useState, useEffect } from 'react';

const useDonnees = (
  donneeInitiales = [], 
  fetchFunction = null,
  addFunction = null,
  updateFunction = null,
  deleteFunction = null
  ) => {
  const [donnees, setDonnees] = useState(donneeInitiales);
  const [loading, setLoading] = useState(fetchFunction ? true : false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fetchFunction) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = await fetchFunction();
          setDonnees(result);
          setError(null);
        } catch (err) {
          setError('Erreur lors du chargement des données');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [fetchFunction]);

  const ajouterElement = async (element, customAddFunction = null) => {
    try {
      const functionToUse = customAddFunction || addFunction;
      if (functionToUse) {
        // Supprimer id_res si présent pour l'ajout (pour les tables avec auto-increment)
        const elementToSend = { ...element };
        if (elementToSend.id_res !== undefined && !elementToSend.id_res) {
          delete elementToSend.id_res;
        }
        
        const result = await functionToUse(elementToSend);
        
        // Si l'API renvoie l'élément complet, utilisez result
        // Sinon, récupérez les données à nouveau
        if (fetchFunction) {
          const updatedData = await fetchFunction();
          setDonnees(updatedData);
        } else {
          // Si le backend renvoie un ID, l'utiliser pour mettre à jour l'élément
          if (result && result.id) {
            setDonnees([...donnees, { 
              ...element, 
              id_res: result.id 
            }]);
          } else if (result) {
            setDonnees([...donnees, result]);
          } else {
            setDonnees([...donnees, element]);
          }
        }
        return true;
      } else {
        setDonnees([...donnees, element]);
        return true;
      }
    } catch (err) {
      setError('Erreur lors de l\'ajout');
      console.error(err);
      return false;
    }
  };
  
  const modifierElement = async (id, idField = 'id_res', newData, customUpdateFunction = null) => {
    try {
      const functionToUse = customUpdateFunction || updateFunction;
      if (functionToUse) {
        await functionToUse(id, newData);
        if (fetchFunction) {
          const updatedData = await fetchFunction();
          setDonnees(updatedData);
        } else {
          setDonnees(donnees.map(item => 
            item[idField] === id ? { ...item, ...newData } : item
          ));
        }
      } else {
        setDonnees(donnees.map(item => 
          item[idField] === id ? { ...item, ...newData } : item
        ));
      }
      return true;
    } catch (err) {
      setError('Erreur lors de la modification');
      console.error(err);
      return false;
    }
  };

  const supprimerElement = async (id, idField = 'id_res', customDeleteFunction = null) => {
    try {
      const functionToUse = customDeleteFunction || deleteFunction;
      if (functionToUse) {
        await functionToUse(id);
        if (fetchFunction) {
          const updatedData = await fetchFunction();
          setDonnees(updatedData);
        } else {
          setDonnees(donnees.filter(item => item[idField] !== id));
        }
      } else {
        setDonnees(donnees.filter(item => item[idField] !== id));
      }
      return true;
    } catch (err) {
      setError('Erreur lors de la suppression');
      console.error(err);
      return false;
    }
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
};

export default useDonnees;

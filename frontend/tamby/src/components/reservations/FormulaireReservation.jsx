import React, { useEffect } from 'react';
import { FaCalendarAlt, FaBed, FaUserGraduate } from 'react-icons/fa';
import { colors } from '../../styles/theme';

function FormulaireReservation({ 
  formData, 
  onChange, 
  onSubmit, 
  formMode,
  etudiants,
  chambres,
  getEtudiantName
}) {
  // Logs pour déboguer les données reçues
  useEffect(() => {
    console.log("Étudiants reçus dans le formulaire:", etudiants);
    console.log("Chambres reçues dans le formulaire:", chambres);
    console.log("formData actuel:", formData);
  }, [etudiants, chambres, formData]);

  // Filtrer les chambres disponibles ou celle déjà réservée par cet étudiant
  // Adaptation pour gérer différentes structures de données possibles
  const chambresDisponibles = chambres.filter(c => {
    // Vérifier si la chambre est disponible (différentes propriétés possibles)
    const estDisponible = 
      c.etat_chambre === "Disponible" || 
      c.status === "Available" || 
      c.etat === "Libre";
    
    // Vérifier si c'est la chambre actuellement sélectionnée
    const estChambreActuelle = 
      c.n_chambre === formData.n_chambre || 
      c.id_chambre === formData.n_chambre || 
      c.numero === formData.n_chambre;
    
    return estDisponible || estChambreActuelle;
  });
  
  // Filtrer les étudiants sans chambre ou celui déjà associé à cette réservation
  // Adaptation pour gérer différentes structures de données possibles
  const etudiantsDisponibles = etudiants.filter(e => {
    // Vérifier si l'étudiant n'a pas de chambre
    const sansChambre = 
      !e.n_chambre || 
      e.n_chambre === null || 
      e.n_chambre === "";
    
    // Vérifier si c'est l'étudiant actuellement sélectionné
    const estEtudiantActuel = 
      e.n_etudiant === formData.n_etudiant || 
      e.id_etudiant === formData.n_etudiant || 
      e.id === formData.n_etudiant;
    
    return sansChambre || estEtudiantActuel;
  });

  // Fonction pour obtenir l'ID de la chambre selon la structure des données
  const getChambreId = (chambre) => {
    return chambre.n_chambre || chambre.id_chambre || chambre.numero;
  };

  // Fonction pour obtenir l'ID de l'étudiant selon la structure des données
  const getEtudiantId = (etudiant) => {
    return etudiant.n_etudiant || etudiant.id_etudiant || etudiant.id;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {formMode === 'edit' && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
            <span className="inline-block w-6 text-center mr-2">#</span>
            Identifiant
          </label>
          <input
            type="text"
            name="id_res"
            value={formData.id_res}
            disabled
            className="w-full p-2 border rounded-md bg-gray-100"
            style={{ 
              borderColor: colors.borderColor,
              color: colors.textLight
            }}
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
          <FaCalendarAlt className="inline mr-2" style={{ color: colors.secondaryColor }} />
          Date de réservation
        </label>
        <input
          type="date"
          name="date_res"
          value={formData.date_res}
          onChange={onChange}
          className="w-full p-2 border rounded-md"
          style={{ 
            borderColor: colors.borderColor,
            backgroundColor: colors.globalLight,
            color: colors.textColor
          }}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
          <FaUserGraduate className="inline mr-2" style={{ color: colors.secondaryColor }} />
          Étudiant
        </label>
        <select
          name="n_etudiant"
          value={formData.n_etudiant}
          onChange={onChange}
          className="w-full p-2 border rounded-md"
          style={{ 
            borderColor: colors.borderColor,
            backgroundColor: colors.globalLight,
            color: colors.textColor
          }}
          required
        >
          <option value="">Sélectionnez un étudiant</option>
          {etudiantsDisponibles.map((etudiant) => (
            <option key={getEtudiantId(etudiant)} value={getEtudiantId(etudiant)}>
              {getEtudiantName(getEtudiantId(etudiant))}
            </option>
          ))}
        </select>
        {etudiantsDisponibles.length === 0 && (
          <p className="text-xs mt-1 text-red-500">
            Aucun étudiant disponible pour une réservation.
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
          <FaBed className="inline mr-2" style={{ color: colors.secondaryColor }} />
          Chambre
        </label>
        <select
          name="n_chambre"
          value={formData.n_chambre}
          onChange={onChange}
          className="w-full p-2 border rounded-md"
          style={{ 
            borderColor: colors.borderColor,
            backgroundColor: colors.globalLight,
            color: colors.textColor
          }}
          required
        >
          <option value="">Sélectionnez une chambre</option>
          {chambresDisponibles.map((chambre) => {
            const chambreId = getChambreId(chambre);
            const capacite = chambre.capacite_max || chambre.capacite || 1;
            return (
              <option key={chambreId} value={chambreId}>
                {chambreId} - {capacite} personne(s)
              </option>
            );
          })}
        </select>
        {chambresDisponibles.length === 0 && (
          <p className="text-xs mt-1 text-red-500">
            Aucune chambre disponible pour une réservation.
          </p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="px-4 py-2 rounded-md transition-colors duration-200"
          style={{ 
            backgroundColor: colors.primaryColor,
            color: colors.globalLight,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = colors.primaryDark;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = colors.primaryColor;
          }}
          disabled={chambresDisponibles.length === 0 || etudiantsDisponibles.length === 0}
        >
          {formMode === 'add' ? 'Ajouter la réservation' : 'Enregistrer les modifications'}
        </button>
      </div>
    </form>
  );
}

export default FormulaireReservation;

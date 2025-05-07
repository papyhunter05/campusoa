import React from 'react';
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
  // Filtrer les chambres disponibles ou celle déjà réservée par cet étudiant
  const chambresDisponibles = chambres.filter(c => 
    c.etat_chambre === "Disponible" || c.n_chambre === formData.n_chambre
  );
  
  // Filtrer les étudiants sans chambre ou celui déjà associé à cette réservation
  const etudiantsDisponibles = etudiants.filter(e => 
    !e.n_chambre || e.n_etudiant === formData.n_etudiant
  );

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
            <option key={etudiant.n_etudiant} value={etudiant.n_etudiant}>
              {getEtudiantName(etudiant.n_etudiant)}
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
          {chambresDisponibles.map((chambre) => (
            <option key={chambre.n_chambre} value={chambre.n_chambre}>
              {chambre.n_chambre} - {chambre.capacite_max} personne(s)
            </option>
          ))}
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

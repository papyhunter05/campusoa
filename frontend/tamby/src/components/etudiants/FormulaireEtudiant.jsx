import React from 'react';
import { FaUser, FaIdCard, FaPhone, FaGraduationCap, FaBed, FaUniversity } from 'react-icons/fa';
import { colors } from '../../styles/theme';

function FormulaireEtudiant({ 
  formData, 
  onChange, 
  onSubmit, 
  formMode,
  chambres
}) {
  // Liste des niveaux d'étude courants
  const niveaux = ["L1", "L2", "L3", "M1", "M2", "D1", "D2", "D3"];
  
  // Chambres disponibles (non attribuées ou celle de l'étudiant en cours d'édition)
  const chambresDisponibles = chambres.filter(c => 
    c.etat_chambre === "Disponible" || c.n_chambre === formData.n_chambre
  );

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
            <FaIdCard className="inline mr-2" style={{ color: colors.secondaryColor }} />
            Numéro d'étudiant
          </label>
          <input
            type="text"
            name="n_etudiant"
            value={formData.n_etudiant}
            onChange={onChange}
            disabled={formMode === 'edit'}
            className="w-full p-2 border rounded-md"
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: formMode === 'edit' ? colors.inputBg : colors.globalLight,
              color: colors.textColor
            }}
            required
            maxLength={6}
            placeholder="Ex: ETU001"
          />
          <p className="text-xs mt-1" style={{ color: colors.textLight }}>
            Format: 6 caractères maximum
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
            <FaUser className="inline mr-2" style={{ color: colors.secondaryColor }} />
            Nom
          </label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={onChange}
            className="w-full p-2 border rounded-md"
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.globalLight,
              color: colors.textColor
            }}
            required
            maxLength={40}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
            <FaUser className="inline mr-2" style={{ color: colors.secondaryColor }} />
            Prénom
          </label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={onChange}
            className="w-full p-2 border rounded-md"
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.globalLight,
              color: colors.textColor
            }}
            required
            maxLength={60}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
            <FaUniversity className="inline mr-2" style={{ color: colors.secondaryColor }} />
            Université
          </label>
          <input
            type="text"
            name="univ"
            value={formData.univ}
            onChange={onChange}
            className="w-full p-2 border rounded-md"
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.globalLight,
              color: colors.textColor
            }}
            required
            maxLength={50}
            placeholder="Ex: Université Paris 1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
            <FaGraduationCap className="inline mr-2" style={{ color: colors.secondaryColor }} />
            Niveau d'étude
          </label>
          <select
            name="niveau"
            value={formData.niveau}
            onChange={onChange}
            className="w-full p-2 border rounded-md"
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.globalLight,
              color: colors.textColor
            }}
            required
          >
            <option value="">Sélectionnez un niveau</option>
            {niveaux.map((niveau, index) => (
              <option key={index} value={niveau}>{niveau}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
            <FaPhone className="inline mr-2" style={{ color: colors.secondaryColor }} />
            Contact
          </label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={onChange}
            className="w-full p-2 border rounded-md"
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.globalLight,
              color: colors.textColor
            }}
            maxLength={50}
            placeholder="Ex: 0612345678"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
            <FaBed className="inline mr-2" style={{ color: colors.secondaryColor }} />
            Chambre
          </label>
          <select
            name="n_chambre"
            value={formData.n_chambre || ''}
            onChange={onChange}
            className="w-full p-2 border rounded-md"
            style={{ 
              borderColor: colors.borderColor,
              backgroundColor: colors.globalLight,
              color: colors.textColor
            }}
          >
            <option value="">Aucune chambre attribuée</option>
            {chambresDisponibles.map((chambre) => (
              <option key={chambre.n_chambre} value={chambre.n_chambre}>
                {chambre.n_chambre} ({chambre.capacite_max} pers.)
              </option>
            ))}
          </select>
        </div>
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
        >
          {formMode === 'add' ? 'Ajouter l\'étudiant' : 'Enregistrer les modifications'}
        </button>
      </div>
    </form>
  );
}

export default FormulaireEtudiant;

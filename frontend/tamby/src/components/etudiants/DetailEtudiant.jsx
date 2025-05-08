import React from 'react';
import { FaUser, FaUniversity, FaGraduationCap, FaPhone, FaBed } from 'react-icons/fa';
import { colors } from '../../styles/theme';

function DetailEtudiant({ etudiant }) {
  if (!etudiant) return <div>Aucune donnée disponible</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: colors.highlightColor }}>
        <FaUser className="text-xl mr-3" style={{ color: colors.primaryColor }} />
        <h3 className="text-lg font-semibold" style={{ color: colors.complementaryColor }}>
          {etudiant.nom} {etudiant.prenom}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 rounded-lg border" style={{ borderColor: colors.borderColor }}>
          <div className="flex items-center mb-2">
            <FaUniversity className="mr-2" style={{ color: colors.secondaryColor }} />
            <span className="text-sm font-medium" style={{ color: colors.textLight }}>Université</span>
          </div>
          <p className="text-md" style={{ color: colors.textColor }}>{etudiant.univ || 'Non renseignée'}</p>
        </div>
        
        <div className="p-3 rounded-lg border" style={{ borderColor: colors.borderColor }}>
          <div className="flex items-center mb-2">
            <FaGraduationCap className="mr-2" style={{ color: colors.secondaryColor }} />
            <span className="text-sm font-medium" style={{ color: colors.textLight }}>Niveau</span>
          </div>
          <p className="text-md" style={{ color: colors.textColor }}>{etudiant.niveau || 'Non renseigné'}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 rounded-lg border" style={{ borderColor: colors.borderColor }}>
          <div className="flex items-center mb-2">
            <FaPhone className="mr-2" style={{ color: colors.secondaryColor }} />
            <span className="text-sm font-medium" style={{ color: colors.textLight }}>Contact</span>
          </div>
          <p className="text-md" style={{ color: colors.textColor }}>{etudiant.contact || 'Non renseigné'}</p>
        </div>
        
        <div className="p-3 rounded-lg border" style={{ borderColor: colors.borderColor }}>
          <div className="flex items-center mb-2">
            <FaBed className="mr-2" style={{ color: colors.secondaryColor }} />
            <span className="text-sm font-medium" style={{ color: colors.textLight }}>Chambre</span>
          </div>
          <p className="text-md" style={{ color: colors.textColor }}>
            {etudiant.n_chambre ? `Chambre n°${etudiant.n_chambre}` : 'Aucune chambre attribuée'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailEtudiant;

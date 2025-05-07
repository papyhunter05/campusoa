import React from 'react';
import { FaUser, FaIdCard, FaPhone, FaGraduationCap, FaBed, FaUniversity } from 'react-icons/fa';
import { colors } from '../../styles/theme';

function DetailEtudiant({ etudiant, getChambreName }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: colors.highlightColor }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: colors.primaryColor }}>
          <FaUser className="text-xl" style={{ color: colors.globalLight }} />
        </div>
        <div>
          <h3 className="text-lg font-semibold" style={{ color: colors.complementaryColor }}>
            {etudiant.nom} {etudiant.prenom}
          </h3>
          <p className="text-sm" style={{ color: colors.textLight }}>
            {etudiant.n_etudiant}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 rounded-lg border" style={{ borderColor: colors.borderColor }}>
          <div className="flex items-center mb-2">
            <FaUniversity className="mr-2" style={{ color: colors.secondaryColor }} />
            <span className="text-sm font-medium" style={{ color: colors.textLight }}>Université</span>
          </div>
          <p className="text-md font-bold" style={{ color: colors.textColor }}>{etudiant.univ}</p>
        </div>
        
        <div className="p-3 rounded-lg border" style={{ borderColor: colors.borderColor }}>
          <div className="flex items-center mb-2">
            <FaGraduationCap className="mr-2" style={{ color: colors.secondaryColor }} />
            <span className="text-sm font-medium" style={{ color: colors.textLight }}>Niveau</span>
          </div>
          <p className="text-md font-bold" style={{ color: colors.textColor }}>{etudiant.niveau}</p>
        </div>
        
        <div className="p-3 rounded-lg border" style={{ borderColor: colors.borderColor }}>
          <div className="flex items-center mb-2">
            <FaPhone className="mr-2" style={{ color: colors.secondaryColor }} />
            <span className="text-sm font-medium" style={{ color: colors.textLight }}>Contact</span>
          </div>
          <p className="text-md font-bold" style={{ color: colors.textColor }}>{etudiant.contact || 'Non renseigné'}</p>
        </div>
        
        <div className="p-3 rounded-lg border" style={{ borderColor: colors.borderColor }}>
          <div className="flex items-center mb-2">
            <FaBed className="mr-2" style={{ color: colors.secondaryColor }} />
            <span className="text-sm font-medium" style={{ color: colors.textLight }}>Chambre</span>
          </div>
          <p className="text-md font-bold" style={{ color: colors.textColor }}>
            {etudiant.n_chambre ? getChambreName(etudiant.n_chambre) : 'Non attribuée'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailEtudiant;

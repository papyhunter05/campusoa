import React from 'react';
import { FaBuilding, FaBed, FaClipboardCheck } from 'react-icons/fa';
import { colors } from '../../styles/theme';

function DetailEtablissement({ etablissement }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: colors.highlightColor }}>
        <FaBuilding className="text-xl mr-3" style={{ color: colors.primaryColor }} />
        <h3 className="text-lg font-semibold" style={{ color: colors.complementaryColor }}>
          {etablissement.nom_bat || `Bâtiment ${etablissement.n_bat}`}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 rounded-lg border" style={{ borderColor: colors.borderColor }}>
          <div className="flex items-center mb-2">
            <FaBed className="mr-2" style={{ color: colors.secondaryColor }} />
            <span className="text-sm font-medium" style={{ color: colors.textLight }}>Nombre de chambres</span>
          </div>
          <p className="text-2xl font-bold" style={{ color: colors.textColor }}>{etablissement.nb_chambre}</p>
        </div>
        
        <div className="p-3 rounded-lg border" style={{ borderColor: colors.borderColor }}>
          <div className="flex items-center mb-2">
            <FaClipboardCheck className="mr-2" style={{ color: colors.secondaryColor }} />
            <span className="text-sm font-medium" style={{ color: colors.textLight }}>État du bâtiment</span>
          </div>
          <span 
            className="px-3 py-1 rounded-full text-sm font-medium"
            style={{ 
              backgroundColor: 
                etablissement.etat_bat === 'Excellent' ? '#ecfdf5' : 
                etablissement.etat_bat === 'Bon' ? '#f0fdf4' : 
                etablissement.etat_bat === 'Moyen' ? '#fef9c3' : 
                etablissement.etat_bat === 'Mauvais' ? '#fee2e2' : 
                '#f3f4f6',
              color: 
                etablissement.etat_bat === 'Excellent' ? '#047857' : 
                etablissement.etat_bat === 'Bon' ? '#16a34a' : 
                etablissement.etat_bat === 'Moyen' ? '#ca8a04' : 
                etablissement.etat_bat === 'Mauvais' ? '#b91c1c' : 
                '#4b5563'
            }}
          >
            {etablissement.etat_bat}
          </span>
        </div>
      </div>
      
      {etablissement.description && (
        <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: colors.inputBg }}>
          <h4 className="font-medium mb-2" style={{ color: colors.textColor }}>Description</h4>
          <p style={{ color: colors.textLight }}>{etablissement.description}</p>
        </div>
      )}
    </div>
  );
}

export default DetailEtablissement;

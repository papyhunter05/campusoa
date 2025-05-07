import React from 'react';
import { FaCalendarAlt, FaBed, FaUserGraduate, FaBuilding } from 'react-icons/fa';
import { colors } from '../../styles/theme';

function DetailReservation({ reservation, getEtudiantName, getBatimentFromChambre, formatDate }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: colors.highlightColor }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: colors.primaryColor }}>
          <FaCalendarAlt className="text-xl" style={{ color: colors.globalLight }} />
        </div>
        <div>
          <h3 className="text-lg font-semibold" style={{ color: colors.complementaryColor }}>
            Réservation #{reservation.id_res}
          </h3>
          <p className="text-sm" style={{ color: colors.textLight }}>
            {formatDate(reservation.date_res)}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 rounded-lg border" style={{ borderColor: colors.borderColor }}>
          <div className="flex items-center mb-2">
            <FaUserGraduate className="mr-2" style={{ color: colors.secondaryColor }} />
            <span className="text-sm font-medium" style={{ color: colors.textLight }}>Étudiant</span>
          </div>
          <p className="text-md font-bold" style={{ color: colors.textColor }}>
            {getEtudiantName(reservation.n_etudiant)}
          </p>
          <p className="text-sm" style={{ color: colors.textLight }}>
            ID: {reservation.n_etudiant}
          </p>
        </div>
        
        <div className="p-3 rounded-lg border" style={{ borderColor: colors.borderColor }}>
          <div className="flex items-center mb-2">
            <FaBed className="mr-2" style={{ color: colors.secondaryColor }} />
            <span className="text-sm font-medium" style={{ color: colors.textLight }}>Chambre</span>
          </div>
          <p className="text-md font-bold" style={{ color: colors.textColor }}>
            {reservation.n_chambre}
          </p>
          <p className="text-sm" style={{ color: colors.textLight }}>
            {getBatimentFromChambre(reservation.n_chambre)}
          </p>
        </div>
        
        <div className="p-3 rounded-lg border md:col-span-2" style={{ borderColor: colors.borderColor }}>
          <div className="flex items-center mb-2">
            <FaCalendarAlt className="mr-2" style={{ color: colors.secondaryColor }} />
            <span className="text-sm font-medium" style={{ color: colors.textLight }}>Détails de la réservation</span>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: colors.textLight }}>Date de réservation:</span>
              <span className="text-sm font-medium" style={{ color: colors.textColor }}>{formatDate(reservation.date_res)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: colors.textLight }}>Identifiant:</span>
              <span className="text-sm font-medium" style={{ color: colors.textColor }}>#{reservation.id_res}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailReservation;

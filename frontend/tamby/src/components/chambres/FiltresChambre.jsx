import React from 'react';
import FiltresAvances from '../communs/FiltresAvances';

function FiltresChambre({ filterCriteria, handleFilterChange, batiments, etatsChambres }) {
  return (
    <FiltresAvances
      titre="Filtres des chambres"
      enfants={
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bâtiment</label>
            <select
              name="n_bat"
              value={filterCriteria.n_bat}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Tous les bâtiments</option>
              {batiments.map((bat) => (
                <option key={bat.n_bat} value={bat.n_bat.toString()}>
                  {bat.nom_bat || `Bâtiment ${bat.n_bat}`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">État</label>
            <select
              name="etat_chambre"
              value={filterCriteria.etat_chambre}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Tous les états</option>
              {etatsChambres.map((etat, index) => (
                <option key={index} value={etat}>{etat}</option>
              ))}
            </select>
          </div>
        </>
      }
    />
  );
}

export default FiltresChambre;

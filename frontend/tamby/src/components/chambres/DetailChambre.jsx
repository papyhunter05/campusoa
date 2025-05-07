import React from 'react';

function DetailChambre({ chambre, getBatimentName }) {
  return (
    <div>
      <p><strong>Bâtiment:</strong> {getBatimentName(chambre.n_bat)}</p>
      <p><strong>Capacité maximale:</strong> {chambre.capacite_max} personne(s)</p>
      <p><strong>État:</strong> {chambre.etat_chambre}</p>
    </div>
  );
}

export default DetailChambre;

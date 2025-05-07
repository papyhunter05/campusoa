import React from 'react';

function Chargement({ message = "Chargement des données..." }) {
  return (
    <div className="text-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-2 text-gray-600">{message}</p>
    </div>
  );
}

export default Chargement;

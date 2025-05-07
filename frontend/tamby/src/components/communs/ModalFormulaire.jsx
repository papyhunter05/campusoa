import React from 'react';

function ModalFormulaire({ titre, formulaire, visible, onFermer }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{titre}</h2>
        {formulaire}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={onFermer}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalFormulaire;

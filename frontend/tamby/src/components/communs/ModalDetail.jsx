import React from 'react';

function ModalDetail({ titre, contenu, visible, onFermer }) {
  if (!visible) return null;
  
  console.log("Modal visible, contenu:", contenu);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{titre}</h2>
          <button 
            onClick={onFermer}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        </div>
        <div className="mb-4">{contenu}</div>
        <div className="flex justify-end">
          <button 
            onClick={onFermer}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDetail;

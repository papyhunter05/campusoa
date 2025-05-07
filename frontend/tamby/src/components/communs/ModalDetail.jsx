import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { colors } from '../../styles/theme';

function ModalFormulaire({ titre, formulaire, visible, onFermer }) {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    if (visible) {
      // Délai pour permettre l'animation d'entrée
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
      onClick={onFermer}
    >
      <div 
        className="relative bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden"
        style={{ 
          transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
          opacity: isOpen ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barre de titre avec effet de dégradé */}
        <div 
          className="p-5 flex items-center justify-between relative"
          style={{ 
            background: `linear-gradient(135deg, ${colors.primaryColor}, ${colors.complementaryColor})`,
            borderBottom: `1px solid ${colors.borderColor}`,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
          }}
        >
          <h2 
            className="text-xl font-bold"
            style={{ color: colors.globalLight }}
          >
            {titre}
          </h2>
          <button
            type="button"
            onClick={onFermer}
            className="p-2 rounded-full transition-all duration-200 focus:outline-none"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: colors.globalLight
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'rotate(90deg)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'rotate(0)';
            }}
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Corps du modal avec effet d'ombre subtil */}
        <div 
          className="p-6"
          style={{ 
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)'
          }}
        >
          {formulaire}
        </div>
        
        {/* Pied de page avec effet de séparation */}
        <div 
          className="flex justify-end p-4"
          style={{ 
            borderTop: `1px solid ${colors.borderColor}`,
            backgroundColor: colors.inputBg
          }}
        >
          <button
            type="button"
            onClick={onFermer}
            className="px-4 py-2 rounded-md transition-all duration-200 flex items-center"
            style={{ 
              backgroundColor: 'transparent',
              color: colors.textColor,
              border: `1px solid ${colors.borderColor}`
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = colors.borderColor;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalFormulaire;

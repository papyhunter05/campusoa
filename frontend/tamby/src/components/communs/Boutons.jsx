import React from 'react';
import { FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { colors } from '../../styles/theme';

export function BoutonAjouter({ onClick, texte = "Ajouter", className = "" }) {
  return (
    <button 
      className={`py-3 px-5 rounded-md transition-all duration-300 flex items-center ${className}`}
      onClick={onClick}
      style={{ 
        backgroundColor: colors.primaryColor,
        color: 'white',
        fontWeight: '600',
        boxShadow: '0 4px 6px rgba(79, 72, 236, 0.2)'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = colors.primaryDark;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(79, 72, 236, 0.3)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = colors.primaryColor;
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(79, 72, 236, 0.2)';
      }}
    >
      <FaPlus className="mr-2" /> {texte}
    </button>
  );
}

export function BoutonVoir({ onClick, className = "" }) {
  return (
    <button 
      onClick={onClick} 
      className={`p-2 rounded-full transition-all duration-200 ${className}`}
      title="Voir les détails"
      style={{ 
        backgroundColor: colors.highlightColor,
        color: colors.primaryColor
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = colors.primaryColor;
        e.currentTarget.style.color = 'white';
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = colors.highlightColor;
        e.currentTarget.style.color = colors.primaryColor;
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <FaEye />
    </button>
  );
}

export function BoutonModifier({ onClick, className = "" }) {
  return (
    <button 
      onClick={onClick} 
      className={`p-2 rounded-full transition-all duration-200 ${className}`}
      title="Modifier"
      style={{ 
        backgroundColor: 'rgba(255, 191, 24, 0.2)',
        color: colors.secondaryDark
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = colors.secondaryColor;
        e.currentTarget.style.color = 'white';
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 191, 24, 0.2)';
        e.currentTarget.style.color = colors.secondaryDark;
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <FaEdit />
    </button>
  );
}

export function BoutonSupprimer({ onClick, className = "" }) {
  return (
    <button 
      onClick={onClick} 
      className={`p-2 rounded-full transition-all duration-200 ${className}`}
      title="Supprimer"
      style={{ 
        backgroundColor: 'rgba(185, 28, 28, 0.1)',
        color: colors.errorText
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = colors.errorText;
        e.currentTarget.style.color = 'white';
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(185, 28, 28, 0.1)';
        e.currentTarget.style.color = colors.errorText;
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <FaTrash />
    </button>
  );
}

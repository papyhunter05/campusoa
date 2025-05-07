import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { colors } from '../../styles/theme';

function Recherche({ 
  valeur, 
  onChange, 
  placeholder = "Rechercher...",
  className = "",
  width = "300px"
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        width: width
      }}
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch style={{ color: isFocused ? colors.primaryColor : colors.textLight }} />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={valeur}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full pl-10 pr-4 py-2 rounded-full focus:outline-none transition-all duration-200"
        style={{ 
          border: `1px solid ${isFocused ? colors.primaryColor : colors.borderColor}`,
          backgroundColor: isFocused ? colors.globalLight : colors.inputBg,
          boxShadow: isFocused ? `0 0 0 3px ${colors.highlightColor}` : 'none',
          color: colors.textColor
        }}
      />
    </div>
  );
}

export default Recherche;

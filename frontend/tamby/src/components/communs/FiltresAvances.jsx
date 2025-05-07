import React, { useState } from 'react';
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { colors } from '../../styles/theme';

function FiltresAvances({ 
  titre = "Filtres", 
  children, 
  collapsible = true, 
  defaultOpen = false 
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div 
      className="rounded-lg shadow-md mb-6 transition-all duration-300"
      style={{ 
        backgroundColor: colors.globalLight,
        borderLeft: `4px solid ${colors.secondaryColor}`,
        padding: isOpen ? '20px' : '16px'
      }}
    >
      <div 
        className={`flex items-center ${collapsible ? 'cursor-pointer' : ''}`}
        onClick={collapsible ? () => setIsOpen(!isOpen) : undefined}
      >
        <div 
          className="p-2 rounded-full mr-3"
          style={{ 
            backgroundColor: colors.secondaryColor + '20', // 20% opacity
          }}
        >
          <FaFilter 
            style={{ color: colors.secondaryColor }}
          />
        </div>
        <h2 
          className="text-lg font-semibold flex-grow"
          style={{ color: colors.complementaryColor }}
        >
          {titre}
        </h2>
        {collapsible && (
          <button
            className="p-2 rounded-full transition-colors duration-200"
            style={{ 
              backgroundColor: isOpen ? colors.secondaryColor + '20' : 'transparent',
              color: colors.textLight,
              border: 'none'
            }}
          >
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        )}
      </div>

      {collapsible && (
        <div 
          className="overflow-hidden transition-all duration-300"
          style={{ 
            maxHeight: isOpen ? '500px' : '0',
            opacity: isOpen ? 1 : 0,
            marginTop: isOpen ? '16px' : '0'
          }}
        >
          {children}
        </div>
      )}

      {!collapsible && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}

export default FiltresAvances;

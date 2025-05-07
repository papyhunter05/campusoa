import React, { useState, useEffect } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { colors } from '../../styles/theme';

function Tableau({ 
  colonnes, 
  donnees, 
  onTri, 
  actions, 
  messageVide = "Aucune donnée trouvée",
  className = "",
  champTri = null,
  directionTri = 'asc'
}) {
  const [hoverRow, setHoverRow] = useState(null);
  const [animatedRows, setAnimatedRows] = useState([]);
  
  // Animation d'entrée des lignes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedRows(donnees.map((_, index) => index));
    }, 100);
    return () => clearTimeout(timer);
  }, [donnees]);

  // Fonction pour déterminer l'icône de tri
  const getSortIcon = (colId) => {
    if (colId !== champTri) return <FaSort className="ml-1 text-gray-400" />;
    return directionTri === 'asc' ? 
      <FaSortUp className="ml-1 text-white" /> : 
      <FaSortDown className="ml-1 text-white" />;
  };

  return (
    <div className={`overflow-hidden rounded-lg shadow-lg ${className}`}>
      <table className="min-w-full divide-y divide-gray-200" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead style={{ backgroundColor: colors.complementaryColor }}>
          <tr>
            {colonnes.map((colonne) => (
              <th 
                key={colonne.id} 
                scope="col" 
                className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
                style={{ 
                  color: colors.globalLight,
                  borderBottom: `2px solid ${colors.primaryColor}`,
                  transition: 'all 0.2s'
                }}
              >
                {colonne.triable ? (
                  <button 
                    onClick={() => onTri(colonne.id)} 
                    className="flex items-center w-full focus:outline-none"
                    style={{ color: 'inherit' }}
                  >
                    {colonne.label} {getSortIcon(colonne.id)}
                  </button>
                ) : (
                  colonne.label
                )}
              </th>
            ))}
            {actions && <th 
              scope="col" 
              className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
              style={{ 
                color: colors.globalLight,
                borderBottom: `2px solid ${colors.primaryColor}`
              }}
            >
              Actions
            </th>}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {donnees.length === 0 ? (
            <tr>
              <td 
                colSpan={colonnes.length + (actions ? 1 : 0)} 
                className="px-6 py-10 text-center text-sm"
                style={{ color: colors.textLight }}
              >
                <div className="flex flex-col items-center justify-center">
                  <svg 
                    className="w-12 h-12 mb-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: colors.borderColor }}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  {messageVide}
                </div>
              </td>
            </tr>
          ) : (
            donnees.map((item, index) => (
              <tr 
                key={index} 
                className="transition-colors duration-200"
                style={{ 
                  backgroundColor: hoverRow === index ? colors.highlightColor : 'white',
                  opacity: animatedRows.includes(index) ? 1 : 0,
                  transform: animatedRows.includes(index) ? 'translateY(0)' : 'translateY(10px)',
                  transition: `all 0.3s ease-out ${index * 0.05}s`,
                }}
                onMouseEnter={() => setHoverRow(index)}
                onMouseLeave={() => setHoverRow(null)}
              >
                {colonnes.map((colonne) => (
                  <td 
                    key={colonne.id} 
                    className="px-6 py-4 whitespace-nowrap text-sm"
                    style={{ 
                      color: colonne.id === 'n_chambre' ? colors.complementaryColor : colors.textColor,
                      fontWeight: colonne.id === 'n_chambre' ? '600' : 'normal'
                    }}
                  >
                    {colonne.rendu ? colonne.rendu(item) : item[colonne.id]}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      {actions(item)}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Tableau;

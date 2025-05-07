import React from 'react';
import { FaBuilding, FaBed, FaTools, FaCheckCircle } from 'react-icons/fa';
import { colors } from '../../styles/theme';

function StatistiquesEtablissement({ etablissements }) {
  // Calculer les statistiques
  const total = etablissements.length;
  const totalChambres = etablissements.reduce((acc, etab) => acc + etab.nb_chambre, 0);
  const enBonEtat = etablissements.filter(e => e.etat_bat === 'Excellent' || e.etat_bat === 'Bon').length;
  const enRenovation = etablissements.filter(e => e.etat_bat === 'En rénovation').length;
  
  // Calculer les pourcentages
  const pourcentageBonEtat = Math.round((enBonEtat / total) * 100) || 0;
  
  const stats = [
    {
      titre: 'Bâtiments',
      valeur: total,
      icone: <FaBuilding />,
      couleur: colors.primaryColor,
      bgCouleur: colors.highlightColor
    },
    {
      titre: 'Chambres totales',
      valeur: totalChambres,
      icone: <FaBed />,
      couleur: colors.secondaryColor,
      bgCouleur: 'rgba(255, 191, 24, 0.1)'
    },
    {
      titre: 'En bon état',
      valeur: enBonEtat,
      pourcentage: pourcentageBonEtat,
      icone: <FaCheckCircle />,
      couleur: colors.successColor,
      bgCouleur: '#ecfdf5'
    },
    {
      titre: 'En rénovation',
      valeur: enRenovation,
      icone: <FaTools />,
      couleur: '#ca8a04',
      bgCouleur: '#fef9c3'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="rounded-lg p-4 shadow-md transition-transform duration-300 hover:shadow-lg"
          style={{ 
            backgroundColor: stat.bgCouleur,
            borderLeft: `4px solid ${stat.couleur}`,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{ color: colors.textLight }}>{stat.titre}</p>
              <p className="text-2xl font-bold mt-1" style={{ color: stat.couleur }}>{stat.valeur}</p>
              {stat.pourcentage !== undefined && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${stat.pourcentage}%`,
                        backgroundColor: stat.couleur
                      }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1" style={{ color: colors.textLight }}>{stat.pourcentage}% du total</p>
                </div>
              )}
            </div>
            <div 
              className="p-3 rounded-full"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                color: stat.couleur
              }}
            >
              {stat.icone}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatistiquesEtablissement;

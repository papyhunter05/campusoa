import React from 'react';
import { FaUser, FaUserGraduate, FaBed, FaUniversity, FaGraduationCap } from 'react-icons/fa';
import { colors } from '../../styles/theme';

function StatistiquesEtudiant({ etudiants, chambres }) {
  // Calculer les statistiques
  const total = etudiants.length;
  const avecChambre = etudiants.filter(e => e.n_chambre).length;
  const sansChambre = total - avecChambre;
  
  // Calculer les pourcentages
  const pourcentageAvecChambre = Math.round((avecChambre / total) * 100) || 0;
  
  // Répartition par université
  const universites = [...new Set(etudiants.map(e => e.univ))];
  const etudiantsParUniversite = universites.map(univ => {
    const count = etudiants.filter(e => e.univ === univ).length;
    return {
      nom: univ,
      count,
      pourcentage: Math.round((count / total) * 100) || 0
    };
  }).sort((a, b) => b.count - a.count);
  
  // Répartition par niveau d'étude
  const niveaux = [...new Set(etudiants.map(e => e.niveau))];
  const etudiantsParNiveau = niveaux.map(niveau => {
    const count = etudiants.filter(e => e.niveau === niveau).length;
    return {
      nom: niveau,
      count,
      pourcentage: Math.round((count / total) * 100) || 0
    };
  }).sort((a, b) => b.count - a.count);
  
  const stats = [
    {
      titre: 'Étudiants',
      valeur: total,
      icone: <FaUser />,
      couleur: colors.primaryColor,
      bgCouleur: colors.highlightColor
    },
    {
      titre: 'Avec chambre',
      valeur: avecChambre,
      pourcentage: pourcentageAvecChambre,
      icone: <FaBed />,
      couleur: colors.successColor,
      bgCouleur: '#ecfdf5'
    },
    {
      titre: 'Sans chambre',
      valeur: sansChambre,
      icone: <FaUserGraduate />,
      couleur: '#ca8a04',
      bgCouleur: '#fef9c3'
    },
    {
      titre: 'Universités',
      valeur: universites.length,
      icone: <FaUniversity />,
      couleur: colors.secondaryColor,
      bgCouleur: 'rgba(255, 191, 24, 0.1)'
    }
  ];

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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

      {/* Répartition par université */}
      {etudiantsParUniversite.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-3" style={{ color: colors.complementaryColor }}>
              <FaUniversity className="inline mr-2" style={{ color: colors.secondaryColor }} />
              Répartition par université
            </h3>
            <div className="space-y-3">
              {etudiantsParUniversite.slice(0, 3).map((univ, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-32 sm:w-40 mr-4">
                    <p className="text-sm truncate" style={{ color: colors.textColor }}>{univ.nom}</p>
                  </div>
                  <div className="flex-1">
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <span className="text-xs font-semibold inline-block" style={{ color: colors.textLight }}>
                            {univ.count} étudiants
                          </span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold inline-block" style={{ color: colors.textLight }}>
                            {univ.pourcentage}%
                          </span>
                        </div>
                      </div>
                      <div className="flex h-2 overflow-hidden text-xs bg-gray-200 rounded-full">
                        <div 
                          style={{ 
                            width: `${univ.pourcentage}%`,
                            backgroundColor: index === 0 ? colors.primaryColor : 
                                            index === 1 ? colors.secondaryColor : 
                                            colors.complementaryLight
                          }} 
                          className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Répartition par niveau d'étude */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-3" style={{ color: colors.complementaryColor }}>
              <FaGraduationCap className="inline mr-2" style={{ color: colors.secondaryColor }} />
              Répartition par niveau
            </h3>
            <div className="space-y-3">
              {etudiantsParNiveau.slice(0, 3).map((niveau, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-16 mr-4">
                    <p className="text-sm font-medium" style={{ color: colors.textColor }}>{niveau.nom}</p>
                  </div>
                  <div className="flex-1">
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <span className="text-xs font-semibold inline-block" style={{ color: colors.textLight }}>
                            {niveau.count} étudiants
                          </span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold inline-block" style={{ color: colors.textLight }}>
                            {niveau.pourcentage}%
                          </span>
                        </div>
                      </div>
                      <div className="flex h-2 overflow-hidden text-xs bg-gray-200 rounded-full">
                        <div 
                          style={{ 
                            width: `${niveau.pourcentage}%`,
                            backgroundColor: index === 0 ? colors.successColor : 
                                            index === 1 ? '#ca8a04' : 
                                            colors.complementaryLight
                          }} 
                          className="flex flex-col justify-center text-center text-white shadow-none whitespace-nowrap"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatistiquesEtudiant;

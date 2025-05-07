import React from 'react';
import { FaCalendarAlt, FaCalendarCheck, FaChartBar, FaBuilding, FaUserGraduate } from 'react-icons/fa';
import { colors } from '../../styles/theme';

function StatistiquesReservation({ reservations, etudiants, chambres, batiments }) {
  // Calculer les statistiques
  const total = reservations.length;
  
  // Réservations par mois
  const reservationsParMois = {};
  const moisActuel = new Date().getMonth();
  const anneeActuelle = new Date().getFullYear();
  
  // Initialiser les 6 derniers mois
  for (let i = 0; i < 6; i++) {
    const date = new Date(anneeActuelle, moisActuel - i, 1);
    const moisAnnee = `${date.getMonth() + 1}-${date.getFullYear()}`;
    reservationsParMois[moisAnnee] = 0;
  }
  
  // Compter les réservations par mois
  reservations.forEach(res => {
    const date = new Date(res.date_res);
    const moisAnnee = `${date.getMonth() + 1}-${date.getFullYear()}`;
    if (reservationsParMois[moisAnnee] !== undefined) {
      reservationsParMois[moisAnnee]++;
    }
  });
  
  // Convertir en tableau pour l'affichage
  const donneesParMois = Object.entries(reservationsParMois)
    .map(([moisAnnee, count]) => {
      const [mois, annee] = moisAnnee.split('-');
      return {
        mois: new Date(parseInt(annee), parseInt(mois) - 1, 1).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }),
        count
      };
    })
    .reverse();
  
  // Réservations par bâtiment
  const reservationsParBatiment = {};
  batiments.forEach(bat => {
    reservationsParBatiment[bat.n_bat] = {
      nom: bat.nom_bat,
      count: 0
    };
  });
  
  reservations.forEach(res => {
    const chambre = chambres.find(c => c.n_chambre === res.n_chambre);
    if (chambre && reservationsParBatiment[chambre.n_bat]) {
      reservationsParBatiment[chambre.n_bat].count++;
    }
  });
  
  const donneesParBatiment = Object.values(reservationsParBatiment)
    .sort((a, b) => b.count - a.count);
  
  // Statistiques générales
  const reservationsRecentes = reservations.filter(res => {
    const dateRes = new Date(res.date_res);
    const unMoisAvant = new Date();
    unMoisAvant.setMonth(unMoisAvant.getMonth() - 1);
    return dateRes >= unMoisAvant;
  }).length;
  
  const etudiantsUniques = new Set(reservations.map(res => res.n_etudiant)).size;
  
  const stats = [
    {
      titre: 'Total réservations',
      valeur: total,
      icone: <FaCalendarAlt />,
      couleur: colors.primaryColor,
      bgCouleur: colors.highlightColor
    },
    {
      titre: 'Réservations récentes',
      valeur: reservationsRecentes,
      icone: <FaCalendarCheck />,
      couleur: colors.successColor,
      bgCouleur: '#ecfdf5'
    },
    {
      titre: 'Étudiants concernés',
      valeur: etudiantsUniques,
      icone: <FaUserGraduate />,
      couleur: '#ca8a04',
      bgCouleur: '#fef9c3'
    },
    {
      titre: 'Bâtiments utilisés',
      valeur: Object.values(reservationsParBatiment).filter(b => b.count > 0).length,
      icone: <FaBuilding />,
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

      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Réservations par mois */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-3" style={{ color: colors.complementaryColor }}>
            <FaChartBar className="inline mr-2" style={{ color: colors.secondaryColor }} />
            Réservations par mois
          </h3>
          <div className="space-y-3">
            {donneesParMois.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-24 mr-4">
                  <p className="text-sm" style={{ color: colors.textColor }}>{item.mois}</p>
                </div>
                <div className="flex-1">
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="text-xs font-semibold inline-block" style={{ color: colors.textLight }}>
                          {item.count} réservation(s)
                        </span>
                      </div>
                    </div>
                    <div className="flex h-2 overflow-hidden text-xs bg-gray-200 rounded-full">
                      <div 
                        style={{ 
                          width: `${Math.max((item.count / Math.max(...donneesParMois.map(d => d.count), 1)) * 100, 5)}%`,
                          backgroundColor: colors.primaryColor
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

        {/* Réservations par bâtiment */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-3" style={{ color: colors.complementaryColor }}>
            <FaBuilding className="inline mr-2" style={{ color: colors.secondaryColor }} />
            Réservations par bâtiment
          </h3>
          <div className="space-y-3">
            {donneesParBatiment.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-32 sm:w-40 mr-4">
                  <p className="text-sm truncate" style={{ color: colors.textColor }}>{item.nom}</p>
                </div>
                <div className="flex-1">
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="text-xs font-semibold inline-block" style={{ color: colors.textLight }}>
                          {item.count} réservation(s)
                        </span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold inline-block" style={{ color: colors.textLight }}>
                          {total > 0 ? Math.round((item.count / total) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                    <div className="flex h-2 overflow-hidden text-xs bg-gray-200 rounded-full">
                      <div 
                        style={{ 
                          width: `${total > 0 ? (item.count / total) * 100 : 0}%`,
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
      </div>
    </div>
  );
}

export default StatistiquesReservation;

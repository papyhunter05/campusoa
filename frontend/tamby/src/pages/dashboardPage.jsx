import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../utils/authService';
import { colors } from '../styles/theme';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import CommentSection from '../components/CommentSection';

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Dashboard() {
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState(null);
  const [occupancyData, setOccupancyData] = useState(null);
  const [currentMonthReservations, setCurrentMonthReservations] = useState(0);
  const [previousMonthReservations, setPreviousMonthReservations] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  
  useEffect(() => {
    // Redirection si l'utilisateur n'est pas un administrateur
    if (!isAuthenticated() || !isAdmin()) {
      navigate('/login');
      return;
    }
    
    // Définir la date actuelle
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('fr-FR', options));
    
    // Simulation de chargement pour effet visuel
    const loadingTimer = setTimeout(() => {
      try {
        generateChartData();
        generateOccupancyData();
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la génération des données:", error);
        setIsLoading(false);
      }
    }, 800);
    
    return () => clearTimeout(loadingTimer);
  }, [navigate]);
  
  const generateOccupancyData = () => {
    setOccupancyData({
      labels: ['Occupées', 'Disponibles'],
      datasets: [
        {
          data: [42, 58],
          backgroundColor: [
            colors.primaryColor,
            '#e5e7eb',
          ],
          hoverBackgroundColor: [
            colors.primaryDark,
            '#d1d5db',
          ],
          borderWidth: 0,
        },
      ],
    });
  };
  
  const generateChartData = () => {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const currentMonth = new Date().getMonth();
    
    // Données annuelles
    const labels = [...months];
    const reservations = months.map((_, index) => {
      const baseValue = 30 + Math.floor(Math.random() * 20);
      const seasonalFactor = index >= 4 && index <= 7 ? 1.5 : 1;
      return Math.floor(baseValue * seasonalFactor);
    });
    const comparisonData = months.map((_, index) => {
      const baseValue = 25 + Math.floor(Math.random() * 15);
      const seasonalFactor = index >= 4 && index <= 7 ? 1.4 : 0.9;
      return Math.floor(baseValue * seasonalFactor);
    });
    
    // Calculer les statistiques pour les indicateurs clés
    const current = reservations[currentMonth];
    const previous = reservations[currentMonth === 0 ? 11 : currentMonth - 1];
    const change = previous > 0 ? ((current - previous) / previous) * 100 : 0;
    
    setCurrentMonthReservations(current);
    setPreviousMonthReservations(previous);
    setPercentageChange(change);
    
    // Créer un dégradé pour le fond du graphique
    const ctx = document.createElement('canvas').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, `${colors.primaryColor}30`);
    gradient.addColorStop(1, `${colors.primaryColor}05`);
    
    const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient2.addColorStop(0, `${colors.secondaryColor}20`);
    gradient2.addColorStop(1, `${colors.secondaryColor}05`);
    
    const newData = {
      labels,
      datasets: [
        {
          label: 'Réservations actuelles',
          data: reservations,
          borderColor: colors.primaryColor,
          backgroundColor: gradient,
          pointBackgroundColor: colors.primaryColor,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: colors.primaryColor,
          pointRadius: 6,
          pointHoverRadius: 10,
          tension: 0.4,
          fill: true,
          borderWidth: 3,
        },
        {
          label: 'Année précédente',
          data: comparisonData,
          borderColor: colors.secondaryColor,
          backgroundColor: gradient2,
          pointBackgroundColor: colors.secondaryColor,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: colors.secondaryColor,
          pointRadius: 5,
          pointHoverRadius: 8,
          tension: 0.4,
          fill: true,
          borderWidth: 2,
          borderDash: [5, 5],
        }
      ],
    };
    
    setReservationData(newData);
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            family: "'Poppins', sans-serif",
            size: 12,
            weight: '600'
          },
          color: colors.textColor
        }
      },
      tooltip: {
        backgroundColor: colors.complementaryColor,
        titleFont: {
          size: 14,
          weight: 'bold',
          family: "'Poppins', sans-serif",
        },
        bodyFont: {
          size: 14,
          family: "'Poppins', sans-serif",
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            return ` ${context.dataset.label}: ${context.raw} réservations`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: colors.textColor,
          font: {
            size: 12,
            family: "'Poppins', sans-serif",
          },
          padding: 10,
        },
        border: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: `${colors.borderColor}30`,
          drawBorder: false,
          lineWidth: 1,
          drawTicks: false
        },
        ticks: {
          color: colors.textColor,
          font: {
            size: 12,
            family: "'Poppins', sans-serif",
          },
          padding: 10,
          callback: function(value) {
            return value + ' ';  // Ajouter un espace après le nombre
          }
        },
        border: {
          display: false
        }
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    elements: {
      line: {
        tension: 0.4,
        capBezierPoints: true
      },
      point: {
        hitRadius: 8,
        hoverRadius: 10
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: colors.complementaryColor,
        titleFont: {
          size: 14,
          weight: 'bold',
          family: "'Poppins', sans-serif",
        },
        bodyFont: {
          size: 14,
          family: "'Poppins', sans-serif",
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      },
    },
    cutout: '75%',
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 800,
      easing: 'easeOutCirc'
    }
  };

  // Statistiques pour les cartes
  const statsCards = [
    {
      title: "Chambres occupées",
      value: 42,
      total: 100,
      trend: "+5%",
      trendUp: true,
      icon: "🏠",
      color: colors.primaryColor,
    },
    {
      title: "Réservations en attente",
      value: 18,
      trend: "-2%",
      trendUp: false,
      icon: "📋",
      color: colors.secondaryColor,
    },
    {
      title: "Étudiants inscrits",
      value: 156,
      trend: "+12%",
      trendUp: true,
      icon: "👨‍🎓",
      color: colors.complementaryColor,
    }
  ];

  // Actions rapides
  const quickActions = [
    { 
      label: "Gérer les réservations", 
      path: "/reservations", 
      icon: "📝",
      color: colors.primaryColor,
      description: "Voir et traiter les demandes de réservation"
    },
    { 
      label: "Gérer les étudiants", 
      path: "/etudiants", 
      icon: "👥",
      color: colors.secondaryColor,
      description: "Consulter et modifier les profils étudiants"
    },
    { 
      label: "Gérer les chambres", 
      path: "/chambres", 
      icon: "🏠",
      color: colors.primaryLight,
      description: "Administrer les chambres et leur disponibilité"
    },
    { 
      label: "Gérer les établissements", 
      path: "/etablissements", 
      icon: "🏫",
      color: colors.complementaryColor,
      description: "Configurer les établissements partenaires"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header avec date et titre */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: colors.complementaryColor }}>
              Tableau de bord administrateur
            </h1>
            <p className="text-gray-500">{currentDate}</p>
          </div>
        </div>
        
        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div 
              key={index}
              className="bg-white overflow-hidden shadow-lg rounded-xl transition-all duration-300"
              style={{
                transform: hoveredCard === index ? 'translateY(-5px)' : 'translateY(0)',
                boxShadow: hoveredCard === index 
                  ? `0 15px 30px rgba(0, 0, 0, 0.1), 0 0 0 2px ${stat.color}30` 
                  : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                borderLeft: `4px solid ${stat.color}`
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="px-6 py-5 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{stat.title}</h3>
                  <div className="mt-2 flex items-baseline">
                    <div className="text-4xl font-bold" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    {stat.total && (
                      <span className="ml-2 text-sm text-gray-500">
                        sur {stat.total} disponibles
                      </span>
                    )}
                  </div>
                  <div className={`mt-1 text-sm ${stat.trendUp ? 'text-green-600' : 'text-red-600'} font-medium flex items-center`}>
                    {stat.trendUp ? '↑' : '↓'} {stat.trend}
                    <span className="ml-1 text-gray-500">vs mois précédent</span>
                  </div>
                </div>
                <div className="text-5xl opacity-80" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
              </div>
              <div className="h-1" style={{ background: `linear-gradient(to right, ${stat.color}, transparent)` }}></div>
            </div>
          ))}
        </div>
        
        {/* Graphiques et indicateurs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Graphique principal */}
          <div className="lg:col-span-3 bg-white overflow-hidden shadow-xl rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Évolution annuelle des réservations
            </h2>
            
            <div className="h-80 flex items-center justify-center">
              {isLoading ? (
                <div className="w-20 h-20 border-4 border-t-transparent rounded-full animate-spin"
                     style={{ borderColor: `${colors.primaryColor}40`, borderTopColor: 'transparent' }}></div>
              ) : (
                <div className="w-full h-full">
                  {reservationData && (
                    <Line 
                      data={reservationData} 
                      options={chartOptions} 
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Indicateurs clés */}
          <div className="lg:col-span-1 space-y-6">
            {/* Graphique d'occupation */}
            <div className="bg-white overflow-hidden shadow-xl rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Taux d'occupation</h3>
              <div className="h-48 relative">
                {!isLoading && occupancyData && <Doughnut data={occupancyData} options={doughnutOptions} />}
                {!isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold" style={{ color: colors.primaryColor }}>42%</span>
                    <span className="text-sm text-gray-500">Occupées</span>
                  </div>
                )}
                {isLoading && (
                  <div className="h-full flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
                         style={{ borderColor: `${colors.primaryColor}40`, borderTopColor: 'transparent' }}></div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Indicateurs clés */}
            <div 
              className="bg-white overflow-hidden shadow-xl rounded-xl p-6"
              style={{ 
                borderLeft: `4px solid ${colors.primaryColor}` 
              }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Indicateurs clés</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Réservations ce mois</span>
                  <span className="text-xl font-bold" style={{ color: colors.primaryColor }}>{currentMonthReservations}</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Mois précédent</span>
                  <span className="text-xl font-bold" style={{ color: colors.secondaryColor }}>{previousMonthReservations}</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Évolution</span>
                  <span className={`text-xl font-bold ${percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions rapides */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">⚡</span> Actions rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                onClick={() => navigate(action.path)}
                style={{ 
                  background: `linear-gradient(135deg, ${action.color}, ${action.color === colors.primaryColor ? colors.primaryDark : action.color === colors.secondaryColor ? colors.secondaryDark : colors.complementaryDark})` 
                }}
              >
                <div className="p-6">
                  <div className="text-4xl text-white mb-4">{action.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{action.label}</h3>
                  <p className="text-white text-opacity-80">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Section des commentaires */}
        <div className="mb-8">
          <CommentSection />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

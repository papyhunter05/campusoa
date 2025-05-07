import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, isAdmin, isEtudiant, logout } from '../utils/authService';

function Navigation() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const admin = isAdmin();
  const etudiant = isEtudiant();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-700">CampusOA</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {/* Lien Accueil - toujours visible */}
              <Link 
                to="/" 
                className="border-transparent text-gray-900 hover:border-blue-700 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Accueil
              </Link>

              {/* Lien Chambres - visible pour les étudiants et admins connectés */}
              {authenticated && (etudiant || admin) && (
                <Link 
                  to="/chambres" 
                  className="border-transparent text-gray-900 hover:border-blue-700 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Chambres
                </Link>
              )}

              {/* Liens visibles uniquement pour les admins */}
              {authenticated && admin && (
                <>
                  <Link 
                    to="/etablissements" 
                    className="border-transparent text-gray-900 hover:border-blue-700 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Établissements
                  </Link>
                  <Link 
                    to="/etudiants" 
                    className="border-transparent text-gray-900 hover:border-blue-700 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Étudiants
                  </Link>
                  <Link 
                    to="/reservations" 
                    className="border-transparent text-gray-900 hover:border-blue-700 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Réservations
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {authenticated ? (
                <button
                    onClick={handleLogout}
                    className="ml-3 inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-400"
                >
                    Déconnexion
                </button>
                ) : (
                <Link
                    to="/login"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Connexion
              </Link>
            )}
          </div>
          
          {/* Menu mobile */}
          <div className="flex items-center sm:hidden">
            {/* Implémentation du menu mobile ici si nécessaire */}
          </div>
        </div>
      </div>

      {/* Menu mobile déroulant (à implémenter si nécessaire) */}
    </nav>
  );
}

export default Navigation;

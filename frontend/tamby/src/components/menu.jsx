import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Gestion Campus
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Accueil
                </Link>
                <Link
                  to="/chambres"
                  className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Chambres
                </Link>
                <Link
                  to="/etablissements"
                  className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Établissements
                </Link>
                <Link
                  to="/reservations"
                  className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Réservation
                </Link>
                <Link
                  to="/etudiants"
                  className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Étudiants
                </Link>
                <Link
                  to="/login"
                  className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
          {/* Vous pouvez ajouter d'autres éléments ici (bouton de connexion, etc.) */}
        </div>
      </div>
    </nav>
  );
}

export default Menu;
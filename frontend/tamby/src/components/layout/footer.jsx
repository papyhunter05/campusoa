import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../../utils/authService';

function Footer() {
  const authenticated = isAuthenticated();
  const admin = isAdmin();

  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section 1: About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">À propos</h3>
            <p className="text-gray-300">
            Campusoa est une cité résidentielle privée dédiée aux étudiants universitaires, implantée au cœur de Fianarantsoa depuis 12 ans. Pionnière dans son domaine, nous offrons un cadre de vie idéal pour la réussite académique et l'épanouissement personnel.            </p>
          </div>
          
          {/* Section 2: Quick Links - visible uniquement pour les admins */}
          {authenticated && admin ? (
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigations rapides</h3>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link></li>
                <li><Link to="/chambres" className="text-gray-300 hover:text-white">Chambres</Link></li>
                <li><Link to="/etablissements" className="text-gray-300 hover:text-white">Établissements</Link></li>
                <li><Link to="/reservations" className="text-gray-300 hover:text-white">Réservations</Link></li>
                <li><Link to="/etudiants" className="text-gray-300 hover:text-white">Étudiants</Link></li>
              </ul>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4">Informations</h3>
              <p className="text-gray-300">
                Connectez-vous en tant qu'administrateur pour accéder aux fonctionnalités de gestion.
              </p>
            </div>
          )}
          
          {/* Section 3: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacts</h3>
            <address className="not-italic text-gray-300">
              <p>Andrainjato </p>
              <p>Fianarantsoa 301, Madagascar</p>
              <p className="mt-2">Email: Campusoa@campus.com</p>
              <p>Téléphone: +261 38 45 272 01</p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ecole Nationale d'informatique. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

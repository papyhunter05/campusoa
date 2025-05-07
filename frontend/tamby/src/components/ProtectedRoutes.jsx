import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, isAdmin, isEtudiant } from '../utils/authService';

// Route qui nécessite une authentification
export const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

// Route accessible uniquement aux administrateurs
export const AdminRoute = () => {
  return isAuthenticated() && isAdmin() ? <Outlet /> : <Navigate to="/" />;
};

// Route accessible aux étudiants et administrateurs
export const EtudiantRoute = () => {
  return isAuthenticated() && (isEtudiant() || isAdmin()) ? <Outlet /> : <Navigate to="/" />;
};

// Route accessible uniquement aux visiteurs non authentifiés
export const PublicOnlyRoute = () => {
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};

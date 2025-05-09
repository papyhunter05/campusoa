import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AccueilPage from './pages/accueilpage.jsx';
import Dashboard from './pages/dashboardPage.jsx';
import ChambrePage from './pages/chambrepage.jsx';
import EtablissementPage from './pages/etablissementpage.jsx';
import EtudiantPage from './pages/etudiantpage.jsx';
import LoginPage from './pages/loginpage.jsx';
import ReservationPage from './pages/reservationpage.jsx';
import ForgotPasswordPage from './pages/forgotPassword.jsx';
import ResetPasswordPage from './pages/resetPassword.jsx';
import { PrivateRoute, AdminRoute, EtudiantRoute, PublicOnlyRoute } from './components/ProtectedRoutes.jsx';

function Approute() {
  return (
    <Routes>
      {/* Routes publiques accessibles à tous */}
      <Route path="/" element={<AccueilPage />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Routes accessibles uniquement aux visiteurs non connectés */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Route>
      
      {/* Routes accessibles aux étudiants et administrateurs */}
      <Route element={<EtudiantRoute />}>
        <Route path="/chambres" element={<ChambrePage />} />
      </Route>
      
      {/* Routes accessibles uniquement aux administrateurs */}
      <Route element={<AdminRoute />}>
        <Route path="/etablissements" element={<EtablissementPage />} />
        <Route path="/etudiants" element={<EtudiantPage />} />
        <Route path="/reservations" element={<ReservationPage />} />
      </Route>
    </Routes>
  );
}

export default Approute;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import { requestPasswordReset } from '../utils/authService';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Vérification basique de l'email
    if (!email.includes('@')) {
      setError('Veuillez entrer une adresse email valide');
      setLoading(false);
      return;
    }
    
    try {
      await requestPasswordReset(email);
      setSuccess(true);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer plus tard.');
      console.error('Erreur lors de la demande de réinitialisation:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card fade-in">
        {success ? (
          <div className="success-message">
            <div className="checkmark-circle">
              <div className="checkmark"></div>
            </div>
            <h2>Email envoyé!</h2>
            <p>Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation.</p>
            <Link to="/login" className="back-to-login">Retour à la connexion</Link>
          </div>
        ) : (
          <>
            <div className="logo-container">
              <div className="logo">CampusOA</div>
              <p className="tagline">Gestion de cité universitaire</p>
            </div>
            
            <h1 className="login-title">Mot de passe oublié</h1>
            <p className="login-subtitle">Entrez votre email pour réinitialiser votre mot de passe</p>
            
            {error && (
              <div className="error-message">
                <i className="error-icon">⚠️</i>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">
                  <i className="input-icon">✉️</i> Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Entrez votre email"
                  className="form-input"
                />
                <div className="input-highlight"></div>
              </div>
              
              <button 
                type="submit" 
                className={`login-button ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  'Envoyer le lien de réinitialisation'
                )}
              </button>
            </form>
            
            <div className="login-footer">
              <p><Link to="/login" className="back-link">Retour à la connexion</Link></p>
            </div>
          </>
        )}
      </div>
      
      <div className="login-info-panel">
        <div className="info-content">
          <h2>Réinitialisation de mot de passe</h2>
          <p>Entrez l'adresse email associée à votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
          <ul className="feature-list">
            <li><i className="feature-icon">🔒</i> Sécurité renforcée</li>
            <li><i className="feature-icon">⚡</i> Processus rapide</li>
            <li><i className="feature-icon">📱</i> Accessible sur tous vos appareils</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;

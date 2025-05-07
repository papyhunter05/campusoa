import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';
import { resetPassword, verifyResetToken } from '../utils/authService';

function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier la validité du token au chargement
    const checkToken = async () => {
      try {
        await verifyResetToken(token);
        setTokenValid(true);
      } catch (err) {
        setTokenValid(false);
        setError('Ce lien de réinitialisation est invalide ou a expiré.');
      }
    };

    checkToken();
  }, [token]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Vérification des mots de passe
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      setLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }
    
    try {
      await resetPassword(token, password);
      setSuccess(true);
      
      // Redirection après quelques secondes
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer plus tard.');
      console.error('Erreur lors de la réinitialisation:', err);
    } finally {
      setLoading(false);
    }
  };

  // Affichage selon l'état de validation du token
  if (tokenValid === null) {
    return (
      <div className="login-container">
        <div className="login-card fade-in">
          <div className="loading-message">
            <div className="spinner"></div>
            <p>Vérification du lien de réinitialisation...</p>
          </div>
        </div>
      </div>
    );
  }

  if (tokenValid === false) {
    return (
      <div className="login-container">
        <div className="login-card fade-in">
          <div className="error-container">
            <i className="error-icon large">⚠️</i>
            <h2>Lien invalide</h2>
            <p>{error}</p>
            <Link to="/forgot-password" className="reset-link">Demander un nouveau lien</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card fade-in">
        {success ? (
          <div className="success-message">
            <div className="checkmark-circle">
              <div className="checkmark"></div>
            </div>
            <h2>Mot de passe réinitialisé!</h2>
            <p>Votre mot de passe a été modifié avec succès. Vous allez être redirigé vers la page de connexion...</p>
          </div>
        ) : (
          <>
            <div className="logo-container">
              <div className="logo">CampusOA</div>
              <p className="tagline">Gestion de cité universitaire</p>
            </div>
            
            <h1 className="login-title">Réinitialiser votre mot de passe</h1>
            <p className="login-subtitle">Créez un nouveau mot de passe sécurisé</p>
            
            {error && (
              <div className="error-message">
                <i className="error-icon">⚠️</i>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="password">
                  <i className="input-icon">🔒</i> Nouveau mot de passe
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Entrez votre nouveau mot de passe"
                    className="form-input"
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                <div className="input-highlight"></div>
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">
                  <i className="input-icon">🔒</i> Confirmer le mot de passe
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirmez votre nouveau mot de passe"
                    className="form-input"
                  />
                </div>
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
                  'Réinitialiser le mot de passe'
                )}
              </button>
            </form>
          </>
        )}
      </div>
      
      <div className="login-info-panel">
        <div className="info-content">
          <h2>Créez un mot de passe sécurisé</h2>
          <p>Pour votre sécurité, votre mot de passe doit :</p>
          <ul className="feature-list">
            <li><i className="feature-icon">📏</i> Contenir au moins 8 caractères</li>
            <li><i className="feature-icon">🔣</i> Inclure des caractères spéciaux</li>
            <li><i className="feature-icon">🔢</i> Contenir des chiffres</li>
            <li><i className="feature-icon">🔠</i> Mélanger majuscules et minuscules</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;

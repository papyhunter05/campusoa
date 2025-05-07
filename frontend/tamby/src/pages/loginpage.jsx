import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import { login } from '../utils/authService';
import { useNavigate, Link } from 'react-router-dom';


function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  // Animation au chargement de la page
  useEffect(() => {
    document.querySelector('.login-card').classList.add('fade-in');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulation d'une vérification de formulaire
    if (!credentials.email.includes('@')) {
      setError('Veuillez entrer une adresse email valide');
      setLoading(false);
      return;
    }
    
    try {
      // Simulation de délai pour montrer le loader
      setTimeout(async () => {
        try {
          await login(credentials.email, credentials.password);
          setLoginSuccess(true);
          
          // Redirection après animation de succès
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } catch (err) {
          setError('Identifiants incorrects. Veuillez réessayer.');
          console.error('Erreur de connexion:', err);
        } finally {
          setLoading(false);
        }
      }, 1000);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer plus tard.');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className={`login-card ${loginSuccess ? 'success' : ''}`}>
        {loginSuccess ? (
          <div className="success-message">
            <div className="checkmark-circle">
              <div className="checkmark"></div>
            </div>
            <h2>Connexion réussie!</h2>
            <p>Vous allez être redirigé...</p>
          </div>
        ) : (
          <>
            <div className="logo-container">
              <div className="logo">CampusOA</div>
              <p className="tagline">Gestion de cité universitaire</p>
            </div>
            
            <h1 className="login-title">Bienvenue</h1>
            <p className="login-subtitle">Connectez-vous à votre compte</p>
            
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
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  placeholder="Entrez votre email"
                  className="form-input"
                />
                <div className="input-highlight"></div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password">
                  <i className="input-icon">🔒</i> Mot de passe
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    placeholder="Entrez votre mot de passe"
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
              
              <div className="form-options">
                <div className="remember-me">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="remember">Se souvenir de moi</label>
                </div>
                  <Link to="/forgot-password" className="forgot-password">Mot de passe oublié?</Link>
              </div>
              
              <button 
                type="submit" 
                className={`login-button ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>
            
            <div className="social-login">
              <p>Ou connectez-vous avec</p>
              <div className="social-buttons">
                <button className="social-button google">
                  <span>G</span>
                </button>
                <button className="social-button facebook">
                  <span>f</span>
                </button>
                <button className="social-button twitter">
                  <span>t</span>
                </button>
              </div>
            </div>
            
            <div className="login-footer">
              <p>Vous n'avez pas de compte? <a href="#" className="register-link">S'inscrire</a></p>
            </div>
          </>
        )}
      </div>
      
      <div className="login-info-panel">
        <div className="info-content">
          <h2>Gestion de Cité Universitaire</h2>
          <p>Bienvenue sur la plateforme de gestion de la cité universitaire. Connectez-vous pour accéder à votre espace personnel.</p>
          <ul className="feature-list">
            <li><i className="feature-icon">🏠</i> Gestion des chambres</li>
            <li><i className="feature-icon">🎓</i> Suivi des étudiants</li>
            <li><i className="feature-icon">📝</i> Réservations simplifiées</li>
            <li><i className="feature-icon">🏢</i> Administration des établissements</li>
          </ul>
          <div className="testimonial">
            <p>"Cette plateforme a considérablement amélioré notre gestion quotidienne des résidences universitaires."</p>
            <div className="testimonial-author">- Directeur de la cité universitaire</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

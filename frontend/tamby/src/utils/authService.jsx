import axios from 'axios';

// URL de base de l'API
const API_URL = 'http://localhost:5000/api'; // Ajustez selon votre configuration

// Fonction pour se connecter
export const login = async (email, password) => {
  // Simulation temporaire de connexion avec différents rôles
  if (email === 'tamby105@gmail.com' && password === 'qwerty123') {
    // Simuler un compte admin
    const mockResponse = {
      token: 'fake-jwt-token-for-admin',
      user: {
        id: 1,
        email: 'tamby105@gmail.com',
        name: 'Tamby',
        role: 'admin'
      }
    };
    
    // Stocker dans localStorage
    localStorage.setItem('authToken', mockResponse.token);
    localStorage.setItem('user', JSON.stringify(mockResponse.user));
    
    return mockResponse;
  } else if (email === 'tamby106@gmail.com' && password === 'qwerty123') {
    // Simuler un compte étudiant
    const mockResponse = {
      token: 'fake-jwt-token-for-student',
      user: {
        id: 2,
        email: 'tamby106@gmail.com',
        name: 'Tamby',
        role: 'etudiant'
      }
    };
    
    localStorage.setItem('authToken', mockResponse.token);
    localStorage.setItem('user', JSON.stringify(mockResponse.user));
    
    return mockResponse;
  }
  
  // Si les identifiants ne correspondent pas à la simulation, essayer l'API réelle
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    }
    
    throw new Error('Authentification échouée');
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};

// Fonction pour se déconnecter
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

// Vérifier si l'utilisateur est connecté
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

// Récupérer l'utilisateur connecté
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Vérifier si l'utilisateur a un rôle spécifique
export const hasRole = (role) => {
  const user = getCurrentUser();
  return user && user.role === role;
};

// Vérifier si l'utilisateur est admin
export const isAdmin = () => {
  return hasRole('admin');
};

// Vérifier si l'utilisateur est étudiant
export const isEtudiant = () => {
  return hasRole('etudiant');
};

// Récupérer le token d'authentification
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Configurer les en-têtes d'autorisation pour les requêtes axios
export const setAuthHeader = () => {
  const token = getAuthToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Fonctions pour la réinitialisation de mot de passe (conservées de l'implémentation précédente)
export const requestPasswordReset = async (email) => {
  // Simulation
  if (email === 'tamby105@gmail.com' || email === 'etudiant@example.com') {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Un email de réinitialisation a été envoyé à ${email} (simulation)`);
        resolve({ success: true });
      }, 1500);
    });
  }
  
  // Version API réelle
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation:', error);
    throw error;
  }
};

export const verifyResetToken = async (token) => {
  // Simulation
  if (token === 'valid-token-for-testing') {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ valid: true });
      }, 1000);
    });
  }
  
  // Version API réelle
  try {
    const response = await axios.get(`${API_URL}/auth/reset-password/${token}/verify`);
    return response.data;
  } catch (error) {
    console.error('Token de réinitialisation invalide:', error);
    throw error;
  }
};

export const resetPassword = async (token, newPassword) => {
  // Simulation
  if (token === 'valid-token-for-testing') {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Mot de passe réinitialisé avec succès (simulation)');
        resolve({ success: true });
      }, 1500);
    });
  }
  
  // Version API réelle
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, {
      token,
      password: newPassword
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    throw error;
  }
};

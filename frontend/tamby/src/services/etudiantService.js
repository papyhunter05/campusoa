import axios from 'axios';

const API_URL = 'http://localhost:3001/api/etudiants';

const etudiantService = {
  // Récupérer tous les étudiants
  getAllEtudiants: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des étudiants:', error);
      throw error;
    }
  },

  // Récupérer un étudiant par son ID
  getEtudiantById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'étudiant ${id}:`, error);
      throw error;
    }
  },

  // Créer un nouvel étudiant
  createEtudiant: async (etudiantData) => {
    try {
      // Assurez-vous que n_etudiant n'est pas envoyé (car auto-incrémenté)
      const dataToSend = { ...etudiantData };
      if (dataToSend.n_etudiant !== undefined) {
        delete dataToSend.n_etudiant;
      }
      
      const response = await axios.post(API_URL, dataToSend);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'étudiant:', error);
      throw error;
    }
  },

  // Mettre à jour un étudiant
  updateEtudiant: async (id, etudiantData) => {
    try {
      // Assurez-vous que n_etudiant n'est pas envoyé dans le corps
      const dataToSend = { ...etudiantData };
      if (dataToSend.n_etudiant !== undefined) {
        delete dataToSend.n_etudiant;
      }
      
      const response = await axios.put(`${API_URL}/${id}`, dataToSend);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'étudiant ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un étudiant
  deleteEtudiant: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'étudiant ${id}:`, error);
      throw error;
    }
  }
};

export default etudiantService;

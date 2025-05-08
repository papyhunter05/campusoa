import axios from 'axios';

const API_URL = 'http://localhost:3001/api/chambres';

const chambreService = {
  // Récupérer toutes les chambres
  getAllChambres: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des chambres:', error);
      throw error;
    }
  },

  // Récupérer une chambre par son ID
  getChambreById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la chambre ${id}:`, error);
      throw error;
    }
  },

  // Récupérer les chambres disponibles
  getChambresDisponibles: async () => {
    try {
      const response = await axios.get(`${API_URL}/disponibles`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des chambres disponibles:', error);
      throw error;
    }
  },

  // Créer une nouvelle chambre
  createChambre: async (chambreData) => {
    try {
      const response = await axios.post(API_URL, chambreData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la chambre:', error);
      throw error;
    }
  },

  // Mettre à jour une chambre
  updateChambre: async (id, chambreData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, chambreData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la chambre ${id}:`, error);
      throw error;
    }
  },

  // Supprimer une chambre
  deleteChambre: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la chambre ${id}:`, error);
      throw error;
    }
  }
};

export default chambreService;

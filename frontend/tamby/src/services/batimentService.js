import axios from 'axios';

const API_URL = 'http://localhost:3001/api/batiments';

const batimentService = {
  // Récupérer tous les bâtiments
  getAllBatiments: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des bâtiments:', error);
      throw error;
    }
  },

  // Récupérer un bâtiment par son ID
  getBatimentById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du bâtiment ${id}:`, error);
      throw error;
    }
  },

  // Créer un nouveau bâtiment
  createBatiment: async (batimentData) => {
    try {
      const response = await axios.post(API_URL, batimentData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du bâtiment:', error);
      throw error;
    }
  },

  // Mettre à jour un bâtiment
  updateBatiment: async (id, batimentData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, batimentData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du bâtiment ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un bâtiment
  deleteBatiment: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du bâtiment ${id}:`, error);
      throw error;
    }
  }
};

export default batimentService;

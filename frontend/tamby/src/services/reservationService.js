import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Ajustez selon votre configuration

// Service pour les réservations
const reservationService = {
  // Récupérer toutes les réservations
  getAllReservations: async () => {
    try {
      const response = await axios.get(`${API_URL}/reservations`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
      throw error;
    }
  },

  // Récupérer une réservation par son ID
  getReservationById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/reservations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la réservation ${id}:`, error);
      throw error;
    }
  },

  // Créer une nouvelle réservation
  createReservation: async (reservationData) => {
    try {
      const response = await axios.post(`${API_URL}/reservations`, reservationData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error);
      throw error;
    }
  },

  // Mettre à jour une réservation existante
  updateReservation: async (id, reservationData) => {
    try {
      const response = await axios.put(`${API_URL}/reservations/${id}`, reservationData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la réservation ${id}:`, error);
      throw error;
    }
  },

  // Supprimer une réservation
  deleteReservation: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/reservations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la réservation ${id}:`, error);
      throw error;
    }
  }
};

export default reservationService;

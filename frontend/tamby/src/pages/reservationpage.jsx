import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaFilter, FaSearch, FaEye, FaEdit, FaTrash, FaBed, FaUserGraduate } from 'react-icons/fa';

// Composants
import Tableau from '../components/communs/Tableau';
import Recherche from '../components/communs/Recherche';
import ModalDetail from '../components/communs/ModalDetail';
import ModalFormulaire from '../components/communs/ModalFormulaire';
import Chargement from '../components/communs/Chargement';
import { BoutonAjouter, BoutonVoir, BoutonModifier, BoutonSupprimer } from '../components/communs/Boutons';
import FiltresAvances from '../components/communs/FiltresAvances';
import PageHeader from '../components/communs/PageHeader';
import DetailReservation from '../components/reservations/DetailReservation';
import FormulaireReservation from '../components/reservations/FormulaireReservation';
import StatistiquesReservation from '../components/reservations/StatistiquesReservation';

// Hooks et services
import useDonnees from '../hooks/useDonnees';
import useTri from '../hooks/useTri';
import reservationService from '../services/reservationService';
import etudiantService from '../services/etudiantService';
import chambreService from '../services/chambreService';
import batimentService from '../services/batimentService';

// Styles
import { colors } from '../styles/theme';

function ReservationPage() {
  // Utilisation des hooks personnalisés avec les services API
  const { 
    donnees: reservations, 
    setDonnees: setReservations, 
    loading, 
    error, 
    setError,
    ajouterElement,
    modifierElement,
    supprimerElement
  } = useDonnees(
    [], 
    reservationService.getAllReservations,
    reservationService.createReservation,
    reservationService.updateReservation,
    reservationService.deleteReservation
  );
  
  // États pour les données associées
  const [etudiants, setEtudiants] = useState([]);
  const [chambres, setChambres] = useState([]);
  const [batiments, setBatiments] = useState([]);
  const [loadingAssociatedData, setLoadingAssociatedData] = useState(true);
  
  // Charger les données associées au chargement de la page
  useEffect(() => {
    const fetchAssociatedData = async () => {
      try {
        setLoadingAssociatedData(true);
        
        // Utiliser les services API réels
        const etudiantsData = await etudiantService.getAllEtudiants();
        const chambresData = await chambreService.getAllChambres();
        const batimentsData = await batimentService.getAllBatiments();
        
        setEtudiants(etudiantsData);
        setChambres(chambresData);
        setBatiments(batimentsData);
      } catch (error) {
        console.error("Erreur lors du chargement des données associées:", error);
        setError("Erreur lors du chargement des données associées");
      } finally {
        setLoadingAssociatedData(false);
      }
    };
    
    fetchAssociatedData();
  }, [setError]);
  
  const { trierDonnees } = useTri(reservations, setReservations);
  
  // États locaux
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' ou 'edit'
  const [formData, setFormData] = useState({
    id_res: '',
    date_res: new Date().toISOString().split('T')[0],
    n_chambre: '',
    n_etudiant: ''
  });
  const [filterCriteria, setFilterCriteria] = useState({
    dateDebut: '',
    dateFin: '',
    n_bat: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Fonction de filtrage pour les réservations
  const filtrerReservations = (reservation) => {
    // Filtrage par date
    const dateRes = new Date(reservation.date_res);
    const matchesDateDebut = !filterCriteria.dateDebut || 
      dateRes >= new Date(filterCriteria.dateDebut);
    const matchesDateFin = !filterCriteria.dateFin || 
      dateRes <= new Date(filterCriteria.dateFin);
    
    // Filtrage par bâtiment
    const chambre = chambres.find(c => c.n_chambre === reservation.n_chambre);
    const matchesBatiment = !filterCriteria.n_bat || 
      (chambre && chambre.n_bat.toString() === filterCriteria.n_bat);
    
    // Recherche par numéro de chambre, numéro d'étudiant ou nom d'étudiant
    const matchesSearch = !searchTerm || 
      reservation.n_chambre?.toString().includes(searchTerm) ||
      reservation.n_etudiant?.toString().includes(searchTerm) ||
      (reservation.nom && reservation.prenom && 
        `${reservation.nom} ${reservation.prenom}`.toLowerCase().includes(searchTerm.toLowerCase()));
  
    return matchesDateDebut && matchesDateFin && matchesBatiment && matchesSearch;
  };

  // Filtrer les réservations
  const reservationsFiltrees = reservations.filter(filtrerReservations);

  // Gestionnaires d'événements
  const handleView = (reservation) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const handleAdd = () => {
    setFormData({
      id_res: '',
      date_res: new Date().toISOString().split('T')[0],
      n_chambre: '',
      n_etudiant: ''
    });
    setFormMode('add');
    setShowFormModal(true);
  };

  const handleEdit = (reservation) => {
    setFormData({
      id_res: reservation.id_res,
      date_res: reservation.date_res,
      n_chambre: reservation.n_chambre,
      n_etudiant: reservation.n_etudiant
    });
    setFormMode('edit');
    setShowFormModal(true);
  };

  const handleDelete = async (id_res) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation?')) {
      try {
        await supprimerElement(id_res, 'id_res');
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error('Erreur:', err);
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'id_res' || name === 'n_chambre' || name === 'n_etudiant' 
        ? parseInt(value, 10) 
        : value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'add') {
        // Pour l'ajout, on ne passe pas l'id_res car il est auto-incrémenté
        const dataToSend = { ...formData };
        if (dataToSend.id_res) delete dataToSend.id_res;
        
        await ajouterElement(dataToSend);
      } else {
        await modifierElement(formData.id_res, 'id_res', formData);
      }
      setShowFormModal(false);
    } catch (err) {
      setError(`Erreur lors de l'${formMode === 'add' ? 'ajout' : 'édition'}`);
      console.error('Erreur:', err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({
      ...filterCriteria,
      [name]: value
    });
  };

  // Fonction pour obtenir le nom de l'étudiant à partir de son ID
  const getEtudiantName = (n_etudiant) => {
    const etudiant = etudiants.find(e => e.n_etudiant === n_etudiant);
    return etudiant ? `${etudiant.nom} ${etudiant.prenom}` : `Étudiant #${n_etudiant}`;
  };

  // Fonction pour obtenir le nom du bâtiment à partir de l'ID de chambre
  const getBatimentFromChambre = (n_chambre) => {
    const chambre = chambres.find(c => c.n_chambre === n_chambre);
    if (!chambre) return "Inconnu";
    
    const batiment = batiments.find(b => b.n_bat === chambre.n_bat);
    return batiment ? batiment.nom_bat : `Bâtiment ${chambre.n_bat}`;
  };

  // Formater la date pour l'affichage
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Définition des colonnes pour le tableau
  const colonnesReservation = [
    { id: 'id_res', label: 'ID', triable: true },
    { 
      id: 'date_res', 
      label: 'Date de réservation', 
      triable: true,
      rendu: (reservation) => formatDate(reservation.date_res)
    },
    { 
      id: 'n_chambre', 
      label: 'Chambre', 
      triable: true,
      rendu: (reservation) => (
        <div>
          <div>Chambre #{reservation.n_chambre}</div>
          <div className="text-xs text-gray-500">
            {reservation.nom_bat || getBatimentFromChambre(reservation.n_chambre)}
          </div>
        </div>
      )
    },
    { 
      id: 'n_etudiant', 
      label: 'Étudiant', 
      triable: true,
      rendu: (reservation) => (
        reservation.nom && reservation.prenom 
          ? `${reservation.nom} ${reservation.prenom}`
          : getEtudiantName(reservation.n_etudiant)
      )
    }
  ];

  // Afficher un chargement si les données associées sont en cours de chargement
  if (loading || loadingAssociatedData) {
    return <Chargement message="Chargement des données..." />;
  }

  return (
    <div className="p-4">
      <PageHeader 
        titre="Gestion des Réservations"
        sousTitre={`${reservationsFiltrees.length} réservation(s) trouvée(s)`}
        icone={<FaCalendarAlt style={{ color: colors.primaryColor }} />}
        actionPrincipale={
          <BoutonAjouter 
            onClick={handleAdd} 
            texte="Ajouter une réservation" 
          />
        }
        actionSecondaire={
          <Recherche 
            valeur={searchTerm}
            onChange={handleSearchChange}
            placeholder="Rechercher une réservation..."
            width="250px"
          />
        }
      />

      {/* Statistiques */}
      <StatistiquesReservation 
        reservations={reservations} 
        etudiants={etudiants}
        chambres={chambres}
        batiments={batiments}
      />

      {/* Filtres avancés */}
      <FiltresAvances titre="Filtres de recherche" collapsible={true} defaultOpen={false}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
              <FaCalendarAlt className="inline mr-2" style={{ color: colors.secondaryColor }} />
              Date de début
            </label>
            <input
              type="date"
              name="dateDebut"
              value={filterCriteria.dateDebut}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
              style={{ 
                borderColor: colors.borderColor,
                backgroundColor: colors.inputBg,
                color: colors.textColor
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
              <FaCalendarAlt className="inline mr-2" style={{ color: colors.secondaryColor }} />
              Date de fin
            </label>
            <input
              type="date"
              name="dateFin"
              value={filterCriteria.dateFin}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
              style={{ 
                borderColor: colors.borderColor,
                backgroundColor: colors.inputBg,
                color: colors.textColor
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
              <FaBed className="inline mr-2" style={{ color: colors.secondaryColor }} />
              Bâtiment
            </label>
            <select
              name="n_bat"
              value={filterCriteria.n_bat}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
              style={{ 
                borderColor: colors.borderColor,
                backgroundColor: colors.inputBg,
                color: colors.textColor
              }}
            >
              <option value="">Tous les bâtiments</option>
              {batiments.map((bat) => (
                <option key={bat.n_bat} value={bat.n_bat.toString()}>
                  {bat.nom_bat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </FiltresAvances>

      {/* Tableau des réservations */}
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <strong className="font-bold">Erreur!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      ) : (
        <Tableau 
          colonnes={colonnesReservation} 
          donnees={reservationsFiltrees} 
          onTri={trierDonnees}
          messageVide="Aucune réservation trouvée"
          actions={(reservation) => (
            <>
              <BoutonVoir onClick={() => handleView(reservation)} />
              {/*<BoutonModifier onClick={() => handleEdit(reservation)} />*/}
              <BoutonSupprimer onClick={() => handleDelete(reservation.id_res)} />
            </>
          )}
        />
      )}

      {/* Modal de détails */}
      <ModalDetail 
        titre={`Détails de la réservation #${selectedReservation?.id_res || ''}`}
        contenu={selectedReservation && (
          <DetailReservation 
            reservation={selectedReservation} 
            getEtudiantName={getEtudiantName}
            getBatimentFromChambre={getBatimentFromChambre}
            formatDate={formatDate}
          />
        )}
        visible={showModal}
        onFermer={() => setShowModal(false)}
      />

      {/* Modal de formulaire (ajout/édition) */}
      <ModalFormulaire 
        titre={formMode === 'add' ? 'Ajouter une réservation' : 'Modifier la réservation'}
        visible={showFormModal}
        onFermer={() => setShowFormModal(false)}
        formulaire={
          <FormulaireReservation 
            formData={formData}
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            formMode={formMode}
            etudiants={etudiants}
            chambres={chambres}
            getEtudiantName={getEtudiantName}
          />
        }
      />
    </div>
  );
}

export default ReservationPage;

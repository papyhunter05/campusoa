import React, { useState } from 'react';
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

// Hooks
import useDonnees from '../hooks/useDonnees';
import useTri from '../hooks/useTri';

// Styles
import { colors } from '../styles/theme';

function ReservationPage() {
  // Données simulées pour les réservations
  const mockReservations = [
    { id_res: 1, date_res: "2023-05-10", n_chambre: "A101", n_etudiant: "ETU001" },
    { id_res: 2, date_res: "2023-05-15", n_chambre: "B201", n_etudiant: "ETU002" },
    { id_res: 3, date_res: "2023-06-01", n_chambre: "A102", n_etudiant: "ETU006" },
    { id_res: 4, date_res: "2023-06-05", n_chambre: "C301", n_etudiant: "ETU004" },
    { id_res: 5, date_res: "2023-06-10", n_chambre: "B202", n_etudiant: "ETU008" },
    { id_res: 6, date_res: "2023-06-15", n_chambre: "C302", n_etudiant: "ETU010" },
    { id_res: 7, date_res: "2023-07-01", n_chambre: "D101", n_etudiant: "ETU003" },
    { id_res: 8, date_res: "2023-07-05", n_chambre: "D102", n_etudiant: "ETU005" },
    { id_res: 9, date_res: "2023-07-10", n_chambre: "E201", n_etudiant: "ETU007" },
    { id_res: 10, date_res: "2023-07-15", n_chambre: "E202", n_etudiant: "ETU009" },
  ];

  // Données simulées pour les étudiants
  const mockEtudiants = [
    { n_etudiant: "ETU001", nom: "Dupont", prenom: "Jean", univ: "Université Paris 1", niveau: "L3", contact: "0612345678", n_chambre: "A101" },
    { n_etudiant: "ETU002", nom: "Martin", prenom: "Sophie", univ: "Université Lyon 2", niveau: "M1", contact: "0623456789", n_chambre: "B201" },
    { n_etudiant: "ETU003", nom: "Bernard", prenom: "Thomas", univ: "Université Paris 1", niveau: "L2", contact: "0634567890", n_chambre: "D101" },
    { n_etudiant: "ETU004", nom: "Petit", prenom: "Emma", univ: "Université Bordeaux", niveau: "M2", contact: "0645678901", n_chambre: "C301" },
    { n_etudiant: "ETU005", nom: "Robert", prenom: "Lucas", univ: "Université Lyon 2", niveau: "L1", contact: "0656789012", n_chambre: "D102" },
    { n_etudiant: "ETU006", nom: "Richard", prenom: "Chloé", univ: "Université Paris 1", niveau: "L3", contact: "0667890123", n_chambre: "A102" },
    { n_etudiant: "ETU007", nom: "Moreau", prenom: "Hugo", univ: "Université Bordeaux", niveau: "D1", contact: "0678901234", n_chambre: "E201" },
    { n_etudiant: "ETU008", nom: "Simon", prenom: "Léa", univ: "Université Lyon 2", niveau: "M1", contact: "0689012345", n_chambre: "B202" },
    { n_etudiant: "ETU009", nom: "Laurent", prenom: "Nathan", univ: "Université Paris 1", niveau: "L2", contact: "0690123456", n_chambre: "E202" },
    { n_etudiant: "ETU010", nom: "Michel", prenom: "Camille", univ: "Université Bordeaux", niveau: "M2", contact: "0601234567", n_chambre: "C302" },
  ];

  // Données simulées pour les chambres
  const mockChambres = [
    { n_chambre: "A101", capacite_max: 2, etat_chambre: "Occupée", n_bat: 1 },
    { n_chambre: "A102", capacite_max: 1, etat_chambre: "Occupée", n_bat: 1 },
    { n_chambre: "B201", capacite_max: 3, etat_chambre: "Occupée", n_bat: 2 },
    { n_chambre: "B202", capacite_max: 1, etat_chambre: "Occupée", n_bat: 2 },
    { n_chambre: "C301", capacite_max: 2, etat_chambre: "Occupée", n_bat: 3 },
    { n_chambre: "C302", capacite_max: 2, etat_chambre: "Occupée", n_bat: 3 },
    { n_chambre: "D101", capacite_max: 4, etat_chambre: "Occupée", n_bat: 4 },
    { n_chambre: "D102", capacite_max: 1, etat_chambre: "Occupée", n_bat: 4 },
    { n_chambre: "E201", capacite_max: 2, etat_chambre: "Occupée", n_bat: 5 },
    { n_chambre: "E202", capacite_max: 2, etat_chambre: "Occupée", n_bat: 5 },
  ];

  // Données simulées pour les bâtiments
  const mockBatiments = [
    { n_bat: 1, nom_bat: "Résidence Alpha" },
    { n_bat: 2, nom_bat: "Résidence Beta" },
    { n_bat: 3, nom_bat: "Résidence Gamma" },
    { n_bat: 4, nom_bat: "Résidence Delta" },
    { n_bat: 5, nom_bat: "Résidence Epsilon" },
  ];
  
  // Utilisation des hooks personnalisés
  const { 
    donnees: reservations, 
    setDonnees: setReservations, 
    loading, 
    error, 
    setError,
    ajouterElement,
    modifierElement,
    supprimerElement
  } = useDonnees(mockReservations);
  
  const { 
    donnees: etudiants 
  } = useDonnees(mockEtudiants);
  
  const { 
    donnees: chambres 
  } = useDonnees(mockChambres);
  
  const { 
    donnees: batiments 
  } = useDonnees(mockBatiments);
  
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
    
    // Recherche par numéro de chambre ou numéro d'étudiant
    const matchesSearch = !searchTerm || 
      reservation.n_chambre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.n_etudiant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getEtudiantName(reservation.n_etudiant).toLowerCase().includes(searchTerm.toLowerCase());
  
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
    // Générer un nouvel ID (dans une application réelle, cela serait géré par le backend)
    const newId = Math.max(...reservations.map(r => r.id_res), 0) + 1;
    
    setFormData({
      id_res: newId,
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
        supprimerElement(id_res, 'id_res');
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
      [name]: name === 'id_res' ? parseInt(value, 10) : value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'add') {
        ajouterElement({
          ...formData,
          id_res: parseInt(formData.id_res, 10)
        });
      } else {
        modifierElement(formData.id_res, 'id_res', {
          ...formData,
          id_res: parseInt(formData.id_res, 10)
        });
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
    return etudiant ? `${etudiant.nom} ${etudiant.prenom}` : n_etudiant;
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
          <div>{reservation.n_chambre}</div>
          <div className="text-xs text-gray-500">{getBatimentFromChambre(reservation.n_chambre)}</div>
        </div>
      )
    },
    { 
      id: 'n_etudiant', 
      label: 'Étudiant', 
      triable: true,
      rendu: (reservation) => getEtudiantName(reservation.n_etudiant)
    }
  ];

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
      {loading ? (
        <Chargement message="Chargement des réservations..." />
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
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
              <BoutonModifier onClick={() => handleEdit(reservation)} />
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

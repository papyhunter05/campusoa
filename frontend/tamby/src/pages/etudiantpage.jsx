import React, { useState } from 'react';
import { FaUser, FaUserGraduate, FaFilter, FaSearch, FaGraduationCap, FaBed, FaUniversity, FaPhone } from 'react-icons/fa';

// Composants
import Tableau from '../components/communs/Tableau';
import Recherche from '../components/communs/Recherche';
import ModalDetail from '../components/communs/ModalDetail';
import ModalFormulaire from '../components/communs/ModalFormulaire';
import Chargement from '../components/communs/Chargement';
import { BoutonAjouter, BoutonVoir, BoutonModifier, BoutonSupprimer } from '../components/communs/Boutons';
import FiltresAvances from '../components/communs/FiltresAvances';
import PageHeader from '../components/communs/PageHeader';
import DetailEtudiant from '../components/etudiants/DetailEtudiant';
import FormulaireEtudiant from '../components/etudiants/FormulaireEtudiant';
import StatistiquesEtudiant from '../components/etudiants/StatistiquesEtudiant';

// Hooks
import useDonnees from '../hooks/useDonnees';
import useTri from '../hooks/useTri';

// Styles
import { colors } from '../styles/theme';

function EtudiantPage() {
  // Données simulées pour les étudiants selon la structure correcte de la table
  const mockEtudiants = [
    { n_etudiant: "ETU001", nom: "Dupont", prenom: "Jean", univ: "Université Paris 1", niveau: "L3", contact: "0612345678", n_chambre: "A101" },
    { n_etudiant: "ETU002", nom: "Martin", prenom: "Sophie", univ: "Université Lyon 2", niveau: "M1", contact: "0623456789", n_chambre: "B201" },
    { n_etudiant: "ETU003", nom: "Bernard", prenom: "Thomas", univ: "Université Paris 1", niveau: "L2", contact: "0634567890", n_chambre: null },
    { n_etudiant: "ETU004", nom: "Petit", prenom: "Emma", univ: "Université Bordeaux", niveau: "M2", contact: "0645678901", n_chambre: "C301" },
    { n_etudiant: "ETU005", nom: "Robert", prenom: "Lucas", univ: "Université Lyon 2", niveau: "L1", contact: "0656789012", n_chambre: null },
    { n_etudiant: "ETU006", nom: "Richard", prenom: "Chloé", univ: "Université Paris 1", niveau: "L3", contact: "0667890123", n_chambre: "A102" },
    { n_etudiant: "ETU007", nom: "Moreau", prenom: "Hugo", univ: "Université Bordeaux", niveau: "D1", contact: "0678901234", n_chambre: null },
    { n_etudiant: "ETU008", nom: "Simon", prenom: "Léa", univ: "Université Lyon 2", niveau: "M1", contact: "0689012345", n_chambre: "B202" },
    { n_etudiant: "ETU009", nom: "Laurent", prenom: "Nathan", univ: "Université Paris 1", niveau: "L2", contact: "0690123456", n_chambre: null },
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
    { n_chambre: "D101", capacite_max: 4, etat_chambre: "Disponible", n_bat: 4 },
    { n_chambre: "D102", capacite_max: 1, etat_chambre: "Disponible", n_bat: 4 },
  ];
  
  // Utilisation des hooks personnalisés
  const { 
    donnees: etudiants, 
    setDonnees: setEtudiants, 
    loading, 
    error, 
    setError,
    ajouterElement,
    modifierElement,
    supprimerElement
  } = useDonnees(mockEtudiants);
  
  const { 
    donnees: chambres 
  } = useDonnees(mockChambres);
  
  const { trierDonnees } = useTri(etudiants, setEtudiants);
  
  // États locaux
  const [selectedEtudiant, setSelectedEtudiant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' ou 'edit'
  const [formData, setFormData] = useState({
    n_etudiant: '',
    nom: '',
    prenom: '',
    univ: '',
    niveau: '',
    contact: '',
    n_chambre: ''
  });
  const [filterCriteria, setFilterCriteria] = useState({
    univ: '',
    niveau: '',
    avecChambre: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Fonction de filtrage pour les étudiants
  const filtrerEtudiants = (etudiant) => {
    // Filtrage par université
    const matchesUniv = filterCriteria.univ === '' || 
      etudiant.univ === filterCriteria.univ;
    
    // Filtrage par niveau
    const matchesNiveau = filterCriteria.niveau === '' || 
      etudiant.niveau === filterCriteria.niveau;
    
    // Filtrage par statut de chambre
    const matchesChambre = filterCriteria.avecChambre === '' || 
      (filterCriteria.avecChambre === 'avec' && etudiant.n_chambre) ||
      (filterCriteria.avecChambre === 'sans' && !etudiant.n_chambre);
    
    // Recherche par nom, prénom, numéro étudiant ou contact
    const matchesSearch = searchTerm === '' || 
      etudiant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      etudiant.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      etudiant.n_etudiant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (etudiant.contact && etudiant.contact.includes(searchTerm));
  
    return matchesUniv && matchesNiveau && matchesChambre && matchesSearch;
  };

  // Filtrer les étudiants
  const etudiantsFiltres = etudiants.filter(filtrerEtudiants);

  // Gestionnaires d'événements
  const handleView = (etudiant) => {
    setSelectedEtudiant(etudiant);
    setShowModal(true);
  };

  const handleAdd = () => {
    setFormData({
      n_etudiant: '',
      nom: '',
      prenom: '',
      univ: '',
      niveau: '',
      contact: '',
      n_chambre: ''
    });
    setFormMode('add');
    setShowFormModal(true);
  };

  const handleEdit = (etudiant) => {
    setFormData({
      n_etudiant: etudiant.n_etudiant,
      nom: etudiant.nom,
      prenom: etudiant.prenom,
      univ: etudiant.univ,
      niveau: etudiant.niveau,
      contact: etudiant.contact || '',
      n_chambre: etudiant.n_chambre || ''
    });
    setFormMode('edit');
    setShowFormModal(true);
  };

  const handleDelete = async (n_etudiant) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant?')) {
      try {
        supprimerElement(n_etudiant, 'n_etudiant');
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
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'add') {
        ajouterElement(formData);
      } else {
        modifierElement(formData.n_etudiant, 'n_etudiant', formData);
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

  // Fonction pour obtenir le nom de la chambre
  const getChambreName = (n_chambre) => {
    const chambre = chambres.find(c => c.n_chambre === n_chambre);
    return chambre ? `${n_chambre} (${chambre.capacite_max} pers.)` : n_chambre;
  };

  // Extraire les valeurs uniques pour les filtres
  const universites = [...new Set(etudiants.map(e => e.univ))].sort();
  const niveaux = [...new Set(etudiants.map(e => e.niveau))].sort();

  // Définition des colonnes pour le tableau
  const colonnesEtudiant = [
    { id: 'n_etudiant', label: 'N° Étudiant', triable: true },
    { 
      id: 'nom_complet', 
      label: 'Nom complet', 
      triable: false, 
      rendu: (etudiant) => `${etudiant.nom} ${etudiant.prenom}` 
    },
    { id: 'univ', label: 'Université', triable: true },
    { id: 'niveau', label: 'Niveau', triable: true },
    { 
      id: 'n_chambre', 
      label: 'Chambre', 
      triable: true, 
      rendu: (etudiant) => etudiant.n_chambre ? getChambreName(etudiant.n_chambre) : (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
          Non attribuée
        </span>
      )
    }
  ];

  return (
    <div className="p-4">
      <PageHeader 
        titre="Gestion des Étudiants"
        sousTitre={`${etudiantsFiltres.length} étudiant(s) trouvé(s)`}
        icone={<FaUserGraduate style={{ color: colors.primaryColor }} />}
        actionPrincipale={
          <BoutonAjouter 
            onClick={handleAdd} 
            texte="Ajouter un étudiant" 
          />
        }
        actionSecondaire={
          <Recherche 
            valeur={searchTerm}
            onChange={handleSearchChange}
            placeholder="Rechercher un étudiant..."
            width="250px"
          />
        }
      />

      {/* Statistiques */}
      <StatistiquesEtudiant 
        etudiants={etudiants} 
        universites={universites}
        chambres={chambres}
      />

      {/* Filtres avancés */}
      <FiltresAvances titre="Filtres de recherche" collapsible={true} defaultOpen={false}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
              <FaUniversity className="inline mr-2" style={{ color: colors.secondaryColor }} />
              Université
            </label>
            <select
              name="univ"
              value={filterCriteria.univ}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
              style={{ 
                borderColor: colors.borderColor,
                backgroundColor: colors.inputBg,
                color: colors.textColor
              }}
            >
              <option value="">Toutes les universités</option>
              {universites.map((univ, index) => (
                <option key={index} value={univ}>{univ}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
              <FaGraduationCap className="inline mr-2" style={{ color: colors.secondaryColor }} />
              Niveau d'étude
            </label>
            <select
              name="niveau"
              value={filterCriteria.niveau}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
              style={{ 
                borderColor: colors.borderColor,
                backgroundColor: colors.inputBg,
                color: colors.textColor
              }}
            >
              <option value="">Tous les niveaux</option>
              {niveaux.map((niveau, index) => (
                <option key={index} value={niveau}>{niveau}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
              <FaBed className="inline mr-2" style={{ color: colors.secondaryColor }} />
              Statut de chambre
            </label>
            <select
              name="avecChambre"
              value={filterCriteria.avecChambre}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
              style={{ 
                borderColor: colors.borderColor,
                backgroundColor: colors.inputBg,
                color: colors.textColor
              }}
            >
              <option value="">Tous les étudiants</option>
              <option value="avec">Avec chambre</option>
              <option value="sans">Sans chambre</option>
            </select>
          </div>
        </div>
      </FiltresAvances>

      {/* Tableau des étudiants */}
      {loading ? (
        <Chargement message="Chargement des étudiants..." />
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erreur!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      ) : (
        <Tableau 
          colonnes={colonnesEtudiant} 
          donnees={etudiantsFiltres} 
          onTri={trierDonnees}
          messageVide="Aucun étudiant trouvé"
          actions={(etudiant) => (
            <>
              <BoutonVoir onClick={() => handleView(etudiant)} />
              <BoutonModifier onClick={() => handleEdit(etudiant)} />
              <BoutonSupprimer onClick={() => handleDelete(etudiant.n_etudiant)} />
            </>
          )}
        />
      )}

      {/* Modal de détails */}
      <ModalDetail 
        titre={`Détails de l'étudiant ${selectedEtudiant ? `${selectedEtudiant.prenom} ${selectedEtudiant.nom}` : ''}`}
        contenu={selectedEtudiant && (
          <DetailEtudiant 
            etudiant={selectedEtudiant} 
            getChambreName={getChambreName}
          />
        )}
        visible={showModal}
        onFermer={() => setShowModal(false)}
      />

      {/* Modal de formulaire (ajout/édition) */}
      <ModalFormulaire 
        titre={formMode === 'add' ? 'Ajouter un étudiant' : 'Modifier l\'étudiant'}
        visible={showFormModal}
        onFermer={() => setShowFormModal(false)}
        formulaire={
          <FormulaireEtudiant 
            formData={formData}
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            formMode={formMode}
            chambres={chambres}
          />
        }
      />
    </div>
  );
}

export default EtudiantPage;

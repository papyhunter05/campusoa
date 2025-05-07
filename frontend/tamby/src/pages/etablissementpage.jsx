import React, { useState } from 'react';
import { FaBuilding, FaBed, FaFilter, FaSearch } from 'react-icons/fa';

// Composants
import Tableau from '../components/communs/Tableau';
import Recherche from '../components/communs/Recherche';
import ModalDetail from '../components/communs/ModalDetail';
import ModalFormulaire from '../components/communs/ModalFormulaire';
import Chargement from '../components/communs/Chargement';
import { BoutonAjouter, BoutonVoir, BoutonModifier, BoutonSupprimer } from '../components/communs/Boutons';
import FiltresAvances from '../components/communs/FiltresAvances';
import PageHeader from '../components/communs/PageHeader';
import DetailEtablissement from '../components/etablissements/DetailEtablissement';
import FormulaireEtablissement from '../components/etablissements/FormulaireEtablissement';
import StatistiquesEtablissement from '../components/etablissements/StatistiquesEtablissement';

// Hooks
import useDonnees from '../hooks/useDonnees';
import useTri from '../hooks/useTri';

// Styles
import { colors } from '../styles/theme';

function EtablissementPage() {
  // Données simulées pour les établissements
  const mockEtablissements = [
    { n_bat: 1, nom_bat: "Résidence Alpha", nb_chambre: 30, etat_bat: "Bon", description: "Bâtiment moderne avec vue sur le parc universitaire." },
    { n_bat: 2, nom_bat: "Résidence Beta", nb_chambre: 25, etat_bat: "Excellent", description: "Récemment rénové avec des équipements modernes." },
    { n_bat: 3, nom_bat: "Résidence Gamma", nb_chambre: 40, etat_bat: "Moyen", description: "Bâtiment ancien mais bien entretenu." },
    { n_bat: 4, nom_bat: "Résidence Delta", nb_chambre: 35, etat_bat: "Bon", description: "Situé près de la bibliothèque universitaire." },
    { n_bat: 5, nom_bat: "Résidence Epsilon", nb_chambre: 20, etat_bat: "En rénovation", description: "Fermé pour rénovation jusqu'à la prochaine rentrée." },
    { n_bat: 6, nom_bat: "Résidence Zeta", nb_chambre: 15, etat_bat: "Mauvais", description: "Prévu pour rénovation complète l'année prochaine." },
    { n_bat: 7, nom_bat: "Résidence Eta", nb_chambre: 45, etat_bat: "Bon", description: "Le plus grand bâtiment du campus." },
  ];
  
  const etatsEtablissement = ["Excellent", "Bon", "Moyen", "Mauvais", "En rénovation"];
  
  // Utilisation des hooks personnalisés
  const { 
    donnees: etablissements, 
    setDonnees: setEtablissements, 
    loading, 
    error, 
    setError,
    ajouterElement,
    modifierElement,
    supprimerElement
  } = useDonnees(mockEtablissements);
  
  const { trierDonnees } = useTri(etablissements, setEtablissements);
  
  // États locaux
  const [selectedEtablissement, setSelectedEtablissement] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' ou 'edit'
  const [formData, setFormData] = useState({
    n_bat: '',
    nom_bat: '',
    nb_chambre: 1,
    etat_bat: 'Bon',
    description: ''
  });
  const [filterCriteria, setFilterCriteria] = useState({
    etat_bat: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCapacite, setSearchCapacite] = useState('');

  // Fonction de filtrage pour les établissements
  const filtrerEtablissements = (etablissement) => {
    // Filtrage par état
    const matchesEtat = filterCriteria.etat_bat === '' || 
      etablissement.etat_bat === filterCriteria.etat_bat;
    
    // Recherche par nom
    const matchesSearch = searchTerm === '' || 
      etablissement.nom_bat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      etablissement.n_bat.toString().includes(searchTerm);
    
    // Recherche par capacité
    const matchesCapacite = searchCapacite === '' || 
      etablissement.nb_chambre >= parseInt(searchCapacite, 10);
  
    return matchesEtat && matchesSearch && matchesCapacite;
  };

  // Filtrer les établissements
  const etablissementsFiltres = etablissements.filter(filtrerEtablissements);

  // Gestionnaires d'événements
  const handleView = (etablissement) => {
    setSelectedEtablissement(etablissement);
    setShowModal(true);
  };

  const handleAdd = () => {
    setFormData({
      n_bat: '',
      nom_bat: '',
      nb_chambre: 1,
      etat_bat: 'Bon',
      description: ''
    });
    setFormMode('add');
    setShowFormModal(true);
  };

  const handleEdit = (etablissement) => {
    setFormData({
      n_bat: etablissement.n_bat,
      nom_bat: etablissement.nom_bat,
      nb_chambre: etablissement.nb_chambre,
      etat_bat: etablissement.etat_bat,
      description: etablissement.description || ''
    });
    setFormMode('edit');
    setShowFormModal(true);
  };

  const handleDelete = async (n_bat) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bâtiment?')) {
      try {
        supprimerElement(n_bat, 'n_bat');
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
      [name]: name === 'nb_chambre' || name === 'n_bat' ? parseInt(value, 10) : value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'add') {
        ajouterElement(formData);
      } else {
        modifierElement(formData.n_bat, 'n_bat', formData);
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
  
  const handleCapaciteChange = (e) => {
    setSearchCapacite(e.target.value);
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({
      ...filterCriteria,
      [name]: value
    });
  };

  // Définition des colonnes pour le tableau
  const colonnesEtablissement = [
    { id: 'n_bat', label: 'ID', triable: true },
    { id: 'nom_bat', label: 'Nom', triable: true },
    { 
      id: 'nb_chambre', 
      label: 'Chambres', 
      triable: true, 
      rendu: (etablissement) => `${etablissement.nb_chambre} chambre(s)` 
    },
    { 
      id: 'etat_bat', 
      label: 'État', 
      triable: true, 
      rendu: (etablissement) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${etablissement.etat_bat === 'Excellent' ? 'bg-green-100 text-green-800' : 
            etablissement.etat_bat === 'Bon' ? 'bg-blue-100 text-blue-800' : 
            etablissement.etat_bat === 'Moyen' ? 'bg-yellow-100 text-yellow-800' :
            etablissement.etat_bat === 'Mauvais' ? 'bg-red-100 text-red-800' :
            'bg-purple-100 text-purple-800'}`}>
          {etablissement.etat_bat}
        </span>
      ) 
    }
  ];

  // Extraire les valeurs uniques pour les filtres
  const capacites = [...new Set([10, 20, 30, 40, 50])];

  return (
    <div className="p-4">
      <PageHeader 
        titre="Gestion des Bâtiments"
        sousTitre={`${etablissementsFiltres.length} bâtiment(s) trouvé(s)`}
        icone={<FaBuilding style={{ color: colors.primaryColor }} />}
        actionPrincipale={
          <BoutonAjouter 
            onClick={handleAdd} 
            texte="Ajouter un bâtiment" 
          />
        }
        actionSecondaire={
          <Recherche 
            valeur={searchTerm}
            onChange={handleSearchChange}
            placeholder="Rechercher un bâtiment..."
            width="250px"
          />
        }
      />

      {/* Statistiques */}
      <StatistiquesEtablissement etablissements={etablissements} />

      {/* Filtres avancés */}
      <FiltresAvances titre="Filtres de recherche" collapsible={true} defaultOpen={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
              État du bâtiment
            </label>
            <select
              name="etat_bat"
              value={filterCriteria.etat_bat}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
              style={{ 
                borderColor: colors.borderColor,
                backgroundColor: colors.inputBg,
                color: colors.textColor
              }}
            >
              <option value="">Tous les états</option>
              {etatsEtablissement.map((etat, index) => (
                <option key={index} value={etat}>{etat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
              Nombre minimum de chambres
            </label>
            <select
              value={searchCapacite}
              onChange={handleCapaciteChange}
              className="w-full p-2 border rounded-md"
              style={{ 
                borderColor: colors.borderColor,
                backgroundColor: colors.inputBg,
                color: colors.textColor
              }}
            >
              <option value="">Tous les bâtiments</option>
              {capacites.map((cap) => (
                <option key={cap} value={cap}>Au moins {cap} chambres</option>
              ))}
            </select>
          </div>
        </div>
      </FiltresAvances>

      {/* Tableau des établissements */}
      {loading ? (
        <Chargement message="Chargement des bâtiments..." />
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erreur!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      ) : (
        <Tableau 
          colonnes={colonnesEtablissement} 
          donnees={etablissementsFiltres} 
          onTri={trierDonnees}
          messageVide="Aucun bâtiment trouvé"
          actions={(etablissement) => (
            <>
              <BoutonVoir onClick={() => handleView(etablissement)} />
              <BoutonModifier onClick={() => handleEdit(etablissement)} />
              <BoutonSupprimer onClick={() => handleDelete(etablissement.n_bat)} />
            </>
          )}
        />
      )}

      {/* Modal de détails */}
      <ModalDetail 
        titre={`Détails du bâtiment ${selectedEtablissement?.nom_bat || ''}`}
        contenu={selectedEtablissement && <DetailEtablissement etablissement={selectedEtablissement} />}
        visible={showModal}
        onFermer={() => setShowModal(false)}
      />

      {/* Modal de formulaire (ajout/édition) */}
      <ModalFormulaire 
        titre={formMode === 'add' ? 'Ajouter un bâtiment' : 'Modifier le bâtiment'}
        visible={showFormModal}
        onFermer={() => setShowFormModal(false)}
        formulaire={
          <FormulaireEtablissement 
            formData={formData}
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            formMode={formMode}
          />
        }
      />
    </div>
  );
}

export default EtablissementPage;

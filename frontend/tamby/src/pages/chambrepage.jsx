import { FaBuilding, FaBed, FaFilter, FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import React, { useState, useCallback, useEffect } from 'react';

// Composants
import Tableau from '../components/communs/Tableau';
import Recherche from '../components/communs/Recherche';
import ModalDetail from '../components/communs/ModalDetail';
import ModalFormulaire from '../components/communs/ModalFormulaire';
import Chargement from '../components/communs/Chargement';
import { BoutonAjouter, BoutonVoir, BoutonModifier, BoutonSupprimer } from '../components/communs/Boutons';
import FiltresAvances from '../components/communs/FiltresAvances';
import DetailChambre from '../components/chambres/DetailChambre';
import FormulaireChambre from '../components/chambres/FormulaireChambre';
import PageHeader from '../components/communs/PageHeader';
import StatistiquesChambre from '../components/chambres/StatistiquesChambre';

// Services
import chambreService from '../services/chambreService';
import batimentService from '../services/batimentService';

// Hooks
import useDonnees from '../hooks/useDonnees';
import useTri from '../hooks/useTri';

// Styles
import { colors } from '../styles/theme';

function ChambrePage() {
  // États locaux
  const [selectedChambre, setSelectedChambre] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' ou 'edit'
  const [formData, setFormData] = useState({
    n_chambre: '',
    capacite_max: 1,
    etat_chambre: 'Disponible',
    n_bat: ''
  });
  const [filterCriteria, setFilterCriteria] = useState({
    n_bat: '',
    etat_chambre: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCapacite, setSearchCapacite] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  
  const etatsChambres = ["Disponible", "Occupée", "En rénovation", "Hors service"];
  
  // Fonctions de récupération des données
  const fetchChambres = useCallback(() => chambreService.getAllChambres(), []);
  const fetchBatiments = useCallback(() => batimentService.getAllBatiments(), []);
  
  // Utilisation des hooks personnalisés avec les fonctions API
  const { 
    donnees: chambres, 
    setDonnees: setChambres,
    loading, 
    error, 
    setError,
    ajouterElement,
    modifierElement,
    supprimerElement
  } = useDonnees([], fetchChambres);
  
  const { 
    donnees: batiments,
    loading: loadingBatiments,
    error: errorBatiments
  } = useDonnees([], fetchBatiments);
  
  const { trierDonnees } = useTri(chambres);

  useEffect(() => {
    if (batiments.length > 0) {
      console.log('Bâtiments chargés:', batiments);
    }
  }, [batiments]);
  
  // Fonction de filtrage pour les chambres
  const filtrerChambres = (chambre) => {
    // Filtrage par critères de base (bâtiment et état)
    const matchesBasicFilters = (
      (filterCriteria.n_bat === '' || chambre.n_bat?.toString() === filterCriteria.n_bat) &&
      (filterCriteria.etat_chambre === '' || chambre.etat_chambre === filterCriteria.etat_chambre)
    );
  
    // Recherche par numéro de chambre
    const matchesSearch = searchTerm === '' || 
      chambre.n_chambre?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Recherche par capacité
    const matchesCapacite = searchCapacite === '' || 
      chambre.capacite_max === parseInt(searchCapacite, 10);
  
    return matchesBasicFilters && matchesSearch && matchesCapacite;
  };

  // Filtrer les chambres
  const chambresFiltrées = chambres.filter(filtrerChambres);

  // Gestionnaires d'événements
  const handleView = (chambre) => {
    setSelectedChambre(chambre);
    setShowModal(true);
  };

  const handleAdd = () => {
    setFormData({
      n_chambre: '',
      capacite_max: 1,
      etat_chambre: 'Disponible',
      n_bat: batiments.length > 0 ? batiments[0].n_bat : ''
    });
    setFormMode('add');
    setShowFormModal(true);
  };

  const handleEdit = (chambre) => {
    setFormData({
      id_chambre: chambre.id_chambre,
      n_chambre: chambre.n_chambre,
      capacite_max: chambre.capacite_max,
      etat_chambre: chambre.etat_chambre,
      n_bat: chambre.n_bat
    });
    setFormMode('edit');
    setShowFormModal(true);
  };

  const handleDelete = async (id_chambre) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette chambre?')) {
      try {
        await supprimerElement(id_chambre, 'id_chambre', chambreService.delete);
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
      [name]: name === 'capacite_max' || name === 'n_bat' ? parseInt(value, 10) : value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'add') {
        // Assurez-vous que n_bat est un nombre
        const chambreToAdd = { 
          ...formData,
          n_bat: parseInt(formData.n_bat, 10) || null
        };
        
        console.log('Données à envoyer:', chambreToAdd);
        
        const dataToSubmit = { ...formData };
        // Si vous avez besoin de supprimer certaines propriétés
        if (formMode === 'add' && 'n_chambre' in dataToSubmit) {
          delete dataToSubmit.n_chambre;
        }
        
        // Appeler l'API pour créer la chambre
        const result = await chambreService.createChambre(dataToSubmit);


        
        console.log('Résultat de la création:', result);
        
        // Créer un objet complet avec l'ID retourné et les données du formulaire
        const nouvelleChambre = {
          ...chambreToAdd,
          id_chambre: result.id || result.insertId
        };
        
        console.log('Nouvelle chambre à ajouter à l\'état:', nouvelleChambre);
        
        // Mettre à jour l'état local avec la nouvelle chambre
        setChambres(prevChambres => [...prevChambres, nouvelleChambre]);
      } else {
        // Pour la modification, assurez-vous aussi que n_bat est un nombre
        const chambreToUpdate = {
          ...formData,
          n_bat: parseInt(formData.n_bat, 10) || null
        };
        
        await chambreService.update(chambreToUpdate.id_chambre, chambreToUpdate);
        
        // Mettre à jour l'état local
        setChambres(prevChambres => 
          prevChambres.map(chambre => 
            chambre.id_chambre === chambreToUpdate.id_chambre ? chambreToUpdate : chambre
          )
        );
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
  
  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({
      ...filterCriteria,
      [name]: value
    });
  };

  const getBatimentName = (n_bat) => {
    if (n_bat === undefined || n_bat === null) return 'Bâtiment non spécifié';
    
    // Convertir n_bat en nombre si c'est une chaîne
    const batId = typeof n_bat === 'string' ? parseInt(n_bat, 10) : n_bat;
    
     // Vérifier si batiments est chargé
    if (!batiments || batiments.length === 0) {
      return `Bâtiment ${n_bat}`;
    }

    // Rechercher le bâtiment par ID
  const batiment = batiments.find(b => {
    // Convertir b.n_bat en nombre pour la comparaison si nécessaire
    const bId = typeof b.n_bat === 'string' ? parseInt(b.n_bat, 10) : b.n_bat;
    return bId === batId;
  });
    
    // Ajouter un log pour déboguer
    console.log('Recherche bâtiment:', { n_bat, batId, trouvé: !!batiment, batiments });
    
    return batiment ? batiment.nom_bat : `Bâtiment ${n_bat}`;
  };

  

  // Définition des colonnes pour le tableau
  const colonnesChambre = [
    { id: 'n_chambre', label: 'Numéro', triable: true },
    { 
      id: 'n_bat', 
      label: 'Bâtiment', 
      triable: true, 
      rendu: (chambre) => {
        console.log('Rendu bâtiment:', chambre);  // Ajoutez cette ligne ici
        return getBatimentName(chambre.n_bat) 
      }
    },
    { 
      id: 'capacite_max', 
      label: 'Capacité', 
      triable: true, 
      rendu: (chambre) => `${chambre.capacite_max || 0} personne(s)` 
    },
    { 
      id: 'etat_chambre', 
      label: 'État', 
      triable: true, 
      rendu: (chambre) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${chambre.etat_chambre === 'Occupée' ? 'bg-red-100 text-red-800' : 
            chambre.etat_chambre === 'Disponible' ? 'bg-green-100 text-green-800' : 
            chambre.etat_chambre === 'En rénovation' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'}`}>
          {chambre.etat_chambre || 'Non défini'}
        </span>
      ) 
    }
  ];

  // Extraire les valeurs uniques pour les filtres
  const capacites = [...new Set(chambres.map(c => c.capacite_max).filter(Boolean))].sort((a, b) => a - b);

  return (
    <div className="p-4">
      <PageHeader 
        titre="Gestion des Chambres"
        sousTitre={`${chambresFiltrées.length} chambre(s) trouvée(s)`}
        icone={<FaBed style={{ color: colors.primaryColor }} />}
        actionPrincipale={
          <BoutonAjouter 
            onClick={handleAdd} 
            texte="Ajouter une chambre" 
          />
        }
        actionSecondaire={
          <Recherche 
            valeur={searchTerm}
            onChange={handleSearchChange}
            placeholder="Rechercher une chambre..."
            width="250px"
          />
        }
      />

      {/* Statistiques */}
      <StatistiquesChambre chambres={chambres} />

      {/* Filtres avancés */}
      <FiltresAvances titre="Filtres de recherche" collapsible={true} defaultOpen={false}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
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
                  {bat.nom_bat || `Bâtiment ${bat.n_bat}`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
              État
            </label>
            <select
              name="etat_chambre"
              value={filterCriteria.etat_chambre}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded-md"
              style={{ 
                borderColor: colors.borderColor,
                backgroundColor: colors.inputBg,
                color: colors.textColor
              }}
            >
              <option value="">Tous les états</option>
              {etatsChambres.map((etat, index) => (
                <option key={index} value={etat}>{etat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.textColor }}>
              Capacité
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
              <option value="">Toutes les capacités</option>
              {capacites.map((cap) => (
                <option key={cap} value={cap}>{cap} personne(s)</option>
              ))}
            </select>
          </div>
        </div>
      </FiltresAvances>

      {/* Tableau des chambres */}
      {loading || loadingBatiments ? (
        <Chargement message="Chargement des données..." />
      ) : error || errorBatiments ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erreur!</strong>
          <span className="block sm:inline"> {error || errorBatiments}</span>
        </div>
      ) : (
        <Tableau 
          colonnes={colonnesChambre} 
          donnees={chambresFiltrées} 
          onTri={trierDonnees}
          messageVide="Aucune chambre trouvée"
          actions={(chambre) => (
            <>
              <BoutonVoir onClick={() => handleView(chambre)} />
              <BoutonModifier onClick={() => handleEdit(chambre)} />
              <BoutonSupprimer onClick={() => handleDelete(chambre.id_chambre)} />
            </>
          )}
        />
      )}

      {/* Modal de détails */}
      <ModalDetail 
        titre={`Détails de la chambre ${selectedChambre?.n_chambre || ''}`}
        contenu={selectedChambre && <DetailChambre chambre={selectedChambre} getBatimentName={getBatimentName} />}
        visible={showModal}
        onFermer={() => setShowModal(false)}
      />

      {/* Modal de formulaire (ajout/édition) */}
      <ModalFormulaire 
        titre={formMode === 'add' ? 'Ajouter une chambre' : 'Modifier la chambre'}
        visible={showFormModal}
        onFermer={() => setShowFormModal(false)}
        formulaire={
          <FormulaireChambre 
            formData={formData}
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            formMode={formMode}
            batiments={batiments}
            etatsChambres={etatsChambres}
          />
        }
      />
    </div>
  );
}

export default ChambrePage;

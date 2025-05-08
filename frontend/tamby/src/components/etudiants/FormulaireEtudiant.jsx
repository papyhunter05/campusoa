import React, { useState, useEffect } from 'react';
import { FaUser, FaUniversity, FaGraduationCap, FaPhone, FaBed } from 'react-icons/fa';
import { colors } from '../../styles/theme';

function FormulaireEtudiant({ 
  formData, 
  onChange, 
  onSubmit, 
  formMode,
  chambres = [] 
}) {
  const [animateFields, setAnimateFields] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  const niveaux = ["L1", "L2", "L3", "M1", "M2", "D"];
  
  // Animation d'entrée des champs
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateFields(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const getFieldStyle = (fieldName) => {
    return {
      borderColor: focusedField === fieldName ? colors.primaryColor : colors.borderColor,
      boxShadow: focusedField === fieldName ? `0 0 0 3px ${colors.highlightColor}` : 'none',
      backgroundColor: focusedField === fieldName ? colors.globalLight : colors.inputBg,
      transform: animateFields ? 'translateY(0)' : 'translateY(10px)',
      opacity: animateFields ? 1 : 0,
      transition: 'all 0.3s ease-out'
    };
  };

  const getLabelStyle = (fieldName) => {
    return {
      color: focusedField === fieldName ? colors.primaryColor : colors.textColor,
      transform: animateFields ? 'translateY(0)' : 'translateY(5px)',
      opacity: animateFields ? 1 : 0,
      transition: 'all 0.3s ease-out'
    };
  };

  const getIconStyle = (fieldName) => {
    return {
      color: focusedField === fieldName ? colors.primaryColor : colors.textLight,
      transition: 'color 0.3s'
    };
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {formMode === 'edit' && (
        <div className="mb-4">
          <label 
            className="flex items-center text-sm font-medium mb-2"
            style={getLabelStyle('n_etudiant')}
          >
            <FaUser className="mr-2" style={getIconStyle('n_etudiant')} />
            Numéro d'étudiant
          </label>
          <input
            type="text"
            name="n_etudiant"
            value={formData.n_etudiant || ''}
            disabled={true}
            className="w-full p-3 border rounded-md bg-gray-200 text-gray-600 cursor-not-allowed"
            style={{
              ...getFieldStyle('n_etudiant'), 
              opacity: 0.7,
              borderColor: '#d1d5db',
              boxShadow: 'none'
            }}
          />
          <p className="mt-1 text-sm text-gray-500 italic">
            Le numéro d'étudiant est une valeur unique qui ne peut pas être modifiée
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label 
            className="flex items-center text-sm font-medium mb-2"
            style={getLabelStyle('nom')}
          >
            <FaUser className="mr-2" style={getIconStyle('nom')} />
            Nom
          </label>
          <input
            type="text"
            name="nom"
            value={formData.nom || ''}
            onChange={onChange}
            onFocus={() => handleFocus('nom')}
            onBlur={handleBlur}
            className="w-full p-3 border rounded-md focus:outline-none transition-all duration-200"
            style={getFieldStyle('nom')}
            required
            placeholder="Nom de l'étudiant"
          />
        </div>
        
        <div className="mb-4">
          <label 
            className="flex items-center text-sm font-medium mb-2"
            style={getLabelStyle('prenom')}
          >
            <FaUser className="mr-2" style={getIconStyle('prenom')} />
            Prénom
          </label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom || ''}
            onChange={onChange}
            onFocus={() => handleFocus('prenom')}
            onBlur={handleBlur}
            className="w-full p-3 border rounded-md focus:outline-none transition-all duration-200"
            style={getFieldStyle('prenom')}
            required
            placeholder="Prénom de l'étudiant"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label 
          className="flex items-center text-sm font-medium mb-2"
          style={getLabelStyle('univ')}
        >
          <FaUniversity className="mr-2" style={getIconStyle('univ')} />
          Université
        </label>
        <input
          type="text"
          name="univ"
          value={formData.univ || ''}
          onChange={onChange}
          onFocus={() => handleFocus('univ')}
          onBlur={handleBlur}
          className="w-full p-3 border rounded-md focus:outline-none transition-all duration-200"
          style={getFieldStyle('univ')}
          required
          placeholder="Nom de l'université"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label 
            className="flex items-center text-sm font-medium mb-2"
            style={getLabelStyle('niveau')}
          >
            <FaGraduationCap className="mr-2" style={getIconStyle('niveau')} />
            Niveau d'études
          </label>
          <select
            name="niveau"
            value={formData.niveau || ''}
            onChange={onChange}
            onFocus={() => handleFocus('niveau')}
            onBlur={handleBlur}
            className="w-full p-3 border rounded-md focus:outline-none transition-all duration-200 appearance-none"
            style={{
              ...getFieldStyle('niveau'),
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23${colors.textLight.replace('#', '')}' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
              backgroundSize: '20px',
              paddingRight: '40px'
            }}
            required
          >
            <option value="">Sélectionnez un niveau</option>
            {niveaux.map((niveau, index) => (
              <option key={index} value={niveau}>{niveau}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label 
            className="flex items-center text-sm font-medium mb-2"
            style={getLabelStyle('contact')}
          >
            <FaPhone className="mr-2" style={getIconStyle('contact')} />
            Contact
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact || ''}
            onChange={onChange}
            onFocus={() => handleFocus('contact')}
            onBlur={handleBlur}
            className="w-full p-3 border rounded-md focus:outline-none transition-all duration-200"
            style={getFieldStyle('contact')}
            placeholder="Numéro de téléphone ou email"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label 
          className="flex items-center text-sm font-medium mb-2"
          style={getLabelStyle('n_chambre')}
        >
          <FaBed className="mr-2" style={getIconStyle('n_chambre')} />
          Chambre (optionnel)
        </label>
        <select
          name="n_chambre"
          value={formData.n_chambre || ''}
          onChange={onChange}
          onFocus={() => handleFocus('n_chambre')}
          onBlur={handleBlur}
          className="w-full p-3 border rounded-md focus:outline-none transition-all duration-200 appearance-none"
          style={{
            ...getFieldStyle('n_chambre'),
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23${colors.textLight.replace('#', '')}' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
            backgroundSize: '20px',
            paddingRight: '40px'
          }}
        >
          <option value="">Aucune chambre attribuée</option>
          {chambres.map((chambre) => (
            <option key={chambre.n_chambre} value={chambre.n_chambre}>
              Chambre {chambre.n_chambre}
            </option>
          ))}
          {formData.n_chambre && !chambres.find(c => c.n_chambre === formData.n_chambre) && (
            <option value={formData.n_chambre}>Chambre {formData.n_chambre} (actuellement attribuée)</option>
          )}
        </select>
      </div>
      
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="submit"
          className="px-6 py-3 rounded-md transition-all duration-300 flex items-center justify-center"
          style={{ 
            backgroundColor: colors.primaryColor,
            color: colors.globalLight,
            boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
            transform: animateFields ? 'translateY(0)' : 'translateY(10px)',
            opacity: animateFields ? 1 : 0,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = colors.primaryDark;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = colors.primaryColor;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)';
          }}
        >
          {formMode === 'add' ? 'Ajouter' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
}

export default FormulaireEtudiant;

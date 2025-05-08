import React, { useState, useEffect } from 'react';
import { FaBuilding, FaBed, FaClipboardCheck, FaAlignLeft } from 'react-icons/fa';
import { colors } from '../../styles/theme';

function FormulaireEtablissement({ 
  formData, 
  onChange, 
  onSubmit, 
  formMode 
}) {
  const [animateFields, setAnimateFields] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  const etatsEtablissement = ["Excellent", "Bon", "Moyen", "Mauvais", "En rénovation"];
  
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
            style={getLabelStyle('n_bat')}
          >
            <FaBuilding className="mr-2" style={getIconStyle('n_bat')} />
            Identifiant du bâtiment (non modifiable)
          </label>
          <div className="relative">
            <input
              type="number"
              name="n_bat"
              value={formData.n_bat}
              disabled={true}
              className="w-full p-3 border rounded-md bg-gray-200 text-gray-600 cursor-not-allowed"
              style={{
                ...getFieldStyle('n_bat'), 
                opacity: 0.7,
                borderColor: '#d1d5db',
                boxShadow: 'none'
              }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      )}

      
      <div className="mb-4">
        <label 
          className="flex items-center text-sm font-medium mb-2"
          style={getLabelStyle('nom_bat')}
        >
          <FaBuilding className="mr-2" style={getIconStyle('nom_bat')} />
          Nom du bâtiment
        </label>
        <input
          type="text"
          name="nom_bat"
          value={formData.nom_bat}
          onChange={onChange}
          onFocus={() => handleFocus('nom_bat')}
          onBlur={handleBlur}
          className="w-full p-3 border rounded-md focus:outline-none transition-all duration-200"
          style={getFieldStyle('nom_bat')}
          required
          placeholder="Ex: Résidence Alpha"
        />
      </div>
      
      <div className="mb-4">
        <label 
          className="flex items-center text-sm font-medium mb-2"
          style={getLabelStyle('nb_chambre')}
        >
          <FaBed className="mr-2" style={getIconStyle('nb_chambre')} />
          Nombre de chambres
        </label>
        <input
          type="number"
          name="nb_chambre"
          value={formData.nb_chambre}
          onChange={onChange}
          onFocus={() => handleFocus('nb_chambre')}
          onBlur={handleBlur}
          min="1"
          className="w-full p-3 border rounded-md focus:outline-none transition-all duration-200"
          style={getFieldStyle('nb_chambre')}
          required
          placeholder="Ex: 20"
        />
      </div>
      
      <div className="mb-4">
        <label 
          className="flex items-center text-sm font-medium mb-2"
          style={getLabelStyle('etat_bat')}
        >
          <FaClipboardCheck className="mr-2" style={getIconStyle('etat_bat')} />
          État du bâtiment
        </label>
        <select
          name="etat_bat"
          value={formData.etat_bat}
          onChange={onChange}
          onFocus={() => handleFocus('etat_bat')}
          onBlur={handleBlur}
          className="w-full p-3 border rounded-md focus:outline-none transition-all duration-200 appearance-none"
          style={{
            ...getFieldStyle('etat_bat'),
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23${colors.textLight.replace('#', '')}' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
            backgroundSize: '20px',
            paddingRight: '40px'
          }}
          required
        >
          <option value="">Sélectionnez un état</option>
          {etatsEtablissement.map((etat, index) => (
            <option key={index} value={etat}>{etat}</option>
          ))}
        </select>
        <div className="flex mt-2">
          {etatsEtablissement.map((etat, index) => (
            <div 
              key={index} 
              className={`h-2 flex-1 mr-1 rounded-full transition-all duration-300 ${
                formData.etat_bat === etat ? 'opacity-100' : 'opacity-30'
              }`}
              style={{ 
                backgroundColor: 
                  etat === 'Excellent' ? '#047857' : 
                  etat === 'Bon' ? '#16a34a' : 
                  etat === 'Moyen' ? '#ca8a04' : 
                  etat === 'Mauvais' ? '#b91c1c' : 
                  '#4b5563',
                transform: formData.etat_bat === etat ? 'scaleY(1.5)' : 'scaleY(1)'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <label 
          className="flex items-center text-sm font-medium mb-2"
          style={getLabelStyle('description')}
        >
          <FaAlignLeft className="mr-2" style={getIconStyle('description')} />
          Description (optionnelle)
        </label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={onChange}
          onFocus={() => handleFocus('description')}
          onBlur={handleBlur}
          className="w-full p-3 border rounded-md focus:outline-none transition-all duration-200"
          style={{...getFieldStyle('description'), minHeight: '100px'}}
          placeholder="Description du bâtiment..."
        />
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

export default FormulaireEtablissement;

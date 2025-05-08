import React, { useState, useEffect } from 'react';
import { FaBed, FaBuilding, FaUsers, FaClipboardCheck } from 'react-icons/fa';
import { colors } from '../../styles/theme';

function FormulaireChambre({ 
  formData, 
  onChange, 
  onSubmit, 
  formMode, 
  batiments, 
  etatsChambres 
}) {
  const [animateFields, setAnimateFields] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
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
      {/* Afficher le numéro de chambre uniquement en mode édition */}
      {formMode === 'edit' && (
        <div className="mb-4">
          <label 
            className="flex items-center text-sm font-medium mb-2"
            style={getLabelStyle('n_chambre')}
          >
            <FaBed className="mr-2" style={getIconStyle('n_chambre')} />
            Numéro de chambre
          </label>
          <input
            type="text"
            name="n_chambre"
            value={formData.n_chambre || ''}
            disabled={true}
            className="w-full p-3 border rounded-md bg-gray-200 text-gray-600 cursor-not-allowed"
            style={{
              ...getFieldStyle('n_chambre'), 
              opacity: 0.7,
              borderColor: '#d1d5db',
              boxShadow: 'none'
            }}
          />
          <p className="mt-1 text-sm text-gray-500 italic">
            Le numéro de chambre est une valeur unique qui ne peut pas être modifiée
          </p>
        </div>
      )}
      
      <div className="mb-4">
        <label 
          className="flex items-center text-sm font-medium mb-2"
          style={getLabelStyle('n_bat')}
        >
          <FaBuilding className="mr-2" style={getIconStyle('n_bat')} />
          Bâtiment
        </label>
        <select
          name="n_bat"
          value={formData.n_bat || ''}
          onChange={onChange}
          onFocus={() => handleFocus('n_bat')}
          onBlur={handleBlur}
          className="w-full p-3 border rounded-md focus:outline-none transition-all duration-200 appearance-none"
          style={{
            ...getFieldStyle('n_bat'),
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23${colors.textLight.replace('#', '')}' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
            backgroundSize: '20px',
            paddingRight: '40px'
          }}
          required
        >
          <option value="">Sélectionnez un bâtiment</option>
          {batiments.map((bat) => (
            <option key={bat.n_bat} value={bat.n_bat.toString()}>
            {bat.nom_bat || `Bâtiment ${bat.n_bat}`}
            </option>
          ))}
        </select>
      </div>

      
      <div className="mb-4">
        <label 
          className="flex items-center text-sm font-medium mb-2"
          style={getLabelStyle('capacite_max')}
        >
          <FaUsers className="mr-2" style={getIconStyle('capacite_max')} />
          Capacité maximale
        </label>
        <div className="relative">
          <input
            type="number"
            name="capacite_max"
            value={formData.capacite_max}
            onChange={onChange}
            onFocus={() => handleFocus('capacite_max')}
            onBlur={handleBlur}
            min="1"
            className="w-full p-3 border rounded-md focus:outline-none transition-all duration-200"
            style={getFieldStyle('capacite_max')}
            required
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span style={{ color: colors.textLight }}>personne(s)</span>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label 
          className="flex items-center text-sm font-medium mb-2"
          style={getLabelStyle('etat_chambre')}
        >
          <FaClipboardCheck className="mr-2" style={getIconStyle('etat_chambre')} />
          État de la chambre
        </label>
        <select
          name="etat_chambre"
          value={formData.etat_chambre}
          onChange={onChange}
          onFocus={() => handleFocus('etat_chambre')}
          onBlur={handleBlur}
          className="w-full p-3 border rounded-md focus:outline-none transition-all duration-200 appearance-none"
          style={{
            ...getFieldStyle('etat_chambre'),
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23${colors.textLight.replace('#', '')}' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
            backgroundSize: '20px',
            paddingRight: '40px'
          }}
          required
        >
          {etatsChambres.map((etat, index) => (
            <option key={index} value={etat}>{etat}</option>
          ))}
        </select>
        <div className="flex mt-2">
          {etatsChambres.map((etat, index) => (
            <div 
              key={index} 
              className={`h-2 flex-1 mr-1 rounded-full transition-all duration-300 ${
                formData.etat_chambre === etat ? 'opacity-100' : 'opacity-30'
              }`}
              style={{ 
                backgroundColor: 
                  etat === 'Disponible' ? colors.successColor : 
                  etat === 'Occupée' ? colors.primaryColor : 
                  etat === 'En rénovation' ? colors.secondaryColor : 
                  colors.errorText,
                transform: formData.etat_chambre === etat ? 'scaleY(1.5)' : 'scaleY(1)'
              }}
            />
          ))}
        </div>
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

export default FormulaireChambre;

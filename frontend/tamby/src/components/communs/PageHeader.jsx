import React from 'react';
import { colors } from '../../styles/theme';

function PageHeader({ 
  titre, 
  sousTitre = null, 
  actionPrincipale = null, 
  actionSecondaire = null,
  icone = null
}) {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center">
          {icone && (
            <div 
              className="p-3 rounded-full mr-4 hidden md:flex"
              style={{ 
                backgroundColor: colors.primaryColor + '20', // 20% opacity
              }}
            >
              {icone}
            </div>
          )}
          <div>
            <h1 
              className="text-2xl font-bold" 
              style={{ color: colors.primaryColor }}
            >
              {titre}
            </h1>
            {sousTitre && (
              <p 
                className="mt-1" 
                style={{ color: colors.textLight }}
              >
                {sousTitre}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex mt-4 md:mt-0 space-x-3">
          {actionSecondaire}
          {actionPrincipale}
        </div>
      </div>
    </div>
  );
}

export default PageHeader;

import React, { useState, useEffect } from 'react';
import { colors } from '../styles/theme';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [selectedBatiment, setSelectedBatiment] = useState('all');

  // Données fictives pour les bâtiments
  const batiments = [
    { id: 1, nom: 'Bâtiment A' },
    { id: 2, nom: 'Bâtiment B' },
    { id: 3, nom: 'Bâtiment C' },
  ];

  useEffect(() => {
    // Simulation du chargement des données
    const timer = setTimeout(() => {
      // Données fictives pour les commentaires
      const mockComments = [
        {
          n_comment: 1,
          contenue: "Problème de chauffage dans la chambre 203, il fait très froid depuis hier.",
          date_com: "2023-11-15T08:30:00",
          n_bat: 1,
          n_etudiant: 101,
          etudiant_nom: "Sophie Martin",
          etudiant_photo: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
          n_comment: 2,
          contenue: "La connexion Wi-Fi est très instable au 3ème étage, impossible de suivre les cours en ligne.",
          date_com: "2023-11-14T16:45:00",
          n_bat: 1,
          n_etudiant: 102,
          etudiant_nom: "Thomas Dubois",
          etudiant_photo: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
          n_comment: 3,
          contenue: "Les douches du 2ème étage sont bouchées depuis ce matin.",
          date_com: "2023-11-14T09:15:00",
          n_bat: 2,
          n_etudiant: 103,
          etudiant_nom: "Emma Bernard",
          etudiant_photo: "https://randomuser.me/api/portraits/women/63.jpg"
        },
        {
          n_comment: 4,
          contenue: "Merci pour la réparation rapide de la serrure de ma chambre !",
          date_com: "2023-11-13T14:20:00",
          n_bat: 3,
          n_etudiant: 104,
          etudiant_nom: "Lucas Petit",
          etudiant_photo: "https://randomuser.me/api/portraits/men/55.jpg"
        },
        {
          n_comment: 5,
          contenue: "Il y a beaucoup de bruit qui vient de la salle commune le soir, difficile de se concentrer sur les révisions.",
          date_com: "2023-11-12T22:10:00",
          n_bat: 2,
          n_etudiant: 105,
          etudiant_nom: "Chloé Leroy",
          etudiant_photo: "https://randomuser.me/api/portraits/women/17.jpg"
        }
      ];
      
      setComments(mockComments);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // Ajouter un nouveau commentaire fictif
    const newCommentObj = {
      n_comment: comments.length + 1,
      contenue: newComment,
      date_com: new Date().toISOString(),
      n_bat: parseInt(selectedBatiment === 'all' ? 1 : selectedBatiment),
      n_etudiant: 100, // ID fictif pour l'administrateur
      etudiant_nom: "Admin",
      etudiant_photo: "https://randomuser.me/api/portraits/men/1.jpg"
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  const filteredComments = selectedBatiment === 'all' 
    ? comments 
    : comments.filter(comment => comment.n_bat === parseInt(selectedBatiment));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Hier";
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
  };

  // Grouper les commentaires par jour
  const groupedComments = filteredComments.reduce((groups, comment) => {
    const day = new Date(comment.date_com).toDateString();
    if (!groups[day]) {
      groups[day] = [];
    }
    groups[day].push(comment);
    return groups;
  }, {});

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col" style={{ maxHeight: '600px' }}>
      {/* En-tête Telegram */}
      <div className="bg-[#5288C1] p-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center">
          <span className="mr-2">💬</span> Commentaires des étudiants
        </h2>
        <div className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {/* Filtre par bâtiment - Style Telegram */}
      <div className="p-2 bg-[#F5F5F5] border-b flex items-center">
        <div className="w-full">
          <select 
            value={selectedBatiment}
            onChange={(e) => setSelectedBatiment(e.target.value)}
            className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5288C1] bg-white text-gray-700 border border-gray-200"
            style={{ fontSize: '14px' }}
          >
            <option value="all">Tous les bâtiments</option>
            {batiments.map(bat => (
              <option key={bat.id} value={bat.id}>{bat.nom}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Liste des commentaires style Telegram */}
      <div 
        className="flex-1 overflow-y-auto p-3 bg-[#F5F5F5]"
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
                 style={{ borderColor: `#5288C140`, borderTopColor: 'transparent' }}></div>
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 bg-white p-3 rounded-lg shadow">Aucun commentaire pour ce bâtiment</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedComments).map(([day, dayComments]) => (
              <div key={day} className="space-y-2">
                <div className="flex justify-center">
                  <div className="bg-[#E4EAEF] text-[#8A9AA7] text-xs px-3 py-1 rounded-full">
                    {formatDay(dayComments[0].date_com)}
                  </div>
                </div>
                
                {dayComments.map((comment) => {
                  const isAdmin = comment.etudiant_nom === "Admin";
                  return (
                    <div key={comment.n_comment} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                      {!isAdmin && (
                        <img 
                          src={comment.etudiant_photo} 
                          alt={comment.etudiant_nom}
                          className="w-10 h-10 rounded-full mr-2 self-end"
                        />
                      )}
                      <div className={`max-w-[70%] ${isAdmin ? 'bg-[#E4EAEF]' : 'bg-white'} rounded-lg p-2 shadow`}>
                        {!isAdmin && (
                          <div className="font-semibold text-[#5288C1]">{comment.etudiant_nom}</div>
                        )}
                        <p className="text-gray-800 text-sm">{comment.contenue}</p>
                        <div className="flex justify-end items-center mt-1">
                          <span className="text-[10px] text-gray-500">{formatDate(comment.date_com)}</span>
                          {isAdmin && (
                            <span className="ml-1 text-[#5288C1]">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Zone de saisie de nouveau commentaire - Style Telegram */}
      <form onSubmit={handleSubmit} className="p-2 bg-[#F5F5F5] border-t border-gray-200 flex items-center">
        <div className="flex-1 bg-white rounded-full overflow-hidden flex items-center border border-gray-200">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Message..."
            className="flex-1 p-2 px-4 bg-transparent border-0 text-gray-700 focus:outline-none placeholder-gray-500"
          />
          {!newComment.trim() && (
            <button 
              type="button"
              className="p-2 text-gray-500 hover:text-[#5288C1] transition-colors focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
          )}
        </div>
        <button 
          type="submit"
          className={`ml-2 p-2 rounded-full ${newComment.trim() ? 'bg-[#5288C1] text-white' : 'bg-gray-200 text-gray-500'} focus:outline-none`}
          disabled={!newComment.trim()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default CommentSection;

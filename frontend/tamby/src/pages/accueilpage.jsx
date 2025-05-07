import React, { useEffect } from 'react';
import couvertureImage from '../assets/cite.jpg';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logocampusoa.png';
import studioImage from '../assets/studio.png';
import localisationImage from '../assets/localisation.png';
import preniumImage from '../assets/prenium.png';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importez les styles CSS d'AOS

function AccueilPage() {
  // Initialiser AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // durée des animations
      once: true, // l'animation ne se produit qu'une seule fois
      easing: 'ease-in-out', // type d'animation
    });
  }, []);

  return (
    <div className="flex flex-col">
      {/* Section principale avec image et titre - hauteur augmentée */}
      <div className="relative h-[75vh] md:h-[85vh]">
        {/* Image en arrière-plan qui couvre toute la largeur */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={couvertureImage}
            alt="Immeuble résidentiel Liberty Square"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenu superposé avec mise en page divisée */}
        <div className="relative h-full flex flex-col md:flex-row">
          {/* Côté gauche - transparent pour laisser voir l'image */}
          <div className="w-full md:w-1/2 h-full"></div>

          {/* Côté droit avec fond bleu semi-transparent */}
          <div className="w-full md:w-1/2 bg-blue-700 bg-opacity-75 flex items-center justify-center p-8 md:p-12 h-full" data-aos="fade-left">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Bienvenue à<br />Campusoa
              </h1>
              <p className="mt-6 text-white text-lg md:text-xl max-w-md mx-auto md:mx-0">
                Le meilleur logement pour une meilleure vie étudiante  
              </p>
              <Link to="/login" className="mt-8 px-6 py-3 bg-white text-green-700 font-medium rounded-md hover:bg-gray-100 transition duration-300 inline-block">
                Connexion
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Nouvelle section avec deux blocs côte à côte */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {/* Bloc de gauche avec titre et description */}
            <div className="w-full md:w-1/2 flex flex-col justify-center rounded-lg" data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Présentation de Campusoa
              </h2>
              <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-lg">
              Campusoa est une cité résidentielle privée dédiée aux étudiants universitaires, implantée au cœur de Fianarantsoa depuis maintenant 12 ans. Pionnière dans son domaine, elle s'est imposée comme la principale cité multifilière de la région, accueillant des étudiants de toutes disciplines et formations.
              </p>
              <div className="mt-8">
                <Link
                  to="/services"
                  className="inline-block px-6 py-3 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-800 transition duration-300"
                >
                  Découvrir Nos Services
                </Link>
              </div>
            </div>
            
            {/* Bloc de droite avec images et badge */}
            <div className="w-full md:w-1/2 relative mt-8 md:mt-0" data-aos="fade-left">
              {/* Une seule image qui prend toute la largeur */}
              <div className="overflow-hidden rounded-t-2xl h-[400px] flex items-center justify-center">
                <img 
                  src={logoImage} 
                  alt="Chambre confortable et moderne" 
                  className="max-w-full max-h-full object-contain" 
                />
              </div>

              
              {/* Badge d'expérience */}
              <div className="absolute -bottom-5 -right-5 w-28 h-28 bg-red-600 rounded-full flex items-center justify-center text-center p-2 shadow-lg" data-aos="zoom-in" data-aos-delay="300">
                <div className="text-white font-bold">
                  <span className="block text-xl">12+</span>
                  <span className="block text-sm">Années d'Expérience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section d'introduction (optionnelle) */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8" data-aos="fade-up">
            Pourquoi Nous choisir ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="text-center p-6" data-aos="fade-up" data-aos-delay="200" data-aos-once="false">
            <div className="mx-auto mb-4 h-30">
                <img 
                  src={localisationImage} 
                  alt="Emplacement Idéal" 
                  className="h-full mx-auto"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Emplacement Idéal</h3>
              <p className="text-gray-600">Situé dans le quartier paisible avec accès facile aux commodités universitaires.</p>
            </div>
            <div className="text-center p-6" data-aos="fade-up" data-aos-delay="100" data-aos-once="false">
              <div className="mx-auto mb-4 h-30">
                <img 
                  src={studioImage} 
                  alt="Appartements Modernes" 
                  className="h-full mx-auto"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">studio Modernes</h3>
              <p className="text-gray-600">Des espaces de vie conçus spécialement pour regrouper confort, foctionnalité et bien-être.</p>
            </div>

            <div className="text-center p-6" data-aos="fade-up" data-aos-delay="300" data-aos-once="false">
            <div className="mx-auto mb-4 h-30">
                <img 
                  src={preniumImage} 
                  alt="Services Premium" 
                  className="h-full mx-auto"

                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Services Premium</h3>
              <p className="text-gray-600">Des équipements et services ainsi que securités de qualité pour une vie quotidienne facilitée.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccueilPage;

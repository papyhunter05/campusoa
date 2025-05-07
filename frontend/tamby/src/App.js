import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Approute from './Approute.js';
import Navigation from './components/Navigation';
import Footer from './components/layout/footer.jsx';

//importation des animations AOS
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  //annimations AOS
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Remplacer Menu par Navigation */}
        <Navigation />
        <div className="pt-16 flex-grow">
          <Approute />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

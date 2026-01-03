// frontend/src/App.jsx

import React from 'react';
import Header from './components/Header.jsx';       // <-- Mudei para .jsx
import HomeContent from './components/HomeContent.jsx'; // <-- Mudei para .jsx
import Footer from './components/Footer.jsx';       // <-- Mudei para .jsx

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <HomeContent />
      </main>
      <Footer />
    </div>
  );
}

export default App;
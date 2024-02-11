import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import PropertyList from './components/PropertyList';
import PropertyDetail from './components/PropertyDetail';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import PropertyList from './components/PropertyList';
import PropertyDetail from './components/PropertyDetail';
import PropertyForm from './components/PropertyForm';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/add-property" element={<PropertyForm />} />
          <Route path="/edit-property/:id" element={<PropertyForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

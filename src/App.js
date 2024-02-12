import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import PropertyList from './components/PropertyList';
import PropertyDetail from './components/PropertyDetail';
import PropertyForm from './components/PropertyForm';
import NavBar from './components/NavBar';

function App() {
  return (
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/add-property" element={<PropertyForm />} />
          <Route path="/edit-property/:id" element={<PropertyForm />} />
        </Routes>
      </Router>
  );
}

export default App;

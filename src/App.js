import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import PropertyList from './components/PropertyList';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<PropertyList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

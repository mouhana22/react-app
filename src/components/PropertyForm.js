import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const PropertyForm = () => {

  const { id } = useParams();

  //initial states

  const [property, setProperty] = useState({
    title: '',
    address: '',
    price: '',
    description: '',
  });

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/properties/${id}`)
        .then(response => setProperty(response.data))
        .catch(error => console.error('Error fetching property details:', error));
    }
  }, [id]);

  // Handle input fields changes.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prevProperty => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    // handle the submit request, create or update
    if (id) {
        //update 
      api.put(`/properties/${id}`, property)
        .then(() => navigate(`/properties/${id}`))
        .catch(error => setError(error.message));
    } else {
        // create new property
      api.post('/properties', property)
        .then(response => navigate(`/properties/${response.data.id}`))
        .catch(error => setError(error.message));
    }
  };

  return (
    <div className="container mt-4">
        <h1 className="my-4 text-center">Property Form</h1>
        <form className="mt-4" noValidate onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title:</label>
            <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={property.title}
            onChange={handleChange}
            required
            />
            {validated && !property.title && <span>Please enter a title.</span>}
        </div>

        <div className="mb-3">
            <label htmlFor="address" className="form-label">Address:</label>
            <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={property.address}
            onChange={handleChange}
            required
            />
            {validated && !property.address && <span>Please enter an address.</span>}
        </div>

        <div className="mb-3">
            <label htmlFor="price" className="form-label">Price:</label>
            <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={property.price}
            onChange={handleChange}
            required
            />
            {validated && !property.price && <span>Please enter a valid price.</span>}
        </div>

        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea
            rows={3}
            className="form-control"
            id="description"
            name="description"
            value={property.description}
            onChange={handleChange}
            required
            />
            {validated && !property.description && <span>Please enter a description.</span>}
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-outline-primary rounded-pill col-12">
            {id ? 'Update Property' : 'Add Property'}
        </button>
        </form>
    </div>
  );
};

export default PropertyForm;

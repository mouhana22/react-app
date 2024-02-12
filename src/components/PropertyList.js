import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  useEffect(() => {
    // Fetch properties from the API
    api.get('/properties')
      .then(response => setProperties(response.data))
      .catch(error => console.error('Error fetching properties:', error));
  }, []);

  // show modal
  const handleShowDeleteModal = (property) => {
    setPropertyToDelete(property);
    setShowDeleteModal(true);
  };

  // close modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setPropertyToDelete(null);
  };

   // Handle delete, after user's confirm
  const handleDeleteProperty = () => {
    if (propertyToDelete) {
      api.delete(`/properties/${propertyToDelete.id}`)
        .then(() => {
          // Refresh the property list after deletion
          api.get('/properties')
            .then(response => setProperties(response.data))
            .catch(error => console.error('Error fetching properties:', error));
        })
        .catch(error => console.error('Error deleting property:', error))
        .finally(() => handleCloseDeleteModal());
    }
  };

  return (
    <div className="container mt-4">

      <h1 className="mb-4 text-center">List Of Properties</h1>
      
      
      <Row>
        {properties.map(property => (
          <Col key={property.id} md={4} className="mb-4">
            <Card>
              {property.thumbnail && (
                <Card.Img variant="top" src={property.thumbnail} alt="Property Thumbnail" />
              )}

              <Card.Body>
                <Card.Title className='text-center'>{property.title}</Card.Title>

                <Card.Text>Address: {property.address}</Card.Text>
                <Card.Text>Price: {property.price}</Card.Text>

                <Link to={`/properties/${property.id}`}>
                <Button variant="outline-primary rounded-pill" className='col-12 mb-2'>
                  View Details
                </Button>
                </Link>

                <Link to={`/edit-property/${property.id}`}>
                  <Button variant="outline-warning rounded-pill" className='col-12'>
                    Edit Property
                  </Button>
                </Link>

                <Button
                  variant="outline-danger rounded-pill mt-2"
                  className='col-12'
                  onClick={() => handleShowDeleteModal(property)}
                >
                  Delete Property
                </Button>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Link to="/add-property" className="mb-3">
        <Button variant="outline-success" className='rounded-pill mb-4 col-12'>Add New Property</Button>
      </Link>

      {/* Delete Property Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {propertyToDelete && (
            <p>Are you sure you want to delete the property "{propertyToDelete.title}"?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProperty}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PropertyList;

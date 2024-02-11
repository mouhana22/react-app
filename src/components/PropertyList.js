import React, { useEffect, useState } from 'react';
import api from '../api';
import { Card, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch properties from the API
    api.get('/properties')
      .then(response => setProperties(response.data))
      .catch(error => console.error('Error fetching properties:', error));
  }, []);

  return (
    <div className="container mt-4">

      <h1 className="mb-4 text-center">Property Listings</h1>
      
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

                <Button variant="btn btn-outline-primary rounded-pill" className='col-12'>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PropertyList;

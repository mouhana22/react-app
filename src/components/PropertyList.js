import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Link to="/add-property" className="mb-3">
        <Button variant="outline-success" className='rounded-pill mb-4 col-12'>Add New Property</Button>
      </Link>
    </div>
  );
};

export default PropertyList;

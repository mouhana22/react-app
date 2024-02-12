import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    // Fetch individual property details from the API based on the ID
    api.get(`/properties/${id}`)
      .then(response => setProperty(response.data))
      .catch(error => console.error('Error fetching property details:', error));
  }, [id]);

  if (!property) {
    return <Spinner animation="border" variant="primary" className='position-absolute top-50 start-50'/>;
  }

  return (
    <div className="container mt-4">
        <h1 className="my-4 text-center">Property Details</h1>

        <Container className="my-3 col-lg-8">
        <Card>

            {property.thumbnail && (
            <Card.Img variant="top" src={property.thumbnail} alt="Property Thumbnail" />
            )}

            <Card.Body>

            <Card.Title className='text-center'>{property.title}</Card.Title>

            <Card.Text>Address: {property.address}</Card.Text>
            <Card.Text>Price: {property.price}</Card.Text>
            <Card.Text>Description: {property.description}</Card.Text>

            <Link to="/">
                <Button variant="outline-primary rounded-pill" className="mb-3 col-12">
                Back to Properties Page
                </Button>
            </Link>

            </Card.Body>
        </Card>
        </Container>
    </div>
  );
};

export default PropertyDetail;

import React from 'react';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import { FaLightbulb, FaLeaf, FaShieldAlt, FaUserTie } from 'react-icons/fa';

const AboutScreen = () => {
  return (
    <Container className="my-5">
      <h1 className="mb-4">About Us</h1>
      <Row className="mb-5">
        <Col md={6}>
          <Image
            src='/images/holzern.jpeg'
            alt="About us"
            fluid
            rounded
          />
        </Col>
        <Col md={6} className='mt-2'>
          <h2>Our Story</h2>
          <p>
            We are a company based in Tanjong Agas, Malaysia, transitioning into an export-focused
            business to the United States.
          </p>
          <p>
            With a strong commitment to excellence, our mission is to bring innovative, sustainable,
            and reliable solutions to global markets while maintaining the highest level of
            professionalism.
          </p>
        </Col>
      </Row>

      <Row className="text-center">
        <Col md={3}>
          <Card className="p-3 mt-2  card-hover">
            <FaLightbulb size={40} className="mb-2 text-warning" />
            <Card.Title>Innovation</Card.Title>
            <Card.Text>
              We embrace creative thinking and cutting-edge solutions to drive progress and stand
              out in a competitive market.
            </Card.Text>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 mt-2  card-hover">
            <FaLeaf size={40} className="mb-2 text-success" />
            <Card.Title>Sustainability</Card.Title>
            <Card.Text>
              Our operations prioritize eco-friendly practices to ensure a better tomorrow for our
              planet and future generations.
            </Card.Text>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 mt-2  card-hover">
            <FaShieldAlt size={40} className="mb-2 text-primary" />
            <Card.Title>Reliability</Card.Title>
            <Card.Text>
              Customers trust us for our dependable service and consistent quality in every product
              we deliver.
            </Card.Text>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="p-3 mt-2  card-hover">
            <FaUserTie size={40} className="mb-2 text-dark" />
            <Card.Title>Professionalism</Card.Title>
            <Card.Text>
              We maintain the highest standards of integrity, responsibility, and respect in
              everything we do.
            </Card.Text>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutScreen;
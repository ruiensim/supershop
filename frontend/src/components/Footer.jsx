import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#800080' }} className="text-light">
      <Container>
        <Row>
          <Col md={4} className="text-center py-3">
            <p>Holzern Furniture &copy; {currentYear}</p>
            <p>
              <FaEnvelope className="me-2" />
              <a href="mailto:Sales&marketing@holzernfurniture.com" className="text-white">
                Sales&marketing@holzernfurniture.com
              </a>
            </p>
          </Col>
          <Col md={4} className="text-center py-3">
            <p>
              <FaMapMarkerAlt className="me-2" />
              Address:
            </p>
            <p>No, K66, Kawasan Perindustrian Tanjung Agas, 84000 Muar, Johor</p>
          </Col>
          <Col md={4} className="text-center py-3">
            <p>
              <FaPhoneAlt className="me-2" />
              Phone:
            </p>
            <p>062810759</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
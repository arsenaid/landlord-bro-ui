import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <Container fluid style={{backgroundColor: '#f8f9fa', marginTop: '10px'}}>
            <Row>
                <Col className="text-center py-3">
                    &copy; {new Date().getFullYear()} LandlordBro
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;

import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>Blog Post App</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;

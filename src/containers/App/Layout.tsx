import React from 'react';
import { Container } from 'react-bootstrap';
import Header from 'src/components/Header';
import User from 'src/containers/User';

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <User />
      </Container>
    </>
  );
};

export default Layout;

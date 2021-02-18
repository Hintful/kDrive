import React from 'react';
import { Container } from 'react-bootstrap';
import AddFolder from './AddFolder';
import Navbar from './Navbar';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Container fluid>
        <AddFolder />
      </Container>
    </>
  );
}
 
export default Dashboard;
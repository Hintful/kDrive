import React from 'react';
import { Container } from 'react-bootstrap';
import UseFolder from '../../hooks/UseFolder';
import AddFolder from './AddFolder';
import Navbar from './Navbar';

const Dashboard = () => {
  const state = UseFolder();
  console.log(state);
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
import React from 'react';
import { Container } from 'react-bootstrap';
import UseFolder from '../../hooks/UseFolder';
import AddFolder from './AddFolder';
import Folder from './Folder';
import Navbar from './Navbar';

const Dashboard = () => {
  const { folder, childFolders } = UseFolder("NPHamndTmkBZGltOEA7j");
  console.log(childFolders);

  return (
    <>
      <Navbar />
      <Container fluid>
        <AddFolder currentFolder={ folder }/>
        { childFolders.length > 0 && (
          <div classname="d-flex flex-wrap">
            { childFolders.map(childFolder => (
              <div key={childFolder.id} style={{ maxWidth: 250 }} className="p-2">
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
 
export default Dashboard;
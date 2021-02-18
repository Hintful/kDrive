import React from 'react';
import { Container } from 'react-bootstrap';
import UseFolder from '../../hooks/UseFolder';
import AddFolder from './AddFolder';
import Folder from './Folder';
import Navbar from './Navbar';
import { useParams, useLocation } from 'react-router-dom';
import FolderBreadCrumbs from './FolderBreadCrumbs';
import AddFile from './AddFile';
import File from './File';

const Dashboard = () => {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = UseFolder(folderId, state.folder);

  return (
    <>
      <Navbar />
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadCrumbs currentFolder={ folder }/>
          <AddFile currentFolder={ folder }/>
          <AddFolder currentFolder={ folder }/>
        </div>

        { childFolders.length > 0 && (
          <div classname="d-flex flex-wrap" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            { childFolders.map(childFolder => (
              <div key={childFolder.id} style={{ maxWidth: 250 }} className="p-2">
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}

        { childFolders.length > 0 && childFiles.length > 0 && <hr /> }

        { childFiles.length > 0 && (
          <div classname="d-flex flex-wrap" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            { childFiles.map(childFile => (
              <div key={childFile.id} style={{ maxWidth: 250 }} className="p-2">
                <File file={childFile} />
              </div>
            ))}
          </div>
        )}

      </Container>
    </>
  );
}
 
export default Dashboard;
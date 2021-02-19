import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ReactGA from 'react-ga';

const Folder = ({ folder }) => {
  return (
    <Button to={{
      pathname: `/folder/${folder.id}`,
      state: { folder }
    }}
      variant="outline-warning" style={{ maxWidth: 150 }} className="text-truncate" as={Link}
      onClick={() => {
        ReactGA.event({
          category: 'kDrive',
          action: 'Clicked Folder ' + folder.name
        });
      }}
    >
      <i class="fas fa-folder"></i> {folder.name}
    </Button>
  );
}
 
export default Folder;
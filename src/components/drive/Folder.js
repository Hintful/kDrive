import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Folder = ({ folder }) => {
  return (
    <Button to={`/folder/${folder.id}`} variant="outline-dark" style={{ maxWidth: 150 }} className="text-truncate" as={Link}>
      <i class="fas fa-folder"></i> {folder.name}
    </Button>
  );
}
 
export default Folder;
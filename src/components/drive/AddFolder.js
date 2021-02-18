import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { database } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext';

const AddFolder = () => {
  const [modal, setModal] = useState(false); // modal = true if modal is open, false otherwise
  const [name, setName] = useState(""); // state values for add folder name
  const [currentFolder, setCurrentFolder] = useState(null);
  const { currentUser } = useAuth();

  const toggleModal = () => {
    setModal(!modal);
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // stop refresh

    if (currentFolder == null) {
      return // must be in a folder or root
    }

    database.folders.add({
      name: name,
      parentFolderId: currentFolder.id,
      owner: currentUser.uid,
      createdAt: database.getCurrentTimestamp()
    })
    setName("");
    toggleModal();
  }
  return (
    <>
      <Button onClick={toggleModal}
        variant="outline-success"
        size="sm"
      >
        <i class="fas fa-folder-plus"></i> Add Folder
      </Button>
      <Modal
        show={modal} onHide={toggleModal}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>
                Folder Name
              </Form.Label>
              <Form.Control 
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add Folder
            </Button>
            
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
 
export default AddFolder;
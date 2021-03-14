import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { database } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext';
import { ROOT } from '../../hooks/UseFolder';
import ReactGA from 'react-ga';

const AddFolder = ({ currentFolder }) => {
  const [modal, setModal] = useState(false); // modal = true if modal is open, false otherwise
  const [name, setName] = useState(""); // state values for add folder name
  const { currentUser } = useAuth();

  const toggleModal = () => {
    setModal(!modal);
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // stop refresh

    if (currentFolder == null) {
      return
    }

    const path = [...currentFolder.path]
    if(currentFolder !== ROOT) {
      path.push({ 
        name: currentFolder.name,
        id: currentFolder.id
      })
    }

    database.folders.add({
      name: name,
      parentFolderId: currentFolder.id,
      owner: currentUser.uid,
      path: path,
      createdAt: database.getCurrentTimestamp()
    })
    setName("");
    toggleModal();
  }
  return (
    <>
      <Button
        variant="outline-success"
        size="sm"
        onClick={() => {
          toggleModal();
          ReactGA.event({
            category: 'kDrive',
            action: 'Clicked Create New Folder button'
          });
        }}
      >
        <i className="fas fa-folder-plus"></i> Create New Folder
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
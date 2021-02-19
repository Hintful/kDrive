import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { storage, database } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { ROOT } from '../../hooks/UseFolder';
import { uuid } from 'uuidv4';
import { ProgressBar, Toast } from 'react-bootstrap';
import ReactGA from 'react-ga';

const AddFile = ({ currentFolder }) => {
  const [ uploadingFiles, setUploadingFiles ] = useState([]);
  const { currentUser } = useAuth();

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (currentFolder == null || file == null) {
      return
    }

    const id = uuid(); // generate random id via uuid

    setUploadingFiles(previousUploadingFiles => [
      ...previousUploadingFiles, {
        id,
        name: file.name,
        progress: 0,
        error: false
      }
    ])

    const filePath = currentFolder === ROOT 
    ? `${currentFolder.path.map(obj => obj.name).join("/")}/${file.name}` 
    : `${currentFolder.path.map(obj => obj.name).join("/")}/${currentFolder.name}/${file.name}`

    const uploadTask = storage.ref(`/files/${currentUser.uid}/${filePath}`).put(file);

    uploadTask.on('state_changed', snapshot => {
      const progress = snapshot.bytesTransferred / snapshot.totalBytes;
      setUploadingFiles(previousUploadingFiles => {
        return previousUploadingFiles.map(uploadingFile => {
          if (uploadingFile.id === id) {
            return { ...uploadingFile, progress: progress }
          }

          return uploadingFile;
        })
      })
    }, () => {
      // err
      setUploadingFiles(previousUploadingFiles => {
        return previousUploadingFiles.map(uploadingFile => {
          if (uploadingFile.id === id) {
            return {...uploadingFile, error: true }
          } else {
            return uploadingFile;
          }
        })
      })
    }, () => {
      // complete
      setUploadingFiles(previousUploadingFiles => {
        return previousUploadingFiles.filter(uploadingFile => {
          return uploadingFile.id !== id
        })
      })

      // check if file with same name exists at the directory of upload
      // if so, overwrite
      uploadTask.snapshot.ref.getDownloadURL().then(url => {
        database.files
        .where("name", "==", file.name)
        .where("owner", "==",  currentUser.uid)
        .where("folderId", "==", currentFolder.id)
        .get()
        .then(existingFiles => {
          const existingFile = existingFiles.docs[0];
          if (existingFile) {
            existingFile.ref.update({ url });
          } else {
            database.files.add({
              url,
              name: file.name,
              createdAt: database.getCurrentTimestamp(),
              folderId: currentFolder.id,
              owner: currentUser.uid
            })
          }
        })
      })
    })
  }
  return (  
    <>
      <label className="btn btn-outline-success btn-sm m-0 mr-2"
        onClick={() => {
          ReactGA.event({
            category: 'kDrive',
            action: 'Clicked Upload File button'
          });
        }}
      >
        <i class="fas fa-cloud-upload-alt"></i> Upload File
        <input type="file" onChange={handleUpload} 
        style={{ 
          opacity: 0,
          display: "none"
        }}
        />
      </label>
      {uploadingFiles.length > 0 && 
        ReactDOM.createPortal(
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            maxWidth: 250
          }}>
            { uploadingFiles.map(file => (
              <Toast key={ file.id }
                onClose={() => {
                  setUploadingFiles(previousUploadingFiles => {
                    return previousUploadingFiles.filter(uploadingFile => {
                      return uploadingFile.id !== file.id;
                    })
                  })
                }}
              >
                <Toast.Header className="text-truncate w-100 d-block" closeButton={file.error}>
                  { file.name }
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={ !file.error}
                    variant={ file.error ? 'danger' : 'primary' }
                    now={ file.error ? 100 : file.progress * 100 }
                    label={
                      file.error ? "Error" : `${Math.round(file.progress * 100)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )
      }
    </>
  );
}
 
export default AddFile;
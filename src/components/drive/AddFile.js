import React from 'react';
import { storage, database } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { ROOT } from '../../hooks/UseFolder';

const AddFile = ({ currentFolder }) => {
  const { currentUser } = useAuth();

  const handleUpload = (e) => {
    const file = e.target.files[0];

    // if (!currentFolder || !file) {
    //   return
    // }

    if (currentFolder == null || file == null) {
      return
    }

    const filePath = currentFolder === ROOT 
    ? `${currentFolder.path.map(obj => obj.name).join("/")}/${file.name}` 
    : `${currentFolder.path.map(obj => obj.name).join("/")}/${currentFolder.name}/${file.name}`

    const uploadTask = storage.ref(`/files/${currentUser.uid}/${filePath}`).put(file);

    uploadTask.on('state_changed', snapshot => {

    }, () => {
      // err

    }, () => {
      // complete
      uploadTask.snapshot.ref.getDownloadURL().then(url => {
        // console.log(url);
        database.files.add({
          url,
          name: file.name,
          createdAt: database.getCurrentTimestamp(),
          folderId: currentFolder.id,
          owner: currentUser.uid
        })
      })
    })
  }
  return (  
    <label className="btn btn-outline-success btn-sm m-0 mr-2">
      <i class="fas fa-cloud-upload-alt"></i> Upload File
      <input type="file" onChange={handleUpload} 
      style={{ 
        opacity: 0,
        // position: "absolute",
        // top: -500
        display: "none"
      }}
      />
    </label>
  );
}
 
export default AddFile;
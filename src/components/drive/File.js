/* eslint-disable react/jsx-no-target-blank */
import React from 'react';

const File = ({ file }) => {
  return (  
    <a href={file.url} target="_blank" style={{ maxWidth: 200 }} className="btn btn-outline-primary text-truncate">
      <i class="fas fa-file-alt"></i> { file.name }
    </a>
  );
}
 
export default File;

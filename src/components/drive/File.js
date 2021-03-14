/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import ReactGA from 'react-ga';

const File = ({ file }) => {
  return (  
    <a href={file.url} target="_blank" style={{ maxWidth: 200 }} className="btn btn-outline-primary text-truncate"
      onClick={() => {
        ReactGA.event({
          category: 'kDrive',
          action: 'Clicked on file ' + file
        });
      }}
    >
      <i className="fas fa-file-alt"></i> { file.name }
    </a>
  );
}
 
export default File;

import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROOT } from '../../hooks/UseFolder';

const FolderBreadCrumbs = ({ currentFolder }) => {
  let path = currentFolder === ROOT ? [] : [ROOT]
  if (currentFolder) {
    path = [...path, ...currentFolder.path]
  }

  return (
    <Breadcrumb className="flex-grow-1 m-0" listProps={{ className: "bg-white pl-0 m-0" }}>

      {path.map((folder, index) => (
        <Breadcrumb.Item className="text-truncate d-inline-block" style={{ maxWidth: 150 }} 
          key={folder.id} linkAs={Link} 
          linkProps={{ 
            to: {
              pathname: folder.id ? `/folder/${folder.id}` : '/',
              state: { folder: {...folder, path: path.slice(1, index) }}
            }
          }}
        >
          { folder.name }
        </Breadcrumb.Item>
      ))}

      { currentFolder && (
        <Breadcrumb.Item className="text-truncate d-inline-block" style={{ maxWidth: 200 }} active>
          { currentFolder.name }
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}
 
export default FolderBreadCrumbs;
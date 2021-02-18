import { useEffect, useReducer } from "react";

const ACTIONS = {
  SELECT_FOLDER: 'select-folder'
}

// root folder
const ROOT = {
  name: "Root",
  id: null,
  path: []
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: []
      }
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder
      }

    default:
      return state
  }
}

const UseFolder = (folder = null, folderId = null) => {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: []
  })

  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: { folderId, folder }
    });
  }, [folderId, folder])

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT }
      })
    }
  }, [folderId])

  return state;
}
 
export default UseFolder;
import { useEffect, useReducer } from "react";
import { useAuth } from "../contexts/AuthContext";
import { database } from "../firebase";

const ACTIONS = {
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: 'update-folder',
  SET_CHILD_FOLDERS: 'set-child-folders'
}

// root folder
export const ROOT = {
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
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders
      }

    default:
      return state
  }
}

export function UseFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: []
  })
  const { currentUser } = useAuth();

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

    database.folders.doc(folderId).get()
    .then(doc => {
      dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: database.formatDoc(doc) }
      })
      console.log(database.formatDoc(doc))
    }).catch(() => {
      // folder get error
      dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT }
      })
    })
  }, [folderId])

  useEffect(() => {
    return database.folders.where("parentFolderId", "==", folderId).where("owner", "==", currentUser.uid)
    .orderBy("createdAt")
    .onSnapshot(snapshot => {
      dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: { childFolders: snapshot.docs.map(database.formatDoc) }
      })
    })
  }, [folderId, currentUser])

  return state;
}
 
export default UseFolder;
import { combineReducers } from 'redux'
import foldersTree from './foldersTree'
import snackbar from './snackbar'

export default combineReducers({
    tree: foldersTree,
    app: snackbar
})

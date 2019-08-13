import { combineReducers } from 'redux'
import foldersTree from './foldersTree'
import selected from './selected'
import snackbar from './snackbar'

export default combineReducers({
    tree: foldersTree,
    selected: selected,
    app: snackbar
})

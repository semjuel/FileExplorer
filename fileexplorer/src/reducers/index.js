import { combineReducers } from 'redux'
import selected from './selected'
import snackbar from './snackbar'
import tree from './tree'
import files from './files'
import modalStatus from './modal'
import view from './view'

export default combineReducers({
    selected: selected,
    app: snackbar,
    tree: tree,
    files: files,
    modalStatus: modalStatus,
    view: view,
})

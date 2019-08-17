import { combineReducers } from 'redux'
import foldersTree from './foldersTree'
import selected from './selected'
import snackbar from './snackbar'
import node from './node'

export default combineReducers({
    tree: foldersTree,
    selected: selected,
    app: snackbar,
    node: node
})

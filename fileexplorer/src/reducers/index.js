import { combineReducers } from 'redux'
import selected from './selected'
import snackbar from './snackbar'
import tree from './tree'

export default combineReducers({
    selected: selected,
    app: snackbar,
    tree: tree
})

import { combineReducers } from 'redux'
import todos from './todos'
import snackbar from './snackbar'

export default combineReducers({
    todos,
    snackbar
})

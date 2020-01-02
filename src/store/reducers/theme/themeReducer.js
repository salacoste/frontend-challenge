import { handleActions, createAction } from 'redux-actions'
import Immutable from 'seamless-immutable'
import axios from 'axios'


export default themeReducer(state, action){
  switch (action.type) {
    case 'theme_change':
      return true
      break;
  
    default:
      return false
      break;
  }
}
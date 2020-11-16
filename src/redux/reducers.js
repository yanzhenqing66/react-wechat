import { combineReducers } from 'redux'

const A = (state = 0, action) => {
  return state
}

const B = (state = 0, action) => {  
  return state
}

export default combineReducers({
  A,
  B
})
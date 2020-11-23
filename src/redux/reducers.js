import { combineReducers } from 'redux'

import {AUTH_SUCCESS, AUTH_ERR, USER_INFO_UPDATE, USER_INFO_UPD_ERR} from './action-type'
import {goRedirect} from '../utils/route'

/**
 * 登录注册
 * 完善信息
 */
let initUser = {
  username: '',
  user_type: '',
  msg: '',
  redirectTo: ''
}
const userReducer = (state = initUser, action) => {
  switch(action.type) {
    case AUTH_SUCCESS:
      const {header, user_type } = action.data
      return {...state, ...action.data, redirectTo: goRedirect(user_type, header)}
    case AUTH_ERR:
      return {...state, msg: action.data}
    case USER_INFO_UPDATE:
      return {...state, ...action.data}
    case USER_INFO_UPD_ERR:
      return {...initUser, msg: action.data}
    default:
      return state
  }
}


export default combineReducers({
  userReducer,
})


import {AUTH_SUCCESS, AUTH_ERR, USER_INFO_UPDATE, USER_INFO_UPD_ERR} from './action-type'

import {reqLogin, reqRegister, reqUpdateUserInfo, reqUser} from '../api'
/**
 * 登录注册
 */
export const authSuccess = user => ({type: AUTH_SUCCESS, data: user})
export const errMsg = err => ({type: AUTH_ERR, data: err})
/**
 * 更新用户信息
 */
export const userInfoUpd = user => ({type: USER_INFO_UPDATE, data: user})
export const userInfoUpdErr = msg => ({type: USER_INFO_UPD_ERR, data: msg})

// 异步action，注册
export function registerAction(user) {
  const {username, password, type, password2} = user
  
  return async dispatch => {

    const res = await reqRegister({username, password, password2, user_type: type})
    if(res.code === 0) {
      dispatch(authSuccess(res.data))
    }else {
      dispatch(errMsg(res.msg))
    }
  }
}
// 异步action，登录
export function loginAction(user) {
  return async dispatch => {
    const res = await reqLogin(user)
    if(res.code === 0) {
      dispatch(authSuccess(res.data))
    }else {
      dispatch(errMsg(res.msg))
    }
  }
}
// 更新用户信息
export function updateInfoAction(user) {
  return async dispatch => {
    const res = await reqUpdateUserInfo(user)
    if(res.code === 0) {
      dispatch(userInfoUpd(res.data))
    }else {
      dispatch(userInfoUpdErr(res.msg))
    }
  }
}

// 获取用户
export function getUserAction() {
  return async dispatch => {
    const res = await reqUser()
    if(res.code === 0) {
      dispatch(userInfoUpd(res.data))
    }else {
      dispatch(userInfoUpdErr(res.msg))
    }
  }
}
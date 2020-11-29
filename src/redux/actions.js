import io from 'socket.io-client'

import {
  AUTH_SUCCESS, 
  AUTH_ERR, 
  USER_INFO_UPDATE, 
  USER_INFO_UPD_ERR, 
  RECEIVE_USER_LIST
} from './action-type'

import {reqLogin, reqRegister, reqUpdateUserInfo, reqUser, reqUserList} from '../api'
/**
 * 登录注册
 */
const authSuccess = user => ({type: AUTH_SUCCESS, data: user})
const errMsg = err => ({type: AUTH_ERR, data: err})
/**
 * 更新用户信息
 */
const userInfoUpd = user => ({type: USER_INFO_UPDATE, data: user})
export const userInfoUpdErr = msg => ({type: USER_INFO_UPD_ERR, data: msg})
/**
 * 获取用户列表
 */
const receiveUserList = userList => ({type: RECEIVE_USER_LIST, data: userList})

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

// 获取用户列表
export function getUserListAction(user_type) {
  return async dispatch => {
    let res = await reqUserList({user_type})
    if(res.code === 0) {
      dispatch(receiveUserList(res.data))
    }
  } 
}

/**
 * 消息通信
 */
function initIO() {
  if(!io.socket) {  // 判断是否存在连接服务器的单例对象
    io.socket = io('wx://localhost:5000')
    io.socket.on('receiveMsg', (chatMsg) => {
      console.log('就收服务器消息', chatMsg);
    })
  }
}

// 发送消息
export function sendMsg({from_id, to_id, content}) {
  return dispatch => {
    initIO()
    io.socket.emit('sendMsg', {from_id, to_id, content})
  }
}
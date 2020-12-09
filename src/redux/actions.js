import io from 'socket.io-client'

import {
  AUTH_SUCCESS,
  AUTH_ERR,
  USER_INFO_UPDATE,
  USER_INFO_UPD_ERR,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_ONE_MSG,
  MSG_READ
} from './action-type'

import {
  reqLogin,
  reqRegister,
  reqUpdateUserInfo,
  reqUser,
  reqUserList,
  reqChatMsg,
  reqReadMsg
} from '../api'

/**
 * 登录注册
 */
const authSuccess = user => ({ type: AUTH_SUCCESS, data: user })
const errMsg = err => ({ type: AUTH_ERR, data: err })

// 异步action，注册
export function registerAction(user) {
  const { username, password, type, password2 } = user
  return async dispatch => {
    const res = await reqRegister({ username, password, password2, user_type: type })
    if (res.code === 0) {
      const {_id} = res.data
      getMsgList(dispatch, _id)
      dispatch(authSuccess(res.data))
    } else {
      dispatch(errMsg(res.msg))
    }
  }
}
// 异步action，登录
export function loginAction(user) {
  return async dispatch => {
    const res = await reqLogin(user)
    if (res.code === 0) {
      const {_id} = res.data
      getMsgList(dispatch, _id)
      dispatch(authSuccess(res.data))
    } else {
      dispatch(errMsg(res.msg))
    }
  }
}

/**
 * 更新用户信息
 */
const userInfoUpd = user => ({ type: USER_INFO_UPDATE, data: user })
export const userInfoUpdErr = msg => ({ type: USER_INFO_UPD_ERR, data: msg })

// 异步更新用户信息
export function updateInfoAction(user) {
  return async dispatch => {
    const res = await reqUpdateUserInfo(user)
    if (res.code === 0) {
      dispatch(userInfoUpd(res.data))
    } else {
      dispatch(userInfoUpdErr(res.msg))
    }
  }
}

// 异步获取用户
export function getUserAction() {
  return async dispatch => {
    const res = await reqUser()
    if (res.code === 0) {
      const {_id} = res.data
      getMsgList(dispatch, _id)
      dispatch(userInfoUpd(res.data))
    } else {
      dispatch(userInfoUpdErr(res.msg))
    }
  }
}

/**
 * 获取用户列表
 */
const receiveUserList = userList => ({ type: RECEIVE_USER_LIST, data: userList })

// 异步获取用户列表
export function getUserListAction(user_type) {
  return async dispatch => {
    let res = await reqUserList({ user_type })
    if (res.code === 0) {
      dispatch(receiveUserList(res.data))
    }
  }
}


/**
 * 接收消息
 * 接收一条消息
 * 同步消息
 */
const receiveMsgList = data => ({ type: RECEIVE_MSG_LIST, data })
const receiveOneMsg = data => ({ type: RECEIVE_ONE_MSG, data })
const msgRead = data => ({ type: MSG_READ, data })

/**
 * 初始化消息通信
 * 连接服务器
 * 返回监听接收信息，chatMsg
 */
function initIO(dispatch, userid) {
  if (!io.socket) {  // 判断是否存在连接服务器的单例对象
    io.socket = io()  // 'ws://localhost:5000'
    io.socket.on('receiveMsg', (chatMsg) => {
      console.log('接收服务器消息', chatMsg)
      // 只有chatMsg的里的用户信息，与当前用户的信息相同时，才会分发action，接受消息
      // debugger
      if (userid === chatMsg.from_id || userid === chatMsg.to_id) {
        dispatch(receiveOneMsg({chatMsg, userid}))
      }
    })
  }
}

/**
 * 获取用户的所有聊天信息
 * 登录/注册/获取用户列表成功后调用
 */
async function getMsgList(dispatch, userid) {
  initIO(dispatch, userid)
  const res = await reqChatMsg()
  if (res.code === 0) {
    const { chatMsgs, users } = res.data
    dispatch(receiveMsgList({ chatMsgs, users, userid }))
  }
}


// 发送消息
export function sendMsg({ from_id, to_id, content }) {
  return dispatch => {
    // initIO()
    io.socket.emit('sendMsg', { from_id, to_id, content })
  }
}

// 消息已读异步action
export const readMsg = (from_id, to_id) => {
  return async dispatch => {
    const res = await reqReadMsg({from_id})
    if (res.code === 0) {
      const count = res.data
      dispatch(msgRead({ from_id, to_id, count }))
    }
  }
}
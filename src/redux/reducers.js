import { combineReducers } from 'redux'

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
import { goRedirect } from '../utils/route'

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
  switch (action.type) {
    case AUTH_SUCCESS:
      const { header, user_type } = action.data
      return { ...state, ...action.data, redirectTo: goRedirect(user_type, header) }
    case AUTH_ERR:
      return { ...initUser, msg: action.data }
    case USER_INFO_UPDATE:
      return action.data
    case USER_INFO_UPD_ERR:
      return { ...initUser, msg: action.data }
    default:
      return state
  }
}

/**
 * 用户列表
 */
let initUserList = []
function userListReducer(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return [...action.data]
    default:
      return state
  }
}

// 聊天
const initChat = {
  chatMsgs: [], // 消息数组 [{from: id1, to: id2}{}]
  users: {}, // 所有用户的集合对象{id1: user1, id2: user2}
  unReadCount: 0 // 未读消息的数量
}
function chatReducer(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:
      const { chatMsgs, users, userid } = action.data
      return {
        chatMsgs,
        users,
        unReadCount: chatMsgs.reduce((preTotal, msg) => { // 别人发给我的多个未读消息
          return preTotal + (!msg.read && msg.to_id === userid ? 1 : 0)
        }, 0)
      }
    case RECEIVE_ONE_MSG:
      const {chatMsg} = action.data
      return {
        chatMsgs: [...state.chatMsgs, chatMsg],
        users: state.users,
        unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to_id === action.data.userid ? 1 : 0)
      }
    case MSG_READ:
      const { count, from_id, to_id } = action.data
      // debugger
      return {
        chatMsgs: state.chatMsgs.map(msg => {
          if (msg.from_id === from_id && msg.to_id === to_id && !msg.read) {
            // msg.read = true // 不能直接修改状态
            return { ...msg, read: true }
          } else {
            return msg
          }
        }),
        users: state.users,
        unReadCount: state.unReadCount - count
      }
    default:
      return state
  }
}


export default combineReducers({
  userReducer,
  userListReducer,
  chatReducer
})


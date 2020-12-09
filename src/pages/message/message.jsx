import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

/*得到所有聊天的最后 msg 组成的数组
    [msg1, msg2, msg3..]
 1. 使用{}进行分组(chat_id), 只保存每个组最后一条 msg: {chat_id1: lastMsg1, chat_id2:lastMsg2}
 2. 得到所有分组的 lastMsg 组成数组: Object.values(lastMsgsObj) [lastMsg1, lastMsg2]
 3. 对数组排序(create_time, 降序)
*/
function getLastMsgs(chatMsgs, userid) {
  const lastMsgsObj = {}
  chatMsgs.forEach(msg => {
    if( !msg.read && msg.to_id === userid) {
      msg.unReadCount = 1
    }else {
      msg.unReadCount = 0
    }
    const chatId = msg.chat_id
    const lastMsg = lastMsgsObj[chatId]
    if (!lastMsg) {
      lastMsgsObj[chatId] = msg
    } else {
      const unReadCount = lastMsg.unReadCount + msg.unReadCount
      if (msg.create_time > lastMsg.create_time) {
        lastMsgsObj[chatId] = msg
      }
      lastMsgsObj[chatId].unReadCount = unReadCount
    }
  })
  const lastMsgs = Object.values(lastMsgsObj)
  // 3. 对数组排序(create_time, 降序)
  lastMsgs.sort((msg1, msg2) => {
    return msg2.create_time - msg1.create_time
  })
  return lastMsgs
}
class Message extends Component {
  render() {
    const { user, chat } = this.props
    // 得到当前用户的 id
    const meId = user._id
    // 得到所用用户的集合对象 users 和所有聊天的数组
    const { users, chatMsgs } = chat
    // 得到所有聊天的最后消息的数组
    const lastMsgs = getLastMsgs(chatMsgs, meId)
    return (
      <List style={{ marginTop: 50, marginBottom: 50 }}>
        {
          lastMsgs.map(msg => {
            const targetId = msg.from_id === meId ? msg.to_id : msg.from_id
            const targetUser = users[targetId]
            const avatarImg = targetUser.header ? 
              require(`../../assets/images/header/${targetUser.header}.png`).default : null
            return (
              <Item
                key={msg._id}
                extra={<Badge text={msg.unReadCount} />}
                thumb={avatarImg}
                arrow='horizontal'
                onClick={() => this.props.history.push(`/chat/${targetId}`)}
              >
                {msg.content}
                <Brief>{targetUser.username}</Brief>
              </Item>
            )
          })
        }
      </List>
    )
  }
}
export default connect(
  state => ({
    user: state.userReducer,
    chat: state.chatReducer
  })
)(Message)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem, Icon } from 'antd-mobile'
import { sendMsg } from '../../redux/actions'

import './chat.less'
const Item = List.Item

class Chat extends Component {

  state = {
    content: ''
  }

  handleSend = () => {
    const from_id = this.props.userReducer._id
    const to_id = this.props.match.params.userId
    const content = this.state.content.trim()
    if (content) {
      this.props.sendMsg({ from_id, to_id, content })
      this.setState({ content: '' })
    }
  }

  componentDidMount() {
    // 初始消息显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }
  componentDidUpdate() {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }

  render() {
    const { userReducer } = this.props
    const { chatMsgs, users } = this.props.chatReducer
    const targetId = this.props.match.params.userId
    if (!users[targetId]) {
      return null
    }
    const meId = userReducer._id
    const chatId = [targetId, meId].sort().join('_')
    // chat_id 根据对应消息，取出对应的消息
    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
    const targetIcon = users[targetId] ?
      require(`../../assets/images/header/${users[targetId].header}.png`).default : null

    return (
      <div id='chat-page'>
        <NavBar
          className="stick-top"
          icon={<Icon type='left' />}
          onLeftClick={() => this.props.history.goBack()}
        >{users[targetId].username}</NavBar>
        <List style={{marginTop: 50, marginBottom: 50}}>
          {
            msgs.map(msg => {
              if (msg.from_id === targetId) {
                return (
                  <Item
                    key={msg._id}
                    thumb={targetIcon}
                  >
                    {msg.content}
                  </Item>
                )
              } else {
                return (
                  <Item
                    key={msg._id}
                    className='chat-me'
                    extra='我'
                  >
                    {msg.content}
                  </Item>
                )
              }
            })
          }
        </List>
        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            value={this.state.content}
            onChange={val => this.setState({ content: val })}
            extra={
              <span onClick={this.handleSend}>发送</span>
            }
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({ userReducer: state.userReducer, chatReducer: state.chatReducer }),
  { sendMsg }
)(Chat)
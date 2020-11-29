import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavBar, List, InputItem } from 'antd-mobile'
import {sendMsg} from '../../redux/actions'

import './chat.less'
const Item = List.Item

class Chat extends Component {

  state = {
    content: ''
  }

  handleSend = () => {
    const from_id = this.props.userReducer._id
    const to_id = this.props.match.params.userId
    const { content } = this.state
    if(content) {
      this.props.sendMsg({from_id, to_id, content})
    }
  }

  render() {
    return (
      <div id='chat-page'>
        <NavBar>aa</NavBar>
        <List>
          <Item
            thumb={require('../../assets/images/header/头像1.png').default}
          >
            你好
          </Item>
          <Item
            thumb={require('../../assets/images/header/头像1.png').default}
          >
            你好 2
          </Item>
          <Item
            className='chat-me'
            extra='我'
          >
            很好
          </Item>
          <Item
            className='chat-me'
            extra='我'
          >
            很好 2
          </Item>
        </List>
        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            value={this.state.content}
            onChange={val => this.setState({content: val})}
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
  state => ({userReducer: state.userReducer}),
  {sendMsg}
)(Chat)
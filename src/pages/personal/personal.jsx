import React, { Component } from 'react'
import { Result, List, Button, Modal, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'

import { userInfoUpdErr } from '../../redux/actions'

const Item = List.Item
const Brief = List.Item.Brief

class Personal extends Component {

  logout = () => {
    Modal.alert('退出', '确定退出登录吗？', [
      { text: '取消', onPress: () => Toast.info('取消退出') },
      {
        text: '确定',
        onPress: () => {
          Cookies.remove('token')
          this.props.userInfoUpdErr()
        }
      },
    ])
  }

  render() {
    const { header, username, company, post, info, salary } = this.props.userReducer
    return (
      <div>
        <Result
          img={<img src={require(`../../assets/images/header/${header}.png`).default} style={{ width: 50, height: 50 }} alt='header' />}
          title={username}
          message={company}></Result>
        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            {post ? <Brief>职位：{post}</Brief> : null}
            {info ? <Brief>简介：{info}</Brief> : null}
            {salary ? <Brief>薪资：{salary}</Brief> : null}
          </Item>
          <Item>
            <Button type="warning" onClick={this.logout}>退出登录</Button>
          </Item>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({ userReducer: state.userReducer }),
  { userInfoUpdErr }
)(Personal)

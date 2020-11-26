import React, { Component } from 'react'
import { NavBar, WingBlank, List, InputItem, Radio, Button, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { registerAction } from '../../redux/actions'
import Logo from '../../components/logo/logo'

class Register extends Component {

  state = {
    username: '',
    password: '',
    password2: '',
    type: 'job'
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  register = () => {
    this.props.registerAction(this.state)
    let { msg } = this.props.userReducer
    if (msg) {
      Toast.fail(msg)
      return {msg: ''}
    }
  }

  render() {
    const { redirectTo } = this.props.userReducer
    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }
    const { type } = this.state
    return (
      <div>
        <NavBar>BOSS&nbsp;直&nbsp;聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            <InputItem
              clear
              placeholder="请输入用户名"
              onChange={val => this.handleChange('username', val)}
            >用户:</InputItem>
            <InputItem
              clear
              type="password"
              placeholder="请输入密码"
              onChange={val => this.handleChange('password', val)}
            >密码:</InputItem>
            <InputItem
              clear
              type="password"
              placeholder="请确认密码"
              onChange={val => this.handleChange('password2', val)}
            >确认密码:</InputItem>
            <List.Item>
              注册类型:
            <Radio checked={type === 'job'} style={{ marginLeft: 20 }} onChange={() => this.handleChange('type', 'job')}>求职</Radio>
              <Radio checked={type === 'boss'} style={{ marginLeft: 20 }} onChange={() => this.handleChange('type', 'boss')}>BOSS</Radio>
            </List.Item>
            <Button type='primary' onClick={this.register}>
              注册
          </Button>
            <Button onClick={() => this.props.history.push('/login')}>
              已有账号
          </Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({ userReducer: state.userReducer }),
  { registerAction }
)(Register) 
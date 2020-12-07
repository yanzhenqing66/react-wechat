import React, { Component } from 'react'
import { NavBar, WingBlank, List, InputItem, Button, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { loginAction } from '../../redux/actions'
import Logo from '../../components/logo/logo'

class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  login = () => {
    this.props.loginAction(this.state)
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
              placeholder="请输入密码"
              onChange={val => this.handleChange('password', val)}
              type="password"
            >密码:</InputItem>
            <Button type='primary' onClick={this.login}>
              登录
          </Button>
            <Button onClick={() => this.props.history.push('/register')}>
              注册账号
          </Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({ userReducer: state.userReducer }),
  { loginAction }
)(Login)
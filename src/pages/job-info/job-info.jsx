import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button, List, Toast } from 'antd-mobile'
import {connect} from 'react-redux'

import {updateInfoAction} from '../../redux/actions'
import SelHeader from '../../components/sel-header/sel-header'
import { Redirect } from 'react-router-dom'

class JobInfo extends Component {

  state = {
    header: '',  // 头像
    post: '',    // 招聘职位
    info: '',    // 职位要求
  }

  setHeader = (header) => {
    this.setState({
      header
    })
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  updateUser = () => {
    this.props.updateInfoAction(this.state)
    let {msg} = this.props.userReducer
    if(msg) {
      Toast.fail(msg)
      return {msg: ''}
    }
  }

  render() {
    const {header, user_type} = this.props.userReducer
    let path
    if(user_type) {
      path = user_type === 'boss' ? '/main/boss' : '/main/job'
    }
    if(header) {
      return <Redirect to={path} />
    }

    return (
      <div>
        <NavBar>求职信息完善</NavBar>
        <SelHeader setHeader={this.setHeader}></SelHeader>
        <List>
          <InputItem placeholder="请输入求职岗位" onChange={val => this.handleChange('post', val)}>求职岗位:</InputItem>
          <TextareaItem title="个人介绍:"
            rows={3}
            onChange={val => this.handleChange('info', val)}
            placeholder="请输入个人介绍"
          />
          <Button type='primary' onClick={this.updateUser}>保存</Button>
        </List>
      </div>
    )
  }

}

export default connect(
  state => ({userReducer: state.userReducer}),
  {updateInfoAction}
)(JobInfo)
import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button, List, Toast } from 'antd-mobile'
import {connect} from 'react-redux'

import SelHeader from '../../components/sel-header/sel-header'
import { updateInfoAction } from '../../redux/actions'
import { Redirect } from 'react-router-dom'

class BossInfo extends Component {

  state = {
    header: '',  // 头像
    post: '',    // 招聘职位
    company: '', // 公司名称
    salary: '',  // 薪资
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
        <NavBar>BOSS信息完善</NavBar>
        <SelHeader setHeader={this.setHeader}></SelHeader>
        <List>
          <InputItem placeholder="请输入招聘职位" onChange={val => this.handleChange('post', val)}>招聘职位:</InputItem>
          <InputItem placeholder="请输入公司名称" onChange={val => this.handleChange('company', val)}>公司名称:</InputItem>
          <InputItem placeholder="请输入职位薪资" onChange={val => this.handleChange('salary', val)}>职位薪资:</InputItem>
          <TextareaItem title="职位要求:"
            rows={3}
            onChange={val => this.handleChange('info', val)}
            placeholder="请输入职位要求"
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
)(BossInfo)
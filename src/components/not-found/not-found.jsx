import React, { Component } from 'react'
import { Button } from 'antd-mobile'

export default class NotFound extends Component {

  backMain = () => {
    this.props.history.replace('/')
  }

  render() {
    return (
      <div>
        <h2>没有找到此页面</h2>
        <Button type='primary' onClick={this.backMain}>回到主页</Button>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'

export default class SelHeader extends Component {
  constructor(props) {
    super(props)

    this.headerList = []
    for (var i = 0; i < 20; i++) {
      let text = `头像${i + 1}`
      this.headerList.push({
        text,
        icon: require(`../../assets/images/header/${text}.png`)
      })
    }

    this.state = {
      icon: null,
    }
  }


  selHeader = (el) => {
    const { text, icon } = el
    this.setState({
      icon: icon
    })
    this.props.setHeader(text)
  }


  render() {
    const title = this.state.icon ? (
      <p>
        <span>您选择的头像：</span>
        <img src={this.state.icon} alt="header" />
      </p>
    ) : '请选择头像'

    return (
      <List renderHeader={() => title}>
        <Grid
          data={this.headerList}
          columnNum={5}
          onClick={(el) => this.selHeader(el)}
        ></Grid>
      </List>
    )
  }
}

import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const Item = TabBar.Item

class TabBarFooter extends Component {

  static propTypes = {
    navList: PropTypes.array.isRequired
  }

  render() {
    let navList = this.props.navList.filter(nav => !nav.hide)
    const path = this.props.location.pathname
    const {unReadCount} = this.props.chatReducer
    return (
      <TabBar>
        {
          navList.map(nav => (
            <Item
              key={nav.path}
              badge={nav.path === '/message' ? unReadCount : 0}
              title={nav.text}
              icon={{ uri: require('../../assets/images/nav/'+ nav.icon +'.png').default }}
              selectedIcon={{ uri: require('../../assets/images/nav/'+ nav.icon +'-selected.png').default }}
              selected={nav.path === path}
              onPress={() => this.props.history.push(nav.path)}
            />
          ))
        }
      </TabBar>
    )
  }
}

export default withRouter(connect(
  state => ({chatReducer: state.chatReducer})
)(TabBarFooter))

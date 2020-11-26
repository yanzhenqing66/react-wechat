import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getUserListAction} from '../../redux/actions'

import UserList from '../../components/user-list/user-list'

class Boss extends Component {

  componentDidMount() {
    this.props.getUserListAction('job')
  }

  render() {
    return (
      <div>
        <UserList userList={this.props.userListReducer}></UserList>
      </div>
    )
  }
}

export default connect(
  state => ({userListReducer: state.userListReducer}),
  {getUserListAction}
)(Boss)
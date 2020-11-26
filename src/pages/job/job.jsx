import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getUserListAction} from '../../redux/actions'

import UserList from '../../components/user-list/user-list'

class Job extends Component {

  componentDidMount() {
    this.props.getUserListAction('boss')
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
)(Job)
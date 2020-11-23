import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import {connect} from 'react-redux'

import {goRedirect} from '../../utils/route'
import {getUserAction} from '../../redux/actions'

import BossInfo from '../boss-info/boss-info'
import JobInfo from '../job-info/job-info'
import Boss from '../boss/boss'
import Job from '../job/job'

class Main extends Component {

  componentDidMount() {
    const token = Cookies.get('token')
    const {_id} = this.props.userReducer
    if(token && !_id) {
      this.props.getUserAction()
    }
  }

  render() {
    const token = Cookies.get('token')
    if (!token) {
      return <Redirect to='/login' />
    }
    const {_id, user_type, header} = this.props.userReducer
    if(!_id) {
      return null
    } 
    
    let path = this.props.location.pathname
    if(path === '/') {
      path = goRedirect(user_type, header)
      return <Redirect to={path} />
    }

    return (
      <Switch>
        <Route path='/bossinfo' component={BossInfo} />
        <Route path='/jobinfo' component={JobInfo} />
        <Route path='/job' component={Job} />
        <Route path='/boss' component={Boss} />
      </Switch>
    )
  }
}

export default connect(
  state => ({userReducer: state.userReducer}),
  {getUserAction}
)(Main)
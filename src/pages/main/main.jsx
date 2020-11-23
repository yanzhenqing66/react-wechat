import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

import BossInfo from '../boss-info/boss-info'
import JobInfo from '../job-info/job-info'
import Boss from '../boss/boss'
import Job from '../job/job'

class Main extends Component {

  render() {
    let token = Cookies.get('token')
    if (!token) {
      return <Redirect to='/login' />
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

export default Main
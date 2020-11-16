import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Register from './pages/register/register'
import Main from './pages/main/main'
import Login from './pages/login/login'

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/register' component={Register}></Route>
          <Route path='/login' component={Login}></Route>
          <Route component={Main}></Route>
        </Switch>
      </HashRouter>
    )
  }
}

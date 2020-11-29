import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'

import { goRedirect } from '../../utils/route'
import { getUserAction } from '../../redux/actions'

import BossInfo from '../boss-info/boss-info'
import JobInfo from '../job-info/job-info'
import Boss from '../boss/boss'
import Job from '../job/job'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import TabBar from '../../components/tab-bar/tab-bar'
import Chat from '../chat/chat'

import './main.less'

class Main extends Component {

  navList = [
    {
      path: '/boss',
      component: Boss,
      title: '求职列表',
      icon: 'dashen',
      text: '求职',
    },
    {
      path: '/job',
      component: Job,
      title: 'BOSS 列表',
      icon: 'laoban',
      text: 'BOSS',
    },
    {
      path: '/message',
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal',
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]

  componentDidMount() {
    const token = Cookies.get('token')
    const { _id } = this.props.userReducer
    if (token && !_id) {
      this.props.getUserAction()
    }
  }

  render() {
    const token = Cookies.get('token')
    if (!token) {
      return <Redirect to='/login' />
    }
    const { _id, user_type, header } = this.props.userReducer
    if (!_id) {
      return null
    }

    let path = this.props.location.pathname
    if (path === '/') {
      path = goRedirect(user_type, header)
      return <Redirect to={path} />
    }

    const { navList } = this
    let curNav = navList.find(nav => nav.path === path)

    if (curNav) {
      if (user_type === 'boss') {
        navList[0].hide = true
      } else {
        navList[1].hide = true
      }
    }

    return (
      <div>
        {
          curNav ? <NavBar>{curNav.title}</NavBar> : null
        }
        <Switch>
          {
            navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component} />)
          }
          <Route path='/bossinfo' component={BossInfo} />
          <Route path='/jobinfo' component={JobInfo} />
          <Route path='/chat/:userId' component={Chat} />
          <Route component={NotFound} />
        </Switch>
        {
          curNav ? <TabBar navList={navList}></TabBar> : null
        }
      </div>

    )
  }
}

export default connect(
  state => ({ userReducer: state.userReducer }),
  { getUserAction }
)(Main)
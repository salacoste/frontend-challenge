import React, { PureComponent, useContext } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import MainPage from 'src/pages/main/MainPageContainer'
import MainLayout from 'src/layouts/MainLayout'

import ExpensePage from 'src/pages/expense/ExpensePage'

import NotFound from 'src/pages/404/404'
import {Route as R} from 'react-router-dom'

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => {
    console.log('AppRoute component props (router.js)', props, rest)

    return (
      <Layout>
        <Component {...props} {...rest} />
      </Layout>
    )
  }} />
)

export class Routes extends PureComponent {
 

  render () {
    return (
 
        <Switch>
          <AppRoute exact path='/' layout={MainLayout} component={MainPage} />
          <AppRoute exact path='/:id' layout={MainLayout} component={ExpensePage} />
          {/* <AppRoute exact path='/daypicker' layout={DayPickerLayout} component={DayPicker}/> */}
          {/* <AppRoute path='/allcomments/:id' layout={MainLayout} component={AllComments}/> */}
          {/* <AppRoute path='/allcomments/' layout={MainLayout} component={AllComments}/> */}
          <R component={NotFound}/>
        </Switch>
    )
  }
}

export default withRouter(Routes)

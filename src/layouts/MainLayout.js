import React, { PureComponent } from 'react'
import styled from 'styled-components'
import * as Bootstrap from 'react-bootstrap'
import NavBarElement from '../elements/navbar/Navbar'
import {ThemeContext, themes} from '../context/Context'


let {Navbar, Nav, Form, FormControl, Button, NavDropdown, Row, Container, NavItem} = Bootstrap

class MainLayout extends PureComponent {

  state = {
    activeTheme: 'dark'
  }
  changeTheme = ()=> {
    this.state.activeTheme === 'dark' ? this.setState({activeTheme: 'light'}) : this.setState({activeTheme: 'dark'})
  }

  render () {
    console.log('MainLayout props', this.props)
    return (
      <Wrapper >
          <ThemeContext.Provider value={{themes, changeTheme: this.changeTheme, ...this.state, '2': 2}}>
            <NavBarElement/>
          <main>
          { this.props.children }
          </main>
          </ThemeContext.Provider>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  height: 100%,
`

export default MainLayout

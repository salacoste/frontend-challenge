import React, { PureComponent, Fragment, useContext } from 'react'
// import PropTypes from 'prop-types'
import * as Bootstrap from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {withRouter} from 'react-router-dom'
import {ThemeContext} from '../../context/Context'

let {Navbar, Nav, Button, NavDropdown, Row, Container, NavItem} = Bootstrap



class NavBarElement extends PureComponent {
  render() {
    return (
      <ThemeContext.Consumer>
      {(props)=> {
        return (<Fragment>
                    <Navbar bg={props.activeTheme} expand="sm" variant={props.activeTheme}  collapseOnSelect>
                      <Navbar.Brand>Expense report page</Navbar.Brand>
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                          <LinkContainer exact to='/'>
                            <Nav.Link>Home</Nav.Link>
                          </LinkContainer>
                        </Nav>
                      </Navbar.Collapse>
                    </Navbar>
            </Fragment>)
      }
    }
      </ThemeContext.Consumer>
    )
            
  }
}

export default withRouter(NavBarElement)
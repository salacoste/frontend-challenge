import React, { PureComponent } from 'react'
import styled from 'styled-components'
import * as Bootstrap from 'react-bootstrap'
import NavBarElement from '../elements/navbar/Navbar'
let {Navbar, Nav, Form, FormControl, Button, NavDropdown, Row, Container} = Bootstrap

class DayPickerLayout extends PureComponent {
  render () {
    console.log('DayPickerLayout props', this.props)
    return (
      <Wrapper >
            <NavBarElement/>
          <main>
          { this.props.children }
          </main>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  height: 100%,
`

export default DayPickerLayout

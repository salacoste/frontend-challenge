import React, { PureComponent, Fragment } from 'react'
// import PropTypes from 'prop-types'
import * as Bootstrap from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import PropTypes from 'prop-types'
let {Navbar, Nav, Button, NavDropdown, Row, Container, NavItem} = Bootstrap



class Pagination extends PureComponent {
static propTypes = {
comments: PropTypes.array.isRequired
}

  render() {
    return (
      <Fragment>
        let curr = this.props.match.params.id === undefined? 1 : this.props.match.params.id
        let pages = []
        let pag = Math.ceil(this.props.comments.length/this.props.commentsPerPage)
        for (let i=1; i <= pag; i++) {
          pages.push(
            <LinkContainer to={{pathname: `/allcomments/${i}`}} key={i}>
              <Pagination.Item key={i} active={i===curr? true : false}>
                {i}
                  </Pagination.Item>
            </LinkContainer>
          )
      }
      </Fragment>
    )
  }
}

export default Pagination

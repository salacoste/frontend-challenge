import React, {Fragment} from 'react'
import NavBar from '../../elements/navbar/Navbar'
import {Row, Col, Container, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


export default () => {
  return ( 
  <Fragment>
    <Fragment>
      <NavBar/>
    </Fragment>
    <Fragment>
      <Container>
        <Row>
          <Col md={12}>
            <br />
            <div className="hero-unit center">
              <h1>Ooops! <small><font face="Tahoma" color="red">Error 404: Page not found</font></small></h1>
              <br />
              <p>The page you requested could not be found. Use your browsers <b>Back</b> button to navigate to the page you have prevously come from.</p>
              <p><b>Or you could just press this neat little button:</b></p>
              <LinkContainer to='/'>
                <Button className='btn btn-large btn-info'>
                  <i className="icon-home icon-white"></i>Take Me Home
                </Button>
              </LinkContainer>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  </Fragment>
  )
}




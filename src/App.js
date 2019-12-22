import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { withRouter } from 'react-router-dom'
import {Spinner, Row, Col} from 'react-bootstrap'
import {Transition, TransitionGroup, CSSTransition} from 'react-transition-group'
import Loader from './elements/Loader/Loader'
import theme from './utils/theme'

import Router from 'src/router'





export class App extends Component {
  state = {
    isLoaded: false
  }

  asyncF = async () => {
    await setTimeout(()=> {
      this.setState({isLoaded: true})
    }, 2000)
  }

 componentDidMount() {
    // this.props.loadSession()
    !this.state.isLoaded && this.asyncF()
  }


  
  render() {
    const {isLoaded} = this.state

    // TODO: Add loader
    if (!isLoaded) {
      return (
        <div className="container-fluid h-100 bg-dark">
        <Row className="align-items-center h-100">
        <Col className="text-center">
        <Loader>
          <p>
          <span className="text-white" style={{"paddingLeft": "15px", "marginTop":"100px"}}>I'm doing the best that I can...</span>
          </p>
        </Loader>
        </Col>
        </Row>
        </div>
       

      // <div className="container-fluid h-100 bg-dark">
      //   <Row className="align-items-center h-100">
      //     <Col className="text-center">
      //       <Spinner animation="border" role="status" className="text-white" />
      //       <span className="text-white" style={{"paddingLeft": "15px"}}>I'm doing the best that I can...</span>
      //     </Col>
      //   </Row>
      // </div>
    
        )
    }

    return (
      <ThemeProvider theme={theme}>
            <Router />
      </ThemeProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

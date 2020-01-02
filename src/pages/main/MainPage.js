import React, { PureComponent, Fragment, createContext} from 'react'
import ExpensesList from '../../elements/ExpensesList/ExpensesList'
// import {Container, Row, Col} from 'react-bootstrap'
import {Container, Row, Col} from 'reactstrap'
import PropTypes from 'prop-types'
import {ThemeContext, themes} from '../../context/Context'

//import {CSSTransition, TransitionGroup} from 'react-transition-group'
// import {CSSTransition} from 'react-addons-css-transition-group'
import './styles.css'


class MainPage extends PureComponent {

  render () {
    let router = this.props
    return (
      <Fragment>
        <Container fluid style={{marginTop:'20px'}}>
          <Row>
            <Col> 
              <Container>
                <h1>Expense reports</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae ea eum alias dicta aliquid soluta hic nisi illum facilis ipsa!</p>
              </Container>
            </Col>
          </Row>
          <Row> 
            <Col>
                {/* <ThemeContext.Provider value={{themes, router, '23': 23}}> */}
                <ExpensesList loadExpenses = {this.props.loadExpenses} expenses = {this.props.expenses}/>
                {/* </ThemeContext.Provider> */}
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  }
}

MainPage.propTypes = {
  ListHeader: PropTypes.number,

}

export default MainPage

import React, {PureComponent, Fragment} from 'react'
import {Card, Button, Alert, Table, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap'
import {Container} from 'react-bootstrap'
import TableCreator from'./Table'


class ExpensesList extends PureComponent {

  async componentDidMount() {
   this.props.loadExpenses && this.props.loadExpenses()
    
  }

  getExpenses = () => {
    if(this.props.expenses.length === 0 || this.props.expenses === undefined) {
      return (
        <Alert variant="danger">
          Expenses are loading or data is occured.
        </Alert>
      )
    }

    return (
    <Fragment>
      <TableCreator expenses={this.props.expenses} id={this.props.id} pagination/>
    </Fragment>
      )
    }
  
  render() {
  return (
  <Fragment>
      {this.getExpenses()}
  </Fragment>
  )
  }


}

export default ExpensesList

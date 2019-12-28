import React, {PureComponent, Fragment} from 'react'
import {Card, Button, Alert, Table, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap'
import {Accordion, Container} from 'react-bootstrap'
import CommentList from '../commentsList/commentsList'

import {
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination } from 'react-table'

  function createTable({columns, data}) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    })
    return (
    <Table style={{fontSize: '12px'}} dark hover responsive bordered size={this.state.size} {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )}
          )}
        </tbody>   
    
    </Table>
    )
  }


class ExpensesList extends PureComponent {
  
  constructor(props){
    super(props)
    this.state = {
      defaultActiveKey: undefined,
      columnOrder: {
        id: '#',
        date: 'Date',
        merchant: 'Merchant',
        userFirst : 'Person name',
        userEmail: 'Email',
        amount: 'Amount',
        comments: 'Comments',
        receipts: 'Receipts',
        actions: 'Actions'
      },
      size: 'lg'
    }
    this.columns = 
      [
      {
          Header: '#',
          accessor: 'index',
          Cell: (props) => { 
            return (
            <Fragment>
              {console.log(props)}
            </Fragment>
            )
          }
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: (props)=> {
          return (
            <Fragment>

            </Fragment>
          )
        }
      },
      {
        Header: 'Merchant',
        accessor: 'merchant'
      },
      {
        Header: 'User Name',
        accessor: 'user.first'
      }
      ]
    }
  handlerComments = (id) => {
    //handler for Comment Open/Close button
    
  }

  async componentDidMount() {
   this.props.loadExpenses && this.props.loadExpenses()
    
  }

  getList = ()=> {
    console.log(this.props.expenses)
    const u = this.props.expenses.map((item)=> {
        return (
          <tr key={item.id}>
            <th scope="row" >
              {item.index+1}
            </th>
            <th>
              {new Date(item.date).toLocaleString()}
            </th>
            <th>
              {item.merchant}
            </th>
            <th>
              {`${item.user.first} ${item.user.last}`}
            </th>
            <th>
              {item.user.email}
            </th>
            <th>
              {`${item.amount.value} ${item.amount.currency}`}
            </th>
            <th>
              {item.comment || 'comment is absent'}
            </th>
            <th>
              {item.receipts.length}
            </th>
            <th>
              
            </th>
          </tr>
        )
    })

    
    return ( 
    <tbody>
      {u}
    </tbody> 

      // <tbody>
      //   <tr>
      //     <td scope="row">1</td>
      //     <td>Mark</td>
      //     <td>Otto</td>
      //     <td>@mdo</td>
      //   </tr>
    )

    /* console.log('000', Object.keys(this.state.columnOrder)) */
  }

  getHeader = () => {
    const l = Object.values(this.state.columnOrder).map((item, i) => {
      return <th key={i}>{item}</th>
      })
    return (
      <thead>
      <tr>
      {l}
      </tr>
      </thead>
    )
  }

  getExpenses = () => {
    let dropdownOpen, toggle = false 
    if(this.props.expenses.length === 0 || this.props.expenses === undefined) {
      return (
        <Alert variant="danger">
          Expenses are loading or data is occured.
        </Alert>
      )
    }

    return (
    <Fragment>
      <Container className="mb-4">
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          Button Dropdown
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem disabled>Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
      </Container>

      {/* <Table style={{fontSize: '12px'}} dark hover responsive bordered size={this.state.size}>
        {this.getHeader()}
        {this.getList()}

      </Table> */}

    {createTable(
      this.columns, this.props.expenses
      )}
    </Fragment>
      )
    }
  
  render() {
  return (
  <Fragment>
    {/* // <Accordion defaultActiveKey={this.state.defaultActiveKey || "0"}> */}
      {this.getExpenses()}
    {/* // </Accordion> */}
  </Fragment>
  )
  }


}

export default ExpensesList

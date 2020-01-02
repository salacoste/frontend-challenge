import React, { Fragment, useState, useParams, useContext } from 'react'
import {useTable, useSortBy, usePagination, useFilters, useGlobalFilter} from 'react-table'
import {Table as TableR, Pagination, PaginationItem, PaginationLink, FormGroup, Label, Input, Col, CustomInput} from 'reactstrap'
import {FaQuestionCircle, } from 'react-icons/fa'
import {FiMoreHorizontal} from 'react-icons/fi'
import {ThemeContext} from '../../context/Context'
import {Link, useHistory} from 'react-router-dom'



function Table ({columns, data, pagination}) {
    const [darkMode, setMode] = useState(false);
    const history = useHistory();


    console.log('UseTable hook properties', useTable({columns, data}))
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        preGlobalFilteredRows,
        setGlobalFilter,
        state: { pageIndex, pageSize, ...state },
      } = useTable(
          {
        columns,
        data,
        initialState: { pageIndex: 0 },
      },
      useFilters,
      useGlobalFilter,
      useSortBy,
      usePagination,

      )

      let context = useContext(ThemeContext)
        return (
            <Fragment>
                <Col className="text-center">
                    <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    />
                </Col>
                <FormGroup row className="text-right">
                    <Label for="pageSize" sm={2}>Records per page: </Label>
                    <Col sm={1}>
                        <Input type="select" name="pageSize" id="pageSize" onChange={(e)=>{console.log('0000', e); setPageSize(Number(e.target.value))}} value={pageSize}  >
                        {[5,10,20,30].map((val)=>{
                            return (<option key={val} value={val}>{val}</option>)
                        })}
                        </Input>
                    </Col>
                    <Col sm={8} className="text-right">
                        <Label for="daynightswitch">Day/Night mode</Label>
                        <CustomInput type="switch" id="daynightswitch" checked={context.activeTheme==='dark'? true : false} name="daynightswitch" style={{display:'inline-block'}} onChange={(e)=>{context.changeTheme(); console.log(context)}
                        }/>
                    </Col>
                </FormGroup>
                <TableR style={{fontSize: '12px'}} dark={context.activeTheme === 'dark' ? true : false} hover responsive bordered size='lg' {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.Header !== 'Actions' ? column.getSortByToggleProps() : '')} style={{lineHeight:'40px'}}>
                               <span style={{display:'inline-block', minHeight:'40px'}}>{column.render('Header')}</span>
                                    {column.Header !== "Actions" && column.isSorted
                                    ? column.isSortedDesc
                                        ?  <span style={{marginLeft:'10px', fontSize:'18px', display:'inline-block', position:'absolute'}}> 🔽</span>
                                        :  <span style={{marginLeft:'10px', fontSize:'18px', display:'inline-block', position:'absolute'}}> 🔼</span>
                            : (<Fragment>{column.Header!=='Actions'? (<span style={{margin:'0 0 0 12px', fontSize:'14px', display:'inline-block', position:'absolute'}}><FaQuestionCircle/></span>) : ''}</Fragment>)
                                    }
                                <div style={{minHeight:'16px', width:'1px', height:'48px', verticalAlign:'middle', display:'inline-block'}}></div>
                                </th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {console.log('222222',rows)}
                        {page.map(
                            (row, i) => {
                            prepareRow(row); 
                            let onClick = () => {
                                history.push(`/${row.original.id}`)
                            }
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        if (cell.column.Header !== 'Actions' && cell.column.Header !== 'Comment' ) {
                                            return <td {...cell.getCellProps()}  onClick={onClick} className="pseudoLink" >{cell.render('Cell')}</td>
                                        }
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )}
                        )}
                    </tbody>   
                </TableR>
                {paginationNav(
                    {
                    rows,
                    prepareRow,
                    page,
                    canPreviousPage,
                    canNextPage,
                    pageOptions,
                    pageCount,
                    gotoPage,
                    nextPage,
                    previousPage,
                    setPageSize,
                    pageIndex, 
                    pageSize
                }
                )}
            </Fragment>
        )
    }

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
    }) {
    const count = preGlobalFilteredRows.length
    
    return (
        <span>
        Search:{' '}
        <input
            value={globalFilter || ''}
            onChange={e => {
            setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Realtime search ...`}
            style={{
            fontSize: '.8rem',
            border: '0',
            }}
        />
        </span>
    )
    }
    

function paginationNav({
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageIndex,
    pageSize}) {
    let content = []

    for (let i = 0; i * pageSize < rows.length; i++) {
        content.push(
            <PaginationItem key={i}>
                <PaginationLink href="#" onClick={(e) => {e.preventDefault(); gotoPage(i)}}>
                {i+1}
                </PaginationLink>
            </PaginationItem>
        )
        
    }
    return (
    <Pagination aria-label="Page navigation example" >
        <PaginationItem disabled={!canPreviousPage}>
            <PaginationLink first href="#" onClick={(e) => {e.preventDefault(); gotoPage(0)}} />
        </PaginationItem>
        {content}
        <PaginationItem  disabled={!canNextPage}>
            <PaginationLink last href="#" onClick={(e) => {e.preventDefault(); gotoPage(Math.floor(rows.length/pageSize))}}/>
        </PaginationItem>
    </Pagination>
)
}

export default function createTable ({expenses, ...props}) {
    // const context = useContext(ThemeContext);
    // // themes : {light, dark}
    // // router: {properties of react-router} -> router.match.params.id -> ID

    const columns = React.useMemo(()=> [
        {
            Header: '#',
            accessor: 'index',
            Cell:  (props) => { 
                return (
                <Fragment>
                    {console.log(props)}
                    {String(props.cell.value+1)}
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
                    {(new Date(props.cell.value)).toLocaleString()}
                </Fragment>
            )
            }
        },
        {
            Header: 'Merchant',
            accessor: 'merchant'
        },
        {
            Header: 'Person Name',
            accessor: 'user.first',
            Cell: (props)=> {
                const {user} = props.cell.row.original
                return (
                    <Fragment>
                        {user ? <span>{user.first} {user.last}</span> : ''}
                    </Fragment>
                )
            }
        },
        {
            Header: 'Email',
            accessor: 'user.email'
        },
        {
            Header: 'Amount',
            accessor: 'amount.currency',
            Cell: (props) => {
                const {amount} = props.cell.row.original
                // console.log('2!!2222', amount, props)
                return (
                    <Fragment>
                        {amount ? <span>{amount.value} {amount.currency}</span>: ''}
                    </Fragment>
                )
            }
        },
        {
            Header: 'Comment',
            accessor: 'comment',
            Cell: (props)=>{
                return (
                    <Fragment>
                        {props.value || 'Add a comment'}
                    </Fragment>

                )
            }
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: (props)=>{
                return (
                    <Fragment>
                        <a href="" className="actionButton" onClick={(e) => {
                            console.log("click")
                            e.preventDefault()
                        }}>
                        <FiMoreHorizontal />
                        </a>
                    </Fragment>

                )
            }
        },
        ], [])
    const data = React.useMemo(()=> expenses, [])

    return (
        <Fragment>
            <Table columns={columns} data = {data} style={{marginBottom:'50px'}}/>
        </Fragment>
    )
}


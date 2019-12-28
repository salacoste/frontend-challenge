import React, { Fragment } from 'react'
import {useTable, useSortBy, usePagination} from 'react-table'
import {Table as TableR, Pagination, PaginationItem, PaginationLink, Tooltip} from 'reactstrap'
import {FaQuestionCircle} from 'react-icons/fa'





function Table ({columns, data, pagination}) {
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
        state: { pageIndex, pageSize },
      } = useTable(
          {
        columns,
        data,
        initialState: { pageIndex: 1 },
      },
      useSortBy,
      usePagination
      )

        return (
            <div>
                <TableR style={{fontSize: '12px'}} dark hover responsive bordered size='lg' {...getTableProps()}>
                    <thead>
                        {console.log('123', ...headerGroups[0].getHeaderGroupProps())}
                        {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span style={{marginLeft:'5px'}}>
                                    {column.isSorted
                                    ? column.isSortedDesc
                                        ? ' 🔽'
                                        : ' 🔼'
                                    : <FaQuestionCircle/>}
                                </span>
                                </th>
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
                
                </TableR>
            </div>
        )
    }

    export default function createTable ({expenses}) {
        const columns = React.useMemo(()=> [
            {
                Header: '#',
                accessor: 'index',
                width: 50,
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
              Header: 'User Name',
              accessor: 'user.first',
              Cell: (props)=> {
                  const {user} = props.cell.row.original
                  console.log('2!!2222', user, props)
                  return (
                      <Fragment>
                          {user ? <span>{user.first} {user.last}</span> : ''}
                      </Fragment>
                  )
              }
            }
            ], [])
        const data = React.useMemo(()=> expenses, [])

        return (
                <Table columns={columns} data = {data} />
        )
    }



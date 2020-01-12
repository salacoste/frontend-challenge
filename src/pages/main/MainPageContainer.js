import { connect } from 'react-redux'
import MainPage from './MainPage'
import {normalizedArticles, normalizedComments} from '../../utils/fixtures'

import {expenses_thunk, } from '../../store/reducers/expenses/expensesReducer'
import {getExpensesInArray} from '../../store/reducers/expenses/expensesSelector'


const mapStateToProps = (state, props) => {
  // console.log('mapStateToProps of Articles', state)
  return {
  expenses: getExpensesInArray(state,props),
  }
}



const mapDispatchToProps = {
  loadExpenses: expenses_thunk,
}



export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

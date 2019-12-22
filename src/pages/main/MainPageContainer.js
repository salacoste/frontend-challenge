import { connect } from 'react-redux'
import MainPage from './MainPage'
import {normalizedArticles, normalizedComments} from '../../utils/fixtures'

import {articles_thunk} from '../../store/reducers/articles/articlesReducer'
import {comments_thunk} from '../../store/reducers/comments/commentsReducer'

import {getArticlesInArray} from '../../store/reducers/articles/articlesSelector'
import {getCommentsInArray} from '../../store/reducers/comments/commentsSelector'

import {expenses_thunk} from '../../store/reducers/expenses/expensesReducer'
import {getExpensesInArray} from '../../store/reducers/expenses/expensesSelector'



const mapStateToProps = (state, props) => {
  // console.log('mapStateToProps of Articles', state)
  return {
  // l: getFilteredArticles(state, props),
  articles: getArticlesInArray(state, props),
  // articles: normalizedArticles,
  comments: getCommentsInArray(state,props),
  expenses: getExpensesInArray(state,props),
  }
}



const mapDispatchToProps = {
  loadExpenses: expenses_thunk,
}



export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

import { connect } from 'react-redux'
import AllComments from './AllComments'
import {normalizedArticles, normalizedComments} from '../../utils/fixtures'

import {articles_thunk} from '../../store/reducers/articles/articlesReducer'
import {comments_thunk} from '../../store/reducers/comments/commentsReducer'

import {getArticlesInArray, } from '../../store/reducers/articles/articlesSelector'
import {getCommentsInArray, getLoadStatus} from '../../store/reducers/comments/commentsSelector'


const mapStateToProps = (state, props) => {
  // console.log('mapStateToProps of Articles', state)
  return {
  // l: getFilteredArticles(state, props),
  articles: getArticlesInArray(state, props),
  //articles: normalizedArticles,
  comments: getCommentsInArray(state,props),
  loaded: getLoadStatus(state,props)
  }
}



const mapDispatchToProps = {
  loadArticles: articles_thunk,
  loadComments: comments_thunk,
}



export default connect(mapStateToProps, mapDispatchToProps)(AllComments)

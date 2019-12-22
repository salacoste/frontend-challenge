import {createSelector} from 'reselect'
import {getArticles, getArticlesInArray} from '../articles/articlesSelector'
// import {} from 'react-day-picker/'



export const getComments = (store,ownProps) => store.comments.entities
export const getCommentsInArray = (store, ownProps) => {
  // store.comments.loaded && console.log("CommentsArray", Object.values(store.comments.entities))
  return Object.values(store.comments.entities)
}

export const getLoadStatus = (store, ownProps) => {
  return store.comments.loaded
}

export const filteredComments = (store, ownProps) => {
  // console.log('22111', store.articles.entities[ownProps.articleId])
  if (!store.articles.entities[ownProps.articleId].comments || store.articles.entities[ownProps.articleId].comments.length === 0) {
    return []
  }
  else {
    // console.log('22221', Object.values(store.comments.entities), store.articles.entities[ownProps.articleId].comments)
    const comments = Object.values(store.comments.entities).filter((comment)=> {
      return store.articles.entities[ownProps.articleId].comments.includes(comment.id)
    })
    //console.log('filtered comments', comments)
    return comments
  }
}
// export const getComments = (store,ownProps) => store.comments.entities
// export const getExampleText = state => state.exampleReducer.text
// export const getExchangeRandom = state => state.exampleReducer.random

export const getFilteredComments = createSelector([getArticles, getComments], (articles, comments)=> {
  // console.log('from articles selector, articles is ', articles, 'comments are ', comments)
  return comments
})



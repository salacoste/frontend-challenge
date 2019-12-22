import {createSelector} from 'reselect'

export const getArticles = (store,ownProps) => store.articles.entities
export const getArticlesInArray = (store, ownProps) => {
  // store.articles.loaded && console.log("articleArray", Object.values(store.articles.entities))
  return Object.values(store.articles.entities)
}
export const getComments = (store,ownProps) => store.comments.entities
// export const getExampleText = state => state.exampleReducer.text
// export const getExchangeRandom = state => state.exampleReducer.random

export const getFilter = (store, ownProps) => {
  return store.articles.filter
}

export const getLoadStatus = (store, ownProps) => {
  return store.articles.loaded
}

export const getFilteredArticles = createSelector([getArticles, getComments], (articles, comments)=> {
  // console.log('from articles selector, articles is ', articles, 'comments are ', comments)
  return articles
})

export const getArticlesFiltered = createSelector([getFilter, getArticlesInArray], (filter, articles) => {
  if (filter.to === undefined || filter.from === undefined) return articles

  let filtered = articles.filter((article)=>{
    let d = new Date(article.date)
    return ((d > filter.from) && (d< filter.to))? true : false
  })
  
  return filtered
})
export const getDatesOfArticles = createSelector([getArticlesInArray], (articles)=> {
  let dates = []
  articles.map((article)=> { 
    dates.push(new Date(article.date))
    return false
  })
  return dates
} )
import {createSelector} from 'reselect'

export const getExpenses = (store,ownProps) => store.expenses.entities
export const getExpensesInArray = (store, ownProps) => {
  // store.articles.loaded && console.log("articleArray", Object.values(store.articles.entities))
  return Object.values(store.expenses.entities)
}
// export const getComments = (store,ownProps) => store.comments.entities
// export const getExampleText = state => state.exampleReducer.text
// export const getExchangeRandom = state => state.exampleReducer.random

export const getFilter = (store, ownProps) => {
  return store.expenses.filter
}

export const getLoadStatus = (store, ownProps) => {
  return store.expenses.loaded
}

export const getFilteredExpenses = createSelector([getExpenses], (articles)=> {
  // console.log('from articles selector, articles is ', articles, 'comments are ', comments)
  return articles
})

export const getExpensesFiltered = createSelector([getFilter, getExpensesInArray], (filter, expenses) => {
  if (filter.to === undefined || filter.from === undefined) return expenses

  let filtered = expenses.filter((expense)=>{
    let d = new Date(expense.date)
    return ((d > filter.from) && (d< filter.to))? true : false
  })
  
  return filtered
})
export const getDatesOfExpenses = createSelector([getExpensesInArray], (expenses)=> {
  let dates = []
  expenses.map((expense)=> { 
    dates.push(new Date(expense.date))
    return false
  })
  return dates
} )
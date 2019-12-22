import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import { enableBatching } from 'redux-batched-actions'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import freeze from 'redux-freeze'
// import {normalizedArticles as articles, normalizedComments as comments} from '../utils/fixtures'

import articles from './reducers/articles/articlesReducer'
import comments from './reducers/comments/commentsReducer'
import expenses from './reducers/expenses/expensesReducer'
import thunk from 'redux-thunk'

// import rootSaga from './saga'

import example from './example'

const logger = createLogger({
  collapsed: true,
  duration: true
})

// ---
// REDUCERS
// ---

export default function configureStore () {
  const sagaMiddleware = createSagaMiddleware()
  // add MiddleWares here
  const middlewares = [sagaMiddleware, thunk, logger, freeze]

  // TODO: check to disable by default on prod
  const enhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  )

  const rootReducer = enableBatching(combineReducers({
    // add reducers
    articles,
    comments,
    expenses,
    example,
  }))
  const reduxInspectorActivator = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(rootReducer, reduxInspectorActivator(
    applyMiddleware(...middlewares)
    ) , )

  // DISABLE store access from global environment
  window.store = store
  // sagaMiddleware.run(rootSaga)

  return store
}

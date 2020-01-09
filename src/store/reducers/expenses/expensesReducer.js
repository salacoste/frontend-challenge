import { handleActions, createAction } from 'redux-actions'
import Immutable from 'seamless-immutable'
import axios from 'axios'


// ---
// CONSTANTS
// ---

export const EXPENSES_START = 'expenses/START'
export const EXPENSES_LOADING = 'expenses/LOADING'
export const EXPENSES_LOADED = 'expenses/LOADED'
export const EXPENSES_ERROR = 'expenses/ERROR'
export const EXPENSES_FILTER = 'expenses/FILTER'
export const NEW_EXPENSE_IMAGE_ID_ADDING = 'expenses/NEW_EXPENSE_IMAGE_ID_ADDING'
export const EXPENSES_CHANGE_COMMENT = 'expenses/CHANGE_COMMENT'



/// ---
// AXIOS CONSTANTS
/// ---

const url = 'http://localhost:3000/expenses'


// ---
// ACTION CREATORS
// ---

export const expenses_start = createAction(EXPENSES_START)
export const expenses_loading = createAction(EXPENSES_LOADING)
export const expenses_loaded = createAction(EXPENSES_LOADED)
export const expenses_error = createAction(EXPENSES_ERROR)
export const expenses_filter = createAction(EXPENSES_FILTER)
export const expenses_change_comment = createAction(EXPENSES_CHANGE_COMMENT)
export const expenses_new_image_id_adding = createAction(NEW_EXPENSE_IMAGE_ID_ADDING)


export const expenses_thunk = ()=> {
  return (dispatch, getState) => {
    dispatch(expenses_loading())

    // async articles loading
    axios.get(url)
      .then((r)=> {
        const ExpensesObj = arrayToObject(r.data)
        // console.log('ArticlesToObj', ArticlesObj)
        dispatch(expenses_loaded(ExpensesObj))
      })
      .catch((e)=> {
        console.log('Error is occured', e)
        dispatch(expenses_error(e))
      })

  }
}

export const expenses_edit_comment_thunk = (id, comment)=> {
  return (dispatch, getState) => {
    console.log('updating the comment..', id, comment)
    axios.post(`${url}/${id}`, {
      comment: comment
    })
    .then((res)=> {
      console.log('resolve', res)
      dispatch(expenses_change_comment(res.data))
    })
    .catch((e)=> {
      console.log('Error is occured', e)
      dispatch(expenses_error(e))
    })
  }
}

export const expenses_image_loading_thunk = (id, image, setLoading, toggle)=> {
  return (dispatch, getState) => {
    console.log('loading the image..', id, image)
    let formData = new FormData();
    formData.append('receipt', image);

    axios.post(`${url}/${id}/receipts`, formData , 
    {
      headers: {
          "Content-type": "multipart/form-data",
      },                    
  })
    .then((res)=> {
      console.log('resolve', res)
      setLoading(false)
      toggle()
      dispatch(expenses_new_image_id_adding(res.data))
    })
    .catch((e)=> {
      console.log('Error is occured', e)
      setLoading(false)
      dispatch(expenses_error(e))
    })
  }
}

// ---
// INITIAL STATE
// ---

const initialState = Immutable({
  entities: {
  },
  error: false,
  loading: false,
  loaded: false,
  filter: {
    from: undefined,
    to: undefined,
  }
})

export const arrayToObject = (arr) => {
  const a =  arr.expenses.reduce((acc, current, i) => {
    // console.log('i is ' + i, acc, current)
    acc[current.id] = current
    return acc
  }, {})
  return a
}



// ---
// REDUCER
// ---


const reducerMap = {
    [EXPENSES_LOADING]: (state, action) => {
      return state.set("loading", true)
    },
    [EXPENSES_LOADED]: (state, action) => {
      const data = action.payload
      return Immutable.merge(state, {loading: false, entities: {...state.entities, ...data}, loaded: true})
    },
    [EXPENSES_ERROR]: (state, action) => {
      return state.set("error", true)
    },
    [EXPENSES_FILTER]: (state, action)=> {
      // action.payload.from || to
      console.log(action)
      return Immutable.setIn(state, ['filter'], {to: action.payload.to, from: action.payload.from})
      // return state
    },
    [NEW_EXPENSE_IMAGE_ID_ADDING]: (state, action) => {      
      // return Immutable.setIn(state, ['entities', action.payload.articleId, 'comments'], [...state.entities[action.payload.articleId].comments, action.payload.id])
      console.log(NEW_EXPENSE_IMAGE_ID_ADDING, 'action!')
      return Immutable.setIn(state, ['entities', action.payload.id, 'receipts'], action.payload.receipts)

      // return {...state}
    },
    [EXPENSES_CHANGE_COMMENT] : (state, action) => {
      console.log('change comment action', action)
      return Immutable.setIn(state, ['entities', action.payload.id, 'comment'], action.payload.comment)
      // return {...state}
    }
  }


export default handleActions(reducerMap, initialState)
    
    
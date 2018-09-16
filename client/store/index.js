import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import addresses from './address'
import user, {REMOVE_USER} from './user'
import productReducer from './product'
import reviewReducer from './review'
import cartReducer from './cart'

const reducer = combineReducers({
  addresses,
  user,
  products: productReducer,
  reviews: reviewReducer,
  cart: cartReducer
})

const rootReducer = (state, action) => {
  if (action.type === REMOVE_USER) {
    state.addresses = addresses.initialState
  }
  console.log('state is', state)
  return reducer(state, action)
}

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(rootReducer, middleware)

export default store
export * from './user'

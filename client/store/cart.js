import axios from 'axios'

//ACTIONS
const GET_ORDERPRODUCTS_FROM_SERVER = 'GET_ORDERPRODUCTS_FROM_SERVER'

const ADD_ORDERPRODUCT_TO_SERVER = 'ADD_ORDERPRODUCT_TO_SERVER'

//ACTION CREATORS
export const setOrderProductsInStore = function(products) {
  return {
    type: GET_ORDERPRODUCTS_FROM_SERVER,
    products
  }
}

export const addOrderProductsInStore = function(product) {
  return {
    type: ADD_ORDERPRODUCT_TO_SERVER,
    product
  }
}

//THUNK CREATORS
export const fetchOrderProducts = () => {
  return async dispatch => {
    //dispatch(setIsLoading())
    let res = await axios.get('/api/orderProducts')
    let products = res.data
    const action = setOrderProductsInStore(products)
    dispatch(action)
  }
}

export const addOrderProducts = () => {
  return async dispatch => {
    //dispatch(setIsLoading())
    //should this be post?!?! maybe not!!!
    //need to remove item from store and
    //take that item and create a new orderProduct for it
    let res = await axios.post('/api/orderProducts')
    let product = res.data
    const action = addOrderProductsInStore(product)
    dispatch(action)
  }
}

//REDUCER
const cartReducer = (
  state = {
    all: []
    // selected: {},
    // isLoading: false,
    // hasErrored: false
  },
  action
) => {
  switch (action.type) {
    case GET_ORDERPRODUCTS_FROM_SERVER:
      return {
        ...state,
        all: action.products
      }
    case ADD_ORDERPRODUCT_TO_SERVER:
      return {
        ...state,
        all: [...state.all, action.product]
      }
    default:
      return state
  }
}

export default cartReducer

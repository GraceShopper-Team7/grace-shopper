import axios from 'axios'

//ACTIONS
const GET_ORDERPRODUCTS_FROM_SERVER = 'GET_ORDERPRODUCTS_FROM_SERVER'

//ACTION CREATORS
export const setOrderProductsInStore = function(products) {
  return {
    type: GET_ORDERPRODUCTS_FROM_SERVER,
    products
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

    // let res = await axios.get('/api/products')
    // let products = res.data
    // const action = setProductsInStore(products)
    // console.log("I'm done fetching..., let's dispatch to the store")
    // dispatch(action)
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
    default:
      return state
  }
}

export default cartReducer

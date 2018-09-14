import axios from 'axios'

//ACTIONS
const GET_ORDERPRODUCTS_FROM_SERVER = 'GET_ORDERPRODUCTS_FROM_SERVER'

const ADD_PRODUCT_TO_ORDERPRODUCTS_TABLE_IN_SERVER =
  'ADD_PRODUCT_TO_ORDERPRODUCTS_TABLE_IN_SERVER'

const REMOVE_PRODUCT_FROM_ORDERPRODUCTS_TABLE_IN_SERVER =
  'REMOVE_PRODUCT_FROM_ORDERPRODUCTS_TABLE_IN_SERVER'

//ACTION CREATORS
export const setOrderProductsInStore = function(products) {
  return {
    type: GET_ORDERPRODUCTS_FROM_SERVER,
    products
  }
}

export const addProductToOrderProductTableInServer = function(product) {
  return {
    type: ADD_PRODUCT_TO_ORDERPRODUCTS_TABLE_IN_SERVER,
    product
  }
}

export const removeProductFromOrderProductTableInServer = function(product) {
  return {
    type: REMOVE_PRODUCT_FROM_ORDERPRODUCTS_TABLE_IN_SERVER,
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

export const addProductToOrderProducts = (product, user) => {
  return async dispatch => {
    //dispatch(setIsLoading())
    //should this be post?!?! maybe not!!!
    //take that product to create new orderProduct entry
    let res = await axios.post('/api/orderProducts', {product, user})
    let newOrderProduct = res.data
    const action = addProductToOrderProductTableInServer(newOrderProduct)
    dispatch(action)
  }
}

export const removeProductFromOrderProducts = product => {
  return async dispatch => {
    //dispatch(setIsLoading())
    //should this be post?!?! maybe not!!!
    //take that product to create new orderProduct entry
    let res = await axios.delete(`/api/orderProducts/${product.id}`, product)
    let deletedOrderProduct = res.data
    const action = removeProductFromOrderProductTableInServer(
      deletedOrderProduct
    )
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
    case ADD_PRODUCT_TO_ORDERPRODUCTS_TABLE_IN_SERVER:
      return {
        ...state,
        all: [...state.all, action.product]
      }
    case REMOVE_PRODUCT_FROM_ORDERPRODUCTS_TABLE_IN_SERVER:
      return {
        ...state,
        all: state.all.filter(function(elem) {
          return elem.id !== action.product.id
        })
      }
    default:
      return state
  }
}

export default cartReducer

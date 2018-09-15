import axios from 'axios'

//ACTIONS
const GET_ORDERPRODUCTS_FROM_SERVER = 'GET_ORDERPRODUCTS_FROM_SERVER'

const ADD_PRODUCT_TO_ORDERPRODUCTS_TABLE_IN_SERVER =
  'ADD_PRODUCT_TO_ORDERPRODUCTS_TABLE_IN_SERVER'

const REMOVE_PRODUCT_FROM_ORDERPRODUCTS_TABLE_IN_SERVER =
  'REMOVE_PRODUCT_FROM_ORDERPRODUCTS_TABLE_IN_SERVER'

//ACTION CREATORS
const setOrderProductsInStore = function(currentOrder, pastOrders) {
  return {
    type: GET_ORDERPRODUCTS_FROM_SERVER,
    currentOrder,
    pastOrders
  }
}

const addProductToOrderProductTableInServer = function(product) {
  return {
    type: ADD_PRODUCT_TO_ORDERPRODUCTS_TABLE_IN_SERVER,
    product
  }
}

const removeProductFromOrderProductTableInServer = function(product) {
  return {
    type: REMOVE_PRODUCT_FROM_ORDERPRODUCTS_TABLE_IN_SERVER,
    product
  }
}

//THUNK CREATORS
export const fetchOrderProducts = user => {
  return async dispatch => {
    //dispatch(setIsLoading())
    let res = await axios.get(`/api/orderProducts/${user.id}`)
    let orders = res.data
    let currentOrder = orders.filter(function(order) {
      return order.status === 'created'
    })
    let pastOrders = orders.filter(function(order) {
      return order.status !== 'created'
    })
    console.log('currentOrder: ', currentOrder)
    console.log('pastOrders: ', pastOrders)

    if (currentOrder.length === 0) {
      currentOrder = [{products: []}]
      console.log('newCurrentOrder: ', currentOrder)
    }

    const action = setOrderProductsInStore(currentOrder, pastOrders)
    dispatch(action)
  }
}

export const addProductToOrderProducts = (product, user) => {
  return async dispatch => {
    //dispatch(setIsLoading())
    let res = await axios.post('/api/orderProducts', {product, user})
    let newOrderProduct = res.data
    const action = addProductToOrderProductTableInServer(newOrderProduct)
    dispatch(action)
  }
}

export const removeProductFromOrderProducts = product => {
  return async dispatch => {
    //dispatch(setIsLoading())

    await axios.delete(`/api/orderProducts/${product.id}`, product)
    const action = removeProductFromOrderProductTableInServer(product)
    dispatch(action)
  }
}

const initialState = {
  currentOrder: {
    products: []
  },
  pastOrdersArr: []
  // products: state.products
  // selected: {},
  // isLoading: false,
  // hasErrored: false
  //
}

//REDUCER
const cartReducer = (state = initialState, action) => {
  console.log('action: ', action)
  switch (action.type) {
    case GET_ORDERPRODUCTS_FROM_SERVER:
      return {
        ...state,
        currentOrder: {
          products: action.currentOrder[0].products
        },
        pastOrdersArr: action.pastOrders
      }
    case ADD_PRODUCT_TO_ORDERPRODUCTS_TABLE_IN_SERVER:
      return {
        ...state,
        currentOrder: {
          products: [...state.currentOrder.products, action.product]
        }
      }
    case REMOVE_PRODUCT_FROM_ORDERPRODUCTS_TABLE_IN_SERVER:
      return {
        ...state,
        currentOrder: {
          products: state.currentOrder.products.filter(function(product) {
            return product.id !== action.product.id
          })
        }
      }
    default:
      return state
  }
}

export default cartReducer

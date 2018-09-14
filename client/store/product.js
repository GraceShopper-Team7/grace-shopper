import axios from 'axios'

//ACTIONS
const GET_PRODUCTS_FROM_SERVER = 'GET_PRODUCTS_FROM_SERVER'
const GET_SINGLE_PRODUCT_FROM_SERVER = 'GET_SINGLE_PRODUCT_FROM_SERVER'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const GET_NEW_PRODUCT = 'GET_NEW_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

//ACTION CREATORS
const setProductsInStore = function(products) {
  return {
    type: GET_PRODUCTS_FROM_SERVER,
    products
  }
}

const getSingleProductFromServer = function(singleProduct) {
  return {
    type: GET_SINGLE_PRODUCT_FROM_SERVER,
    singleProduct
  }
}

const deleteProduct = id => ({
  type: DELETE_PRODUCT,
  id
})

const getNewProduct = product => ({
  type: GET_NEW_PRODUCT,
  product
})

const editProduct = product => ({
  type: EDIT_PRODUCT,
  product
})

//THUNK CREATORS
export const fetchProducts = () => {
  return async dispatch => {
    //dispatch(setIsLoading())

    let res = await axios.get('/api/products')
    let products = res.data
    const action = setProductsInStore(products)
    console.log("I'm done fetching..., let's dispatch to the store")
    dispatch(action)
  }
}

export const fetchSingleProduct = productId => {
  return async dispatch => {
    let res = await axios.get(`/api/products/${productId}`)
    let singleProduct = res.data
    const action = getSingleProductFromServer(singleProduct)
    dispatch(action)
  }
}

export const addProduct = product => async dispatch => {
  const {data: newProduct} = await axios.post('/api/products', product)
  dispatch(getNewProduct(newProduct))
}

export const removeProduct = productId => async dispatch => {
  await axios.delete(`/api/products/${productId}`)
  dispatch(deleteProduct(productId))
}

export const updateProduct = product => async dispatch => {
  const {data: updatedProduct} = await axios.put(
    `/api/products/${product.id}`,
    product
  )
  dispatch(editProduct(updatedProduct))
}

//REDUCER
const productReducer = (
  state = {
    all: [],
    selected: {},
    isLoading: false,
    hasErrored: false
  },
  action
) => {
  switch (action.type) {
    case GET_PRODUCTS_FROM_SERVER:
      return {
        ...state,
        isLoading: false,
        all: action.products
      }
    case GET_SINGLE_PRODUCT_FROM_SERVER:
      return {
        ...state,
        isLoading: false,
        selected: action.singleProduct
      }
    case GET_NEW_PRODUCT:
      return {...state, all: [...state.all, action.product]}
    case DELETE_PRODUCT:
      return {
        ...state,
        all: state.all.filter(product => product.id !== action.id)
      }
    case EDIT_PRODUCT:
      return {
        ...state,
        all: state.all.map(product => {
          if (product.id === action.product.id) return action.product
          return product
        })
      }
    default:
      return state
  }
}

export default productReducer

import axios from 'axios'

//ACTIONS
const GET_PRODUCTS_FROM_SERVER = 'GET_PRODUCTS_FROM_SERVER'

const GET_SINGLE_PRODUCT_FROM_SERVER = 'GET_SINGLE_PRODUCT_FROM_SERVER'

//ACTION CREATORS
export const setProductsInStore = function(products) {
  return {
    type: GET_PRODUCTS_FROM_SERVER,
    products
  }
}

export const getSingleProductFromServer = function(singleProduct) {
  return {
    type: GET_SINGLE_PRODUCT_FROM_SERVER,
    singleProduct
  }
}

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
    default:
      return state
  }
}

export default productReducer
/*
import axios from 'axios';
 // Action Type
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
 const initialState = {
	products: []
};
 //Action Creator
 const removeProduct = () => ({ type: REMOVE_PRODUCT });
 // Thunk Creator
 export const removedProduct = () => async (dispatch) => {
	try {
		await axios.delete('/api/:productId');
		dispatch(removeProduct());
	} catch (err) {
		console.error(err);
	}
};
// Reducer
export default function(state = initialState, action) {
	switch (action.type) {
		case REMOVE_PRODUCT:
			return state.products;
		default:
			return state;
	}
}*/

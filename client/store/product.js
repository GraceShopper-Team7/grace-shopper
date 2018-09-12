import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_PRODUCTS = 'GOT_PRODUCTS'

/**
 * INITIAL STATE
 */
const initialState = {
  all: [],
  selected: {},
  isLoading: false,
  hasError: false
}

/**
 * ACTION CREATORS
 */
const gotProducts = products => ({type: GOT_PRODUCTS, products})

/**
 * THUNK CREATOR
 */
export const fetchProducts = () => async dispatch => {
  try {
    const {data: products} = await axios.get('/api/products')
    dispatch(gotProducts(products))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return {...state, all: action.products}
    default:
      return state
  }
}
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

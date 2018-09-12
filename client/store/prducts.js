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
}

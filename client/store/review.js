import axios from 'axios'

//Action type
const GOT_NEW_REVIEW = 'GOT_NEW_REVIEW'

// Action Creator
const gotNewReview = review => {
  return {
    type: GOT_NEW_REVIEW,
    review
  }
}

//thunk creator

export const addReview = ({productId, userId, review}) => {
  return async dispatch => {
    let res = await axios.post(`/api/products/${productId}/addreview`, {
      userId,
      review
    })
    let newReview = res.data
    const action = gotNewReview(newReview)
    dispatch(action)
  }
}
const initialState = {
  reviews: []
}

//Reducer
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_NEW_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map(review => {
          if (review.productId === action.review.productId) return action.review
          return review
        })
      }
    default:
      return state
  }
}
export default reviewReducer

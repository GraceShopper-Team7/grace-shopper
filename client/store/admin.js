'use strict'

import axios from 'axios'

// Action types.
const GOT_ORDERS = 'GOT_ORDERS'
const UPDATE_ORDER = 'UPDATE_ORDER'

// Action creators.
const getOrders = orders => ({
  type: GOT_ORDERS,
  orders
})

const updateOrder = order => ({
  type: UPDATE_ORDER,
  order
})

// Thunk creators.
export const fetchOrders = () => async dispatch => {
  const {data: orders} = await axios.get(`/api/admin/orders`)
  dispatch(getOrders(orders))
}

export const shipOrder = (id, trackingNo) => async dispatch => {
  const {data: shippedOrder} = await axios.put(`/api/admin/orders/${id}`, {
    tracking: trackingNo
  })
  dispatch(updateOrder(shippedOrder))
}

const initialState = {
  all: [],
  selected: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDERS: {
      return {...state, all: action.orders}
    }
    case UPDATE_ORDER:
      return {
        ...state,
        all: state.all.filter(order => order.id !== action.order.id),
        selected: action.order
      }
    default:
      return state
  }
}

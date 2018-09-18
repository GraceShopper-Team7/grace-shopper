'use strict'

import axios from 'axios'

// Action types.
const GOT_ADDRESSES = 'GOT_ADDRESSES'
const SELECT_ADDRESS = 'SELECT_ADDRESS'
const GOT_NEW_ADDRESS = 'GOT_NEW_ADDRESS'

// Action creators.
const getAddresses = addresses => ({
  type: GOT_ADDRESSES,
  addresses
})

const setSelectedAddress = id => ({
  type: SELECT_ADDRESS,
  id
})

const setNewAddress = address => {
  return {
    type: GOT_NEW_ADDRESS,
    address
  }
}
// Thunk creators.
export const fetchAddresses = userId => async dispatch => {
  const {data: addresses} = await axios.get(`/api/users/${userId}/addresses`)
  dispatch(getAddresses(addresses))
}

export const selectAddress = id => dispatch => {
  dispatch(setSelectedAddress(id))
}

export const addAddress = address => async dispatch => {
  try {
    const res = await axios.post('/auth/signup', address)
    dispatch(setNewAddress(res.data))
  } catch (err) {
    console.error(err)
  }
}
const initialState = {
  all: [],
  selected: null,
  isFetching: true,
  address: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ADDRESSES: {
      const addresses = action.addresses
      const selected = addresses.length === 0 ? null : addresses[0].id
      return {
        ...state,
        all: addresses,
        selected: selected,
        isFetching: false
      }
    }
    case SELECT_ADDRESS:
      return {...state, selected: action.id}
    case GOT_NEW_ADDRESS:
      return {
        ...state,
        address: action.address
      }
    default:
      return state
  }
}

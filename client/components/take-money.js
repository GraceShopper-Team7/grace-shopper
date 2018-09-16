import axios from 'axios'
import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default class TakeMoney extends React.Component {
  onToken = async token => {
    console.log('take money', this.props)
    await axios.post('/api/cart', {
      token,
      amount: this.props.amount,
      orderId: this.props.orderId
    })
    console.log(this.props.history)
    this.props.history.push(`/orderProducts/${this.props.orderId}`)
  }

  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        amount={this.props.amount}
        stripeKey="pk_test_2eOKaGIWB9JWB9j6YyqmKMdf"
      />
    )
  }
}

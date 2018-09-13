import {connect} from 'react-redux'
import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {fetchOrderProducts} from '../store/cart'

class Cart extends Component {
  componentDidMount() {
    this.props.fetchInitialOrderProducts()
  }

  render() {
    console.log('this.props-render: ', this.props)

    const orderProducts = this.props.cart.all
    const priceArray = orderProducts.map(function(product) {
      return product.price
    })
    console.log('priceArray: ', priceArray)
    const totalPrice = priceArray.reduce((a, b) => a + b, 0)
    console.log('totalPrice: ', totalPrice)

    return (
      <div>
        <div className="header-cart">
          <h1>CART</h1>
        </div>

        <div className="current-order-cart">
          <h3>CURRENT ORDER</h3>
          <ul>
            {orderProducts &&
              orderProducts.map(product => (
                <li key={product.updatedAt}>
                  <NavLink to={`/products/${product.id}`}>
                    {product.title}
                  </NavLink>
                  <img
                    src={`/${product.imageUrl}`}
                    width="100px"
                    height="100px"
                  />
                  {product.price}
                  <span>
                    {' '}
                    {/* once ready we add the following:
                      -delete from cart button */}
                  </span>
                </li>
              ))}
          </ul>
          <h4>Total: {totalPrice} </h4>
        </div>

        <div className="past-order-cart">
          <h3>PAST ORDER(S)</h3>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {fetchInitialOrderProducts: () => dispatch(fetchOrderProducts())}
}

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default ConnectedCart

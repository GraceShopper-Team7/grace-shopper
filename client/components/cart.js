import {connect} from 'react-redux'
import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {fetchOrderProducts, removeProductFromOrderProducts} from '../store/cart'

class Cart extends Component {
  componentDidMount() {
    this.props.fetchInitialOrderProducts()
    this.removeProductFromCart = this.removeProductFromCart.bind(this)
  }

  removeProductFromCart(product) {
    this.props.removeProductFromOrderProducts(product)
  }

  render() {
    let orders = this.props.cart.all
    const user = this.props.user
    orders = orders.filter(order => order.userId === user.id)

    let currentOrders = orders.filter(order => order.status === 'created')
    let pastOrders = orders.filter(order => order.status !== 'created')
    let currentOrder = currentOrders[0]

    let findTotalPrice = function findTotalPrice(productsArray) {
      let total = 0
      productsArray.forEach(product => {
        total += product.price
      })
      return total
    }

    return (
      <div>
        <div className="header-cart">
          <h1>CART</h1>
        </div>

        <div className="current-order-cart">
          <h3>CURRENT ORDER</h3>
          {/* {currentOrder && currentOrder.length ? ( */}
          <ul>
            {currentOrder &&
              currentOrder.products.map(product => (
                <li key={product.id}>
                  <NavLink to={`/products/${product.id}`}>
                    {product.title}
                  </NavLink>
                  <img
                    src={`/${product.imageUrl}`}
                    width="100px"
                    height="100px"
                  />
                  <p>Quantity: {product.orderProduct.quantity}</p>
                  <p>Price: {product.price}</p>
                  <span>
                    {' '}
                    <button
                      type="submit"
                      onClick={() => this.removeProductFromCart(product)}
                    >
                      Remove from Cart!
                    </button>
                  </span>
                </li>
              ))}
            <h4>
              Total: {currentOrder && findTotalPrice(currentOrder.products)}{' '}
            </h4>
          </ul>
          {/* ): (<p>~~~</p>) } */}
        </div>

        <div className="past-order-cart">
          <h3>PAST ORDER(S)</h3>
          {user && user.id !== undefined ? (
            pastOrders && pastOrders.length ? (
              <ul>
                {pastOrders &&
                  pastOrders.map(order => (
                    <li key={order.id}>
                      <h3>ORDER {order.tracking}</h3>
                      <ul>
                        {order.products &&
                          order.products.map(product => (
                            <li key={product.id}>
                              <NavLink to={`/products/${product.id}`}>
                                {product.title}
                              </NavLink>
                              <img
                                src={`/${product.imageUrl}`}
                                width="100px"
                                height="100px"
                              />
                              {product.price}
                            </li>
                          ))}
                      </ul>
                      <h4>
                        Total:{' '}
                        {order.products && findTotalPrice(order.products)}
                      </h4>
                    </li>
                  ))}
              </ul>
            ) : (
              <p>~~~no past orders yet!~~~</p>
            )
          ) : (
            <p>~~~login or sign up to view past orders!~~~</p>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialOrderProducts: () => dispatch(fetchOrderProducts()),
    removeProductFromOrderProducts: product => {
      dispatch(removeProductFromOrderProducts(product))
    }
  }
}

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default withRouter(ConnectedCart)

import {connect} from 'react-redux'
import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {fetchOrderProducts, removeProductFromOrderProducts} from '../store/cart'
import {me} from '../store/user'

class Cart extends Component {
  constructor() {
    super()
    this.removeProductFromCart = this.removeProductFromCart.bind(this)
  }

  componentDidMount() {
    this.props.fetchInitialUser()
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user)
      this.props.fetchInitialOrderProducts(this.props.user)
  }

  removeProductFromCart(product) {
    this.props.removeProductFromOrderProducts(product)
  }

  render() {
    const orders = this.props.cart
    const user = this.props.user

    let currentOrderProducts = orders.currentOrder.products
    let pastOrders = orders.pastOrdersArr

    let findTotalPrice = function(productsArray) {
      let total = 0
      productsArray.forEach(product => {
        total += product.price * product.orderProduct.quantity
      })
      return total
    }

    let findProductTotal = function(price, qty) {
      return price * qty
    }
    console.log('$$$$currentOrderProducts$$$$: ', currentOrderProducts)

    currentOrderProducts = currentOrderProducts.filter(function(product) {
      return product.id
    })

    // if (currentOrderProducts.indexOf([]) !== -1) {
    //   return <h3>one moment please</h3>
    // }

    return (
      <div>
        <div className="header-cart">
          <h1>CART</h1>
        </div>

        <div className="current-order-cart">
          <h3>CURRENT ORDER</h3>

          <ul>
            {currentOrderProducts[0] &&
              currentOrderProducts.map(product => (
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
                  <p>Price per product: {product.price}</p>
                  <p>
                    Product Total:{' '}
                    {findProductTotal(
                      product.price,
                      product.orderProduct.quantity
                    )}
                  </p>
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
              Cart Total:{' '}
              {currentOrderProducts && findTotalPrice(currentOrderProducts)}{' '}
            </h4>
          </ul>
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
    fetchInitialUser: () => dispatch(me()),
    fetchInitialOrderProducts: user => dispatch(fetchOrderProducts(user)),
    removeProductFromOrderProducts: product => {
      dispatch(removeProductFromOrderProducts(product))
    }
  }
}

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default withRouter(ConnectedCart)

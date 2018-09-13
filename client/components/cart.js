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

    let orders = this.props.cart.all
    const user = this.props.user
    console.log('*****ORDERS', orders)
    console.log('USER: ', user)

    orders = orders.filter(order => order.userId === user.id)
    console.log('FILTERED ORDERS: ', orders)

    let currentOrders = orders.filter(order => order.status === 'created')
    let pastOrders = orders.filter(order => order.status !== 'created')
    console.log('CURRENT ORDERS: ', currentOrders)
    console.log('*****PAST ORDERS: ', pastOrders)

    let currentOrder = currentOrders[0]
    console.log('CURRENT ORDER: ', currentOrder)
    let pastOrderProductArrs = pastOrders.map(order => order.products)
    console.log('*****PastOrderProduct as Objects: ', pastOrderProductArrs)

    let findTotalPrice = function findTotalPrice(productsArray) {
      let total = 0
      productsArray.forEach(product => {
        total += product.price
      })
      return total
    }
    // const priceArray = orders
    //   .map(function(order) {
    //     return order.products
    //   })
    //   .map(function(productArr) {
    //     return productArr
    //     // .forEach(product => {
    //     //   return product.price
    //     // })
    //   })
    // console.log('priceArray: ', priceArray)

    // const totalPrice = priceArray.reduce((a, b) => a + b, 0)
    // console.log('totalPrice: ', totalPrice)

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
                  {product.price}
                  <span>
                    {' '}
                    {/* once ready we add the following:
                      -delete from cart button */}
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
  return {fetchInitialOrderProducts: () => dispatch(fetchOrderProducts())}
}

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default ConnectedCart

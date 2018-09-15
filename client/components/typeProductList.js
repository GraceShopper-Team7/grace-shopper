import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {
  fetchProducts,
  decreaseQuantityAfterAddingToCart
} from '../store/product'
import {fetchOrderProducts, addProductToOrderProducts} from '../store/cart'
//import {me} from '../store/user'

class TypeProductList extends Component {
  constructor() {
    super()
    this.addNewOrderProduct = this.addNewOrderProduct.bind(this)
  }

  componentDidMount() {
    this.props.fetchInitialProducts()
    //this.props.fetchInitialUser()
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user)
      this.props.fetchInitialOrderProducts(this.props.user)
  }

  addNewOrderProduct(product, user) {
    event.preventDefault()
    this.props.addProductToOrderProducts(product, user)
    //this.props.decreaseQuantityAfterAddingToCart(product)
    //^^the updateProductQuantity is happening before the addProductToOrderProducts completes so the inventory quantity is not rerendering without refresh
  }

  render() {
    const typeId = Number(this.props.match.params.typeId)
    const products = this.props.products.all

    const filteredProducts = products.filter(
      product => product.typeId === typeId
    )

    if (filteredProducts.length < 1) {
      return <h4>no teas here yet!</h4>
    }

    const user = this.props.user
    return (
      <div className="type-list">
        <ul>
          {filteredProducts &&
            filteredProducts.map(product => (
              <li key={product.id}>
                <NavLink to={`/products/${product.id}`}>
                  {product.title}
                </NavLink>
                <img
                  src={`/${product.imageUrl}`}
                  width="100px"
                  height="100px"
                />
                <p>Price: {product.price}</p>
                <p>Inventory Quantity: {product.inventoryQty}</p>
                <span>
                  {' '}
                  <button
                    type="submit"
                    onClick={() => this.addNewOrderProduct(product, user)}
                  >
                    Add to Cart!
                  </button>
                </span>
              </li>
            ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //fetchInitialUser: () => dispatch(me()),
    fetchInitialProducts: () => dispatch(fetchProducts()),
    fetchInitialOrderProducts: user => dispatch(fetchOrderProducts(user)),

    addProductToOrderProducts: async (product, user) => {
      await dispatch(addProductToOrderProducts(product, user))
      await dispatch(decreaseQuantityAfterAddingToCart(product))
    }
  }
}

const ConnectedTypeProductList = connect(mapStateToProps, mapDispatchToProps)(
  TypeProductList
)

export default ConnectedTypeProductList

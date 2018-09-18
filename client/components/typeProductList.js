import React, {Component} from 'react'
import {connect} from 'react-redux'

import {
  fetchProducts,
  decreaseQuantityAfterAddingToCart
} from '../store/product'
import {addProductToOrderProducts} from '../store/cart'
import ProductDisplay from './product-display'

class TypeProductList extends Component {
  constructor() {
    super()
    this.addNewOrderProduct = this.addNewOrderProduct.bind(this)
  }

  componentDidMount() {
    this.props.fetchInitialProducts()
  }

  addNewOrderProduct(product, user) {
    this.props.addProductToOrderProducts(product, user)
  }

  render() {
    const typeId = Number(this.props.match.params.typeId)
    const products = this.props.products.all
    const user = this.props.user

    const filteredProducts = products.filter(
      product => product.typeId === typeId
    )

    if (filteredProducts.length < 1) {
      return <h4>no teas here yet!</h4>
    }

    return (
      <div className="type-list">
        <ul>
          {filteredProducts &&
            filteredProducts.map(product => (
              <li key={product.id}>
                <ProductDisplay
                  product={product}
                  handleClick={this.handleClick}
                />
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
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialProducts: () => dispatch(fetchProducts()),
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

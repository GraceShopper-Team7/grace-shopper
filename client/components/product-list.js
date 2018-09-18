import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import {fetchProducts, removeProduct} from '../store/product'
import AllProducts from './product-display'

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.loadProducts()
  }
  handleClick(product) {
    this.props.deleteProduct(product.id)
  }

  render() {
    const products = this.props.products || []
    const user = this.props.user
    return products.length > 0 ? (
      <div>
        <h1>Teas</h1>
        <Link to="/products/add">Add Product</Link>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <AllProducts product={product} handleClick={this.handleClick} />
              {user.roleId === 1 && (
                <button
                  type="submit"
                  value={product}
                  onClick={() => this.handleClick(product)}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div>Empty Inventory!</div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  products: state.products.all
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
  deleteProduct: id => dispatch(removeProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)

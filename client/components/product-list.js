import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import {fetchProducts} from '../store/product'

class ProductList extends Component {
  constructor(props) {
    super(props)
    console.log(props)
  }

  componentDidMount() {
    this.props.loadProducts()
  }

  render() {
    const products = this.props.products || []
    console.log(this.props)
    if (products.length > 0) {
      return (
        <div>
          <h1>Teas</h1>
          <Link to="/products/add">Add Product</Link>
          <ul>
            {products.map(product => (
              <li key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    alt=""
                    width="100px"
                    height="100px"
                  />
                  <h3>{product.title}</h3>
                  <p>{product.rating}</p>
                  <p>{product.price}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )
    }
    return <div>There are no products in the database.</div>
  }
}

const mapStateToProps = state => ({
  products: state.products.all
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)

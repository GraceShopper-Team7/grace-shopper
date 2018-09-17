import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/product'

class SearchProduct extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('Inside Searched Products')
    this.props.loadProducts()
  }
  render() {
    console.log('Search String from store ', this.props)
    const searchString = this.props.searchString
    console.log('Search String from store ', searchString)
    const products = this.props.allProducts || []
    const filteredProducts = products.filter(
      product => product.title === searchString
    )

    return filteredProducts.length > 0 ? (
      <div>
        <h1>Teas</h1>
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id}>
              <h3>{product.title}</h3>
              <p>Price: {product.price}</p>
              <p>Inventory Quantity: {product.inventoryQty}</p>
              ) : (
              <p />
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
  searchString: state.searchString,
  allProducts: state.products.all
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct)

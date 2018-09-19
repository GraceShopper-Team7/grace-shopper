import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import productDisplay from './product-display'

class SearchProduct extends Component {
  componentDidMount() {
    console.log('Inside Searched Products')
    this.props.loadProducts()
  }
  //   var string = "This is a test string",
  // substring = "test";
  // if(string.indexOf(substring) >= 0)
  //   //substring exist
  // else
  //   //substring does not exist
  render() {
    console.log('Search String from store ', this.props)
    const searchString = this.props.searchString
    console.log('Search String from store ', searchString)
    const products = this.props.allProducts || []
    const filteredProducts = products.filter(
      product => product.title.indexOf(searchString) >= 0
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
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div>Product Not Found!!!!!</div>
    )
  }
}

const mapStateToProps = state => ({
  searchString: state.products.searchString,
  allProducts: state.products.all
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchProducts} from '../store/product'

class SearchProduct extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
    const searchString = this.props.searchString
    console.log('Search String from store ', searchString)
    const products = this.props.products.all
    const value = this.props.value
    const filteredProducts = products.filter(product => product.title === value)
    if (filteredProducts.length < 1) {
      return <h4>No Teas found...!</h4>
    }
    return (
      <div>
        <ul />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    searchString: state.searchString,
    allProducts: state.all
  }
}
// const mapDispatchToProps = (dispatch) => {
// 	// return {
// 	// 	loadProducts: () => dispatch(fetchProducts())
// 	// };
// };
export default connect(mapStateToProps, null)(SearchProduct)

import React, {Component} from 'react'
import {connect} from 'react-redux'
//import {NavLink} from 'react-router-dom'
import {fetchSingleProduct} from '../store/product'

class SingleProduct extends Component {
  componentDidMount() {
    const productId = Number(this.props.match.params.id)
    console.log('this.props-mount: ', this.props)
    console.log('productId-mount: ', productId)
    this.props.fetchSingleProduct(productId)
  }

  render() {
    console.log('this.props-render: ', this.props)
    const product = this.props.singleProduct
    console.log('product-render: ', product)

    if (!product) {
      return <h1>this tea does not exist yet!</h1>
    }

    return (
      <div>
        <h1>{product.title}</h1>
        <img src={`/${product.imageUrl}`} />

        <h3>Tea details...</h3>
        <p>price: {product.price}</p>
        <p>current inventory: {product.inventoryQty}</p>
        <p>description: {product.description}</p>
        <p>
          ingredients: {product.ingredients && product.ingredients[0]},{' '}
          {product.ingredients && product.ingredients[1]},{' '}
          {product.ingredients && product.ingredients[2]}
        </p>
        {/* once ready we add the following:
          -add to cart button component
          -delete button component (admin) */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.products.selected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: productId => {
      dispatch(fetchSingleProduct(productId))
    }
  }
}

const ConnectedSingleProduct = connect(mapStateToProps, mapDispatchToProps)(
  SingleProduct
)

export default ConnectedSingleProduct

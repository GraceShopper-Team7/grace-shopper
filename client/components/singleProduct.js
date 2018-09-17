import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleProduct} from '../store/product'
import EditProduct from './edit-product'
import {Tab} from '@material-ui/core'
class SingleProduct extends Component {
  componentDidMount() {
    const productId = Number(this.props.match.params.id)
    this.props.fetchSingleProduct(productId)
  }

  render() {
    console.log('this.props-render: ', this.props)
    const product = this.props.singleProduct
    const reviews = product.reviews || []
    console.log('product-render: ', product)

    if (!product) {
      return <h1>this tea does not exist yet!</h1>
    }

    return (
      <div>
        <h1>{product.title}</h1>
        <img src={`/${product.imageUrl}`} width="100px" height="100px" />

        <h3>Tea details...</h3>
        <p>price: {product.price}</p>
        <p>current inventory: {product.inventoryQty}</p>
        <p>description: {product.description}</p>
        <p>
          ingredients: {product.ingredients && product.ingredients[0]},{' '}
          {product.ingredients && product.ingredients[1]},{' '}
          {product.ingredients && product.ingredients[2]}
        </p>
        {/* <Tab label="Write a Review" href={`/products/${product.id}/addreview`} /> */}
        <Link to={`/products/${product.id}/addreview`}>Write a Review</Link>
        {reviews.length > 0 ? (
          <div>
            <br />
            <hr />
            <h2 align="center">Customers Reviews</h2>
            <hr />
            {reviews.map(review => (
              <p key={review.id}>
                <label>Rating : {review.rating}</label>
                <label>Review : {review.content}</label>
              </p>
            ))}
          </div>
        ) : (
          <div>There is no review for this Product.</div>
        )}
        {/* once ready we add the following:
          -add to cart button component
          -delete button component (admin) */}
        <EditProduct product={product} history={this.props.history} />
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

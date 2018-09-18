import React from 'react'
import {Link} from 'react-router-dom'
import GradeIcon from '@material-ui/icons/Grade'

const ProductDisplay = props => {
  const product = props.product
  const rating = Math.floor(
    product.reviews.reduce((sum, review) => sum + review.rating, 0) /
      product.reviews.length
  )
  let grades = []
  for (let i = 0; i < rating; ++i) {
    grades.push(<GradeIcon />)
  }

  return (
    <Link to={`/products/${product.id}`}>
      <img src={`/${product.imageUrl}`} alt="" width="100px" height="100px" />
      <h3>{product.title}</h3>
      <p>Price: {product.price}</p>
      <p>Inventory Quantity: {product.inventoryQty}</p>
      <p>{grades}</p>
    </Link>
  )
}
export default ProductDisplay

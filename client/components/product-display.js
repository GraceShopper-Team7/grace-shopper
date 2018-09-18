import React from 'react'
import {Link} from 'react-router-dom'

const AllProducts = props => {
  const product = props.product
  console.log('in all products comp', props)
  return (
    <Link to={`/products/${product.id}`}>
      <img src={`/${product.imageUrl}`} alt="" width="100px" height="100px" />
      <h3>{product.title}</h3>
      <p>Price: {product.price}</p>
      <p>Inventory Quantity: {product.inventoryQty}</p>
    </Link>
  )
}
export default AllProducts

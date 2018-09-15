import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchProducts} from '../store/product'
import {addProductToOrderProducts} from '../store/cart'

class TypeProductList extends Component {
  constructor() {
    super()
    this.addNewOrderProduct = this.addNewOrderProduct.bind(this)
  }

  componentDidMount() {
    this.props.fetchInitialProducts()
    //this.props.fetchInitialOrderProducts()
  }

  addNewOrderProduct(product, user) {
    event.preventDefault()
    this.props.addProductToOrderProducts(product, user)

    //check if there is a 'created' order in the Orders table
    //if not a make a new 'create' order
    //add item to OrderProducts table, orderId as the 'created' order
    //delete 1 from inventory quantity in products table
  }

  render() {
    console.log('TypeProductList_this.props: ', this.props)
    const typeId = Number(this.props.match.params.typeId)
    //console.log('typeId: ', typeId)

    const products = this.props.products.all
    const filteredProducts = products.filter(
      product => product.typeId === typeId
    )
    console.log('TypeProductList_this.props: ', this.props)

    console.log('P*R*O*D*U*C*T*S: ', filteredProducts)
    if (filteredProducts.length < 1) {
      return <h4>no teas here yet!</h4>
    }

    const user = this.props.user
    console.log('U*S*E*R: ', user)
    return (
      <div className="type-list">
        <ul>
          {filteredProducts &&
            filteredProducts.map(product => (
              <li key={product.id}>
                <NavLink to={`/products/${product.id}`}>
                  {product.title}
                </NavLink>
                <img
                  src={`/${product.imageUrl}`}
                  width="100px"
                  height="100px"
                />
                <p>Price: {product.price}</p>
                <p>Inventory Quantity: {product.inventoryQty}</p>
                <span>
                  {' '}
                  <button
                    type="submit"
                    onClick={() => this.addNewOrderProduct(product, user)}
                  >
                    Add to Cart!
                  </button>
                  {/* once ready we add the following:
                      -add to cart button component
                      -delete button component (admin) */}
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
    //cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialProducts: () => dispatch(fetchProducts()),
    //fetchInitialOrderProducts: () => dispatch(fetchOrderProducts())
    addProductToOrderProducts: (product, user) =>
      dispatch(addProductToOrderProducts(product, user))
  }
}

const ConnectedTypeProductList = connect(mapStateToProps, mapDispatchToProps)(
  TypeProductList
)

export default ConnectedTypeProductList

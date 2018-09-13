import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchProducts} from '../store/product'
import {fetchOrderProducts} from '../store/cart'

class TypeProductList extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchInitialProducts()
    this.props.fetchInitialOrderProducts()
  }

  handleSubmit(event) {
    event.preventDefault()

    //needs to add item to the cart in the store
    //needs to decrement the inventory quantity in store & db

    //example:
    // const {name, newMessageEntry} = this.props
    // const content = newMessageEntry
    // const {channelId} = this.props
    // this.props.postMessage({name, content, channelId})
  }

  render() {
    console.log('TypeProductList_this.props: ', this.props)
    const typeId = Number(this.props.match.params.typeId)
    console.log('typeId: ', typeId)

    const products = this.props.products.all
    const filteredProducts = products.filter(
      product => product.typeId === typeId
    )
    if (filteredProducts.length < 1) {
      return <h4>no teas here yet!</h4>
    }

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
                {product.price}
                <span>
                  {' '}
                  <button type="submit" onClick={this.handleSubmit}>
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
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialProducts: () => dispatch(fetchProducts()),
    fetchInitialOrderProducts: () => dispatch(fetchOrderProducts())
  }
}

const ConnectedTypeProductList = connect(mapStateToProps, mapDispatchToProps)(
  TypeProductList
)

export default ConnectedTypeProductList

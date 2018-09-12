import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchProducts} from '../store/product'
//^^check to see what Shabnam names the file and integrate the categoryProductListReducer into it

class TypeProductList extends Component {
  componentDidMount() {
    this.props.fetchInitialProducts()
  }

  render() {
    console.log('TypeProductList_this.props: ', this.props)
    const typeId = Number(this.props.match.params.typeId)
    //^^not sure is this is right....do we need to pass as props down in the original component
    //^^no this should be right, similar to StackChat filtered messages by channel
    //no this doesnt make sense bc the URI in the nav link does not include categoryId/typeId
    //!!!!!!!
    const products = this.props.products.all
    const filteredProducts = products
    // .filter(
    //   product => product.typeId === typeId
    //)

    return (
      <div className="type-list">
        <p>BEEPBEEP</p>
        <ul>
          {filteredProducts &&
            filteredProducts.map(product => (
              <li key={product.id}>
                <NavLink to={`/products/${product.id}`}>
                  {product.title}
                </NavLink>
                <img src={product.imageUrl} />
                {product.price}
                <span>
                  {' '}
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
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialProducts: () => dispatch(fetchProducts())
  }
}

const ConnectedTypeProductList = connect(mapStateToProps, mapDispatchToProps)(
  TypeProductList
)

export default ConnectedTypeProductList

import React, {Component} from 'react'
import {connect} from 'react-redux'

import {
  fetchProducts,
  decreaseQuantityAfterAddingToCart
} from '../store/product'
import {addProductToOrderProducts} from '../store/cart'
import ProductDisplay from './product-display'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
})

class TypeProductList extends Component {
  constructor() {
    super()
    this.addNewOrderProduct = this.addNewOrderProduct.bind(this)
  }

  componentDidMount() {
    this.props.fetchInitialProducts()
  }

  addNewOrderProduct(product, user) {
    this.props.addProductToOrderProducts(product, user)
  }

  render() {
    const typeId = Number(this.props.match.params.typeId)
    const products = this.props.products.all
    const user = this.props.user

    const filteredProducts = products.filter(
      product => product.typeId === typeId
    )
    const {classes} = this.props
    return products.length > 0 ? (
      <div className={classes.root}>
        <Grid container spacing={40}>
          {filteredProducts.map(product => (
            <Grid item key={product.id} sm={6} md={4} lg={3}>
              <ProductDisplay
                product={product}
                handleClick={this.handleClick}
                user={user}
                addToCart={this.addNewOrderProduct}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    ) : (
      <div>Empty Inventory!</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialProducts: () => dispatch(fetchProducts()),
    addProductToOrderProducts: async (product, user) => {
      await dispatch(addProductToOrderProducts(product, user))
      await dispatch(decreaseQuantityAfterAddingToCart(product))
    }
  }
}

const withStyleTypeProductList = withStyles(styles)(TypeProductList)
const ConnectedTypeProductList = connect(mapStateToProps, mapDispatchToProps)(
  withStyleTypeProductList
)

export default ConnectedTypeProductList

TypeProductList.propTypes = {
  classes: PropTypes.object.isRequired
}

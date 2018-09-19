import {connect} from 'react-redux'
import React, {Component} from 'react'
import {
  fetchProducts,
  decreaseQuantityAfterAddingToCart
} from '../store/product'
import {addProductToOrderProducts} from '../store/cart'
import ProductDisplay from './product-display'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
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

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.addNewOrderProduct = this.addNewOrderProduct.bind(this)
  }

  componentDidMount() {
    this.props.loadProducts()
  }
  addNewOrderProduct(product, user) {
    this.props.addProductToOrderProducts(product, user)
  }
  render() {
    const {classes} = this.props
    const products = this.props.products || []
    const user = this.props.user
    console.log('PRODUCTS: ', products)

    return products.length > 0 ? (
      <div className={classes.root}>
        <Grid container spacing={40}>
          {products.map(product => (
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

const mapStateToProps = state => ({
  user: state.user,
  products: state.products.all
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
  addProductToOrderProducts: async (product, user) => {
    await dispatch(addProductToOrderProducts(product, user))
    await dispatch(decreaseQuantityAfterAddingToCart(product))
  }
})

const withStyleProductList = withStyles(styles)(ProductList)
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyleProductList
)

ProductList.propTypes = {
  classes: PropTypes.object.isRequired
}

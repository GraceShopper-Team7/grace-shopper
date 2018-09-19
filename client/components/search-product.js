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
class SearchProduct extends Component {
  constructor(props) {
    super(props)
    this.addNewOrderProduct = this.addNewOrderProduct.bind(this)
  }

  componentDidMount() {
    console.log('Inside Searched Products')
    this.props.loadProducts()
  }
  addNewOrderProduct(product, user) {
    this.props.addProductToOrderProducts(product, user)
  }
  render() {
    const {classes} = this.props
    const searchString = this.props.searchString
    const products = this.props.allProducts || []
    const user = this.props.user
    const filteredProducts = products.filter(
      product => product.title.indexOf(searchString) >= 0
    )

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
      <div>No Product Found!</div>
    )
  }
}

const mapStateToProps = state => ({
  searchString: state.products.searchString,
  allProducts: state.products.all,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  loadProducts: () => dispatch(fetchProducts()),
  addProductToOrderProducts: async (product, user) => {
    await dispatch(addProductToOrderProducts(product, user))
    await dispatch(decreaseQuantityAfterAddingToCart(product))
  }
})
const withStyleSearchProduct = withStyles(styles)(SearchProduct)
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyleSearchProduct
)

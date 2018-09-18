import {connect} from 'react-redux'
import React, {Component} from 'react'
import {fetchProducts, removeProduct} from '../store/product'
import ProductDisplay from './product-display'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4
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
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6
  }
})

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.loadProducts()
  }
  handleClick(product) {
    this.props.deleteProduct(product.id)
  }

  render() {
    const {classes} = this.props
    const products = this.props.products || []
    const user = this.props.user
    return products.length > 0 ? (
      <div className={classes.root}>
        <Grid container spacing={40}>
          {products.map(product => (
            <Grid item key={product.id} sm={6} md={4} lg={3}>
              <ProductDisplay
                product={product}
                handleClick={this.handleClick}
              />
              {user.roleId === 1 && (
                <button
                  type="submit"
                  value={product}
                  onClick={() => this.handleClick(product)}
                >
                  Delete
                </button>
              )}
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
  deleteProduct: id => dispatch(removeProduct(id))
})

const withStyleProductList = withStyles(styles)(ProductList)
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyleProductList
)

ProductList.propTypes = {
  classes: PropTypes.object.isRequired
}

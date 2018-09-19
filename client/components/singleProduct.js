import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, removeProduct} from '../store/product'
import {withStyles} from '@material-ui/core/styles'
import EditProduct from './edit-product'
import GradeIcon from '@material-ui/icons/Grade'
import AddShoppingCardIcon from '@material-ui/icons/AddShoppingCart'
import Paper from '@material-ui/core/Paper'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  tab: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px `
  },
  gridList: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  tabContent: {
    marginTop: theme.spacing.unit * 5,
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing.unit * 0}px ${theme.spacing.unit * 28}px ${theme
      .spacing.unit * 3}px ${theme.spacing.unit * 28}px`
  }
})

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      tab: 0
    }
  }

  componentDidMount() {
    const productId = Number(this.props.match.params.id)
    this.props.fetchSingleProduct(productId)
  }

  handleClick(product) {
    this.props.deleteProduct(product.id)
  }

  handleChange = (event, tab) => {
    this.setState({tab})
  }

  render() {
    const {classes} = this.props
    const product = this.props.singleProduct
    const reviews = product.reviews || []
    const rating = Math.floor(
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    )
    let grades = []
    for (let i = 0; i < rating; ++i) {
      grades.push(<GradeIcon />)
    }

    let ingredients = []
    for (
      let i = 0;
      product.ingredients && i < product.ingredients.length;
      i++
    ) {
      ingredients.push(
        <Typography variant="body1">
          <li>{product.ingredients[i]}</li>
        </Typography>
      )
    }

    if (!product) {
      return <h1>this tea does not exist yet!</h1>
    }

    return (
      <div>
        <GridList cellHeight={210} className={classes.gridList} cols={5}>
          <GridListTile cols={1} rows={1}>
            <img src={`/${product.imageUrl}`} width="100%" height="100%" />
          </GridListTile>
          <GridListTile cols={2} rows={1}>
            <Typography style={{paddingLeft: '20px'}}>
              <Typography
                variant="display2"
                color="primary"
                style={{fontFamily: 'Satisfy'}}
              >
                {product.title}
              </Typography>
              <Typography>{grades}</Typography>
              <Typography variant="body2">
                Price: ${(product.price / 100).toFixed(2)}
              </Typography>
              <Typography variant="body2">
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  style={{marginTop: '40px'}}
                  onClick={() => console.log('add to cart')}
                >
                  <AddShoppingCardIcon style={{paddingRight: '0.2em'}} /> Add to
                  cart!
                </Button>
              </Typography>
              <Typography style={{paddingTop: '10px'}}>
                Current Inventory: {product.inventoryQty}
              </Typography>
            </Typography>
          </GridListTile>
        </GridList>
        <Paper className={classes.tab}>
          <Tabs
            value={this.state.tab}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Desicription" />
            <Tab label="Reviews" />
            {this.props.user.roleId === 1 && <Tab label="Admin" />}
          </Tabs>
          <Typography className={classes.tabContent}>
            {this.state.tab === 0 && (
              <Typography>
                <Typography
                  variant="body1"
                  style={{fontFamily: 'inherit', textTransform: 'none'}}
                >
                  {product.description}
                </Typography>
                <Typography variant="body2" style={{marginTop: '1em'}}>
                  Ingredients
                </Typography>
                <Typography>{ingredients}</Typography>
              </Typography>
            )}
            {this.state.tab === 1 && (
              <Typography>
                <Button
                  variant="outlined"
                  href={`/products/${product.id}/addreview`}
                  style={{marginTop: '0px', marginBottom: '50px'}}
                >
                  Write a Review
                </Button>
                {reviews.length > 0 ? (
                  <Typography>
                    <Typography variant="headline" gutterBottom>
                      Customers Reviews
                    </Typography>
                    {reviews.map(review => (
                      <Typography key={review.id}>
                        <Typography variant="body1">
                          Rating : {review.rating}
                        </Typography>
                        <Typography variant="body1">
                          Review : {review.content}
                        </Typography>
                      </Typography>
                    ))}
                  </Typography>
                ) : (
                  <div>There is no review for this Product.</div>
                )}
              </Typography>
            )}
            {this.state.tab === 2 && (
              <Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  value={product}
                  onClick={() => this.handleClick(product)}
                >
                  Delete
                </Button>
                <EditProduct product={product} history={this.props.history} />
              </Typography>
            )}
          </Typography>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.products.selected,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProduct: productId => {
      dispatch(fetchSingleProduct(productId))
    },
    deleteProduct: id => {
      dispatch(removeProduct(id))
    }
  }
}

const ConnectedSingleProduct = connect(mapStateToProps, mapDispatchToProps)(
  SingleProduct
)

export default withStyles(styles)(ConnectedSingleProduct)

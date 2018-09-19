import {connect} from 'react-redux'
import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {fetchOrderProducts, removeProductFromOrderProducts} from '../store/cart'
import {me} from '../store/user'
import {withStyles} from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3
  },
  order: {
    width: 'auto',
    margin: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  pastOrders: {
    marginTop: theme.spacing.unit * 10
  },
  product: {
    '&:hover': {
      background: '#f8f7f9'
    }
  }
})

class Cart extends Component {
  constructor() {
    super()
    this.removeProductFromCart = this.removeProductFromCart.bind(this)
  }

  componentDidMount() {
    this.props.fetchInitialUser()
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user)
      this.props.fetchInitialOrderProducts(this.props.user)
  }

  removeProductFromCart(product) {
    this.props.removeProductFromOrderProducts(product)
  }

  renderOrder = (order, current) => {
    const {classes} = this.props
    if (!order) {
      return <Typography />
    }
    return (
      <Paper className={classes.order}>
        <List disablePadding>
          <ListItem>
            {order.id && (
              <Typography variant="title">
                Order #{!order.tracking
                  ? '(no tracking number)'
                  : order.tracking}
              </Typography>
            )}
          </ListItem>
          {order.products.map(product => (
            <ListItem className={classes.product} key={product.title}>
              {current && (
                <Button
                  color="secondary"
                  onClick={() => this.removeProductFromCart(product)}
                  align="left"
                >
                  <DeleteIcon />
                </Button>
              )}
              <img src={`/${product.imageUrl}`} width="30px" height="30px" />
              <ListItemText primary={product.title} secondary={product.desc} />
              <Typography variant="body2" align="right">
                ${(
                  product.orderProduct.quantity *
                  product.orderProduct.price /
                  100
                ).toFixed(2)}
                <Typography variant="caption">
                  ({product.orderProduct.quantity}
                  {` `} x {` `}
                  ${(product.orderProduct.price / 100).toFixed(2)})
                </Typography>
              </Typography>
            </ListItem>
          ))}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total:" align="right" />
            <Typography variant="subheading" className={classes.total}>
              ${order.products
                .reduce(
                  (total, product) =>
                    total +
                    product.orderProduct.quantity *
                      product.orderProduct.price /
                      100,
                  0
                )
                .toFixed(2)}
            </Typography>
          </ListItem>
          {current && (
            <ListItem className={classes.listItem}>
              <Button
                style={{marginLeft: '60px'}}
                variant="contained"
                href="/checkout"
                color="primary"
                align="right"
              >
                Checkout
              </Button>
            </ListItem>
          )}
        </List>
      </Paper>
    )
  }

  render() {
    const {classes} = this.props
    const orders = this.props.cart
    const user = this.props.user

    let currentOrderProducts = orders.currentOrder.products
    let pastOrders = orders.pastOrdersArr

    let findTotalPrice = function(productsArray) {
      let total = 0
      productsArray.forEach(product => {
        total += product.price * product.orderProduct.quantity
      })
      return total
    }

    let findProductTotal = function(price, qty) {
      return price * qty
    }
    console.log('$$$$currentOrderProducts$$$$: ', currentOrderProducts)

    currentOrderProducts = currentOrderProducts.filter(function(product) {
      return product.id
    })

    return (
      <Typography className={classes.root}>
        <Typography>
          <Typography variant="title">Current Order</Typography>
          {currentOrderProducts[0] &&
            this.renderOrder({products: currentOrderProducts}, true)}
        </Typography>
        <Typography className={classes.pastOrders}>
          <Typography variant="title">Past Order(s)</Typography>
          {user && user.id !== undefined ? (
            pastOrders && pastOrders.length ? (
              <Typography>
                {pastOrders &&
                  pastOrders.map(order => this.renderOrder(order, false))}
              </Typography>
            ) : (
              <Typography>~~~no past orders yet!~~~</Typography>
            )
          ) : (
            <Typography>~~~login or sign up to view past orders!~~~</Typography>
          )}
        </Typography>
      </Typography>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialUser: () => dispatch(me()),
    fetchInitialOrderProducts: user => dispatch(fetchOrderProducts(user)),
    removeProductFromOrderProducts: product => {
      dispatch(removeProductFromOrderProducts(product))
    }
  }
}

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default withStyles(styles)(withRouter(ConnectedCart))

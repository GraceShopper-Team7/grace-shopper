import {connect} from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {me} from '../store/user'
import {fetchOrderProducts} from '../store/cart'

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: '700'
  },
  title: {
    marginTop: theme.spacing.unit * 2
  }
})

class Review extends React.Component {
  componentDidMount() {
    this.props.loadOrders(this.props.user)
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.props.loadOrders(this.props.user)
    }
  }

  render() {
    const {classes} = this.props
    const products = this.props.cart.currentOrder.products
    console.log(this.props)
    return (
      <React.Fragment>
        <Typography variant="title" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {products.map(product => (
            <ListItem className={classes.listItem} key={product.title}>
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
            <ListItemText primary="Total" />
            <Typography variant="subheading" className={classes.total}>
              ${products
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
        </List>
      </React.Fragment>
    )
  }
}

Review.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(me()),
    loadOrders: user => dispatch(fetchOrderProducts(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Review)
)

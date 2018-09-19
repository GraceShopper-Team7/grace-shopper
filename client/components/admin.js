import {connect} from 'react-redux'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {fetchOrders, shipOrder} from '../store/admin'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import ShippingIcon from '@material-ui/icons/LocalShipping'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  header: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  order: {
    margin: theme.spacing.unit * 1,
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
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

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selectedOrder: null,
      tracking: ''
    }
  }

  componentDidMount() {
    this.props.loadOrders()
  }

  handleClickOpen(id) {
    this.setState({open: true, selectedOrder: id})
  }

  handleCancel = () => {
    this.setState({open: false})
  }

  handleSend = () => {
    this.props.updateOrder(this.state.selectedOrder, this.state.tracking)
    this.setState({open: false})
  }

  handleChange = evt => {
    console.log('Event in handleChange:', evt)
    this.setState({tracking: evt.target.value})
  }
  renderOrder = order => {
    const {classes} = this.props
    if (!order) {
      return <Typography />
    }
    return (
      <Paper className={classes.order}>
        <List disablePadding>
          <ListItem>
            {order.id && (
              <Typography variant="title">Order #{order.id}</Typography>
            )}
          </ListItem>
          {order.products.map(product => (
            <ListItem className={classes.product} key={product.title}>
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
          <ListItem className={classes.listItem}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleClickOpen(order.id)}
            >
              <ShippingIcon style={{paddingRight: '10px'}} /> Ship Order
            </Button>
          </ListItem>
        </List>
      </Paper>
    )
  }

  render() {
    const {classes} = this.props
    const orders = this.props.orders || []
    return orders.length > 0 ? (
      <Typography className={classes.root}>
        <Typography className={classes.header} variant="title">
          Products
        </Typography>
        <Button variant="contained" color="primary" href="/products/add">
          Add Product
        </Button>
        <Typography className={classes.header} variant="title">
          Orders
        </Typography>
        {orders.map(order => this.renderOrder(order))}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Tracking Number"
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleSend}
              color="primary"
              disabled={!this.state.tracking}
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </Typography>
    ) : (
      <div>Empty Orders!</div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.admin.all
})

const mapDispatchToProps = dispatch => ({
  loadOrders: () => dispatch(fetchOrders()),
  updateOrder: (id, tracking) => {
    dispatch(shipOrder(id, tracking))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Admin)
)

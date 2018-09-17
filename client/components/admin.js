import {connect} from 'react-redux'
import React, {Component} from 'react'
import {fetchOrders, shipOrder} from '../store/admin'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

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

  render() {
    const orders = this.props.orders || []
    return orders.length > 0 ? (
      <div>
        <h1>Orders</h1>
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <span>{order.id}</span>
              <Button onClick={() => this.handleClickOpen(order.id)}>
                Ship Order
              </Button>
            </li>
          ))}
        </ul>
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
            <Button onClick={this.handleSend} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin)

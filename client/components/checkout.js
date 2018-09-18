import {connect} from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AddressList from './address-list'
import EmailForm from './email-form'
import Review from './checkout-order-review'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {me} from '../store/user'
import {fetchOrderProducts} from '../store/cart'

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
})

const steps = ['Shipping address', 'Confirm email', 'Review your order']

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      activeStep: 0
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.props.loadOrders(this.props.user)
    }
  }

  handleNext = () => {
    const {activeStep} = this.state
    this.setState({
      activeStep: activeStep + 1
    })
  }

  handleBack = () => {
    const {activeStep} = this.state
    this.setState({
      activeStep: activeStep - 1
    })
  }

  handleReset = () => {
    this.setState({
      activeStep: 0
    })
  }

  amount = () => {
    if (!this.props || !this.props.cart) {
      return 0
    }
    return this.props.cart.currentOrder.products.reduce((sum, prod) => {
      return sum + prod.orderProduct.price * prod.orderProduct.quantity
    }, 0)
  }

  onToken = async token => {
    await axios.post('/api/cart', {
      token,
      amount: this.amount(),
      orderId: this.props.cart.currentOrder.id
    })
    this.handleNext()
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>
            <AddressList />
          </div>
        )
      case 1:
        return <EmailForm email={this.props.user.email} />
      case 2:
        return <Review />
      default:
        throw new Error('Unknown step')
    }
  }

  render() {
    if (this.props.isFetching) {
      return <span>Fetching cart data</span>
    }
    const {classes} = this.props
    const {activeStep} = this.state

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="display1" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="headline" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subheading">
                    Your order number is #{this.props.cart.currentOrder.id}. We
                    have emailed your order confirmation, and will send you an
                    update when your order has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                    )}
                    {activeStep === steps.length - 1 ? (
                      <StripeCheckout
                        token={this.onToken}
                        amount={this.amount()}
                        stripeKey="pk_test_2eOKaGIWB9JWB9j6YyqmKMdf"
                      >
                        <Button
                          variant="contained"
                          className={classes.button}
                          color="primary"
                        >
                          Pay
                        </Button>
                      </StripeCheckout>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    isFetching: state.cart.isFetchingCart,
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(me()),
    loadOrders: user => dispatch(fetchOrderProducts(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(Checkout)
)

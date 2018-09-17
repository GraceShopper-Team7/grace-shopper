import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Admin,
  ConnectedCart,
  ConnectedSingleProduct,
  ConnectedTypeProductList,
  Login,
  Signup,
  UserHome,
  ProductList,
  AddProduct,
  AddReview,
  Home,
  Checkout
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isAdmin, isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/types/:typeId" component={ConnectedTypeProductList} />
        <Route exact path="/products" component={ProductList} />
        <Route path="/products/add" component={AddProduct} />
        <Route path="/products/:id" component={ConnectedSingleProduct} />
        {isLoggedIn && (
          <Switch>
            {isAdmin && <Route path="/admin" component={Admin} />}
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route
              exact
              path="/products/:productId/addreview"
              component={AddReview}
            />
            <Route path="/orderProducts/:userId" component={ConnectedCart} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isAdmin: state.user.roleId === 1,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}

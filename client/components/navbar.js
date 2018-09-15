import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <Link to="/">
      <h1>Tea Shop Logo</h1>
    </Link>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      <Link to="/products">ALL TEAS</Link>
      <Link to="/types/1">
        <span>BLACK TEAS</span>
      </Link>
      <Link to="/types/2">
        <span>GREEN TEAS</span>
      </Link>
      <Link to="/types/3">
        <span>WHITE TEAS</span>
      </Link>
      <Link to="/types/4">
        <span>HERBAL TEAS</span>
      </Link>
      <Link to="/cart">
        <span>CART</span>
      </Link>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

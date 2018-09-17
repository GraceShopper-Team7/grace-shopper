import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ToolbarGroup from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import {fade} from '@material-ui/core/styles/colorManipulator'
import {withStyles} from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import {Tab} from '@material-ui/core'
import Tabs from '@material-ui/core/Tabs'
import {findProduct} from '../store/product'
import {withRouter} from 'react-router'

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
})
// const Navbar = (props) =>
class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {searchString: ''}
    this.handleInput = this.handleInput.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }
  handleInput(event) {
    this.setState({searchString: event.target.value})
  }
  handleKeyUp = event => {
    if (event.charCode === 13 || event.key === 'Enter') {
      event.preventDefault()
      this.setState({searchString: ''})

      this.props.findProduct(event.target.value)
      this.props.history.push('/products/searchedProducts')
      // this.props.findProduct(this.state.searchString);
      // } else if (this.props.cancelOnEscape && (e.charCode === 27 || e.key === 'Escape')) {
      // 	this.handleCancel();
      // }
      // if (this.props.onKeyUp) {
      // 	this.props.onKeyUp(e);
    }
  }
  render() {
    const {classes} = this.props
    const {isLoggedIn} = this.props
    const {handleClick} = this.props
    const {searchString} = this.state
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div>
              <Tabs>
                <Tab label="Logo" href="/" />
              </Tabs>
            </div>
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Tab label="Home" href="/home" />
                <Tab label="Logout" onClick={handleClick} href="#" />
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Tab label="Login" href="/login" />
                <Tab label="Sign Up" href="/signup" />
              </div>
            )}
            <Tabs>
              <Tab label="All Teas" href="/products" />
              <Tab label="Black Tea" href="/types/1" />
              <Tab label="Green Tea" href="/types/2" />
              <Tab label="White Tea" href="/types/3" />
              <Tab label="Herbal Tea" href="/types/4" />
              <Tab label="Cart" href="/cart" />
            </Tabs>

            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Input
                placeholder="Search…"
                value={searchString}
                onChange={this.handleInput}
                onKeyUp={this.handleKeyUp}
                disableUnderline
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isAdmin: state.user.roleId === 1,
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    findProduct: searchString => dispatch(findProduct(searchString))
    // loadProduct: (productId) => dispatch(fetchSingleProduct(productId))
  }
}
const withStyleNavbar = withStyles(styles)(withRouter(Navbar))
export default connect(mapState, mapDispatch)(withStyleNavbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  findProduct: PropTypes.func
}

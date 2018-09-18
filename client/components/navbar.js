import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import {NavLink} from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import MenuItem from '@material-ui/core/MenuItem'
import ToolbarGroup from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import {fade} from '@material-ui/core/styles/colorManipulator'
import {withStyles} from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import CartIcon from '@material-ui/icons/ShoppingCart'
import {Tab} from '@material-ui/core'
import Tabs from '@material-ui/core/Tabs'
import {findProduct} from '../store/product'
import {withRouter} from 'react-router'

const styles = theme => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  menu: {
    textTransform: 'capitalize',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  header: {
    textTransform: 'capitalize',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    fontFamily: 'Lobster',
    fontSize: '28pt'
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
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: 'space-between'
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
    this.state = {searchString: '', anchorEl: null}
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

  handleTeaMenuClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleTeaMenuClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {classes} = this.props
    const {isLoggedIn} = this.props
    const {isAdmin} = this.props
    const {handleClick} = this.props
    const {searchString, anchorEl} = this.state
    return (
      <div className={classes.root}>
        <Toolbar className={classes.toolbarMain}>
          {isLoggedIn ? (
            <div>
              <Button variant="outlined" size="small" onClick={handleClick}>
                Logout
              </Button>
              {isAdmin && (
                <Button label="Admin" href="/admin">
                  Admin
                </Button>
              )}
            </div>
          ) : (
            <div>
              <Button variant="outlined" size="small" href="/signup">
                Sign up
              </Button>
              <Button size="small" href="/login">
                Login
              </Button>
            </div>
          )}
          <Typography
            variant="headline"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            <Button
              size="large"
              href="/"
              disableFocusRipple
              disableRipple
              className={classes.header}
            >
              Deja Brew
            </Button>
          </Typography>
          <IconButton href="/cart">
            <CartIcon />
          </IconButton>
        </Toolbar>
        <Toolbar variant="dense" className={classes.toolbarSecondary}>
          <Typography color="inherit" noWrap>
            <Button
              size="small"
              href="/types/1"
              disableFocusRipple
              disableRipple
              className={classes.menu}
            >
              Black Tea
            </Button>
          </Typography>
          <Typography color="inherit" noWrap>
            <Button
              size="small"
              href="/types/2"
              disableFocusRipple
              disableRipple
              className={classes.menu}
            >
              Grean Tea
            </Button>
          </Typography>
          <Typography color="inherit" noWrap>
            <Button
              size="small"
              href="/types/3"
              disableFocusRipple
              disableRipple
              className={classes.menu}
            >
              White Tea
            </Button>
          </Typography>
          <Typography color="inherit" noWrap>
            <Button
              size="small"
              href="/types/4"
              disableFocusRipple
              disableRipple
              className={classes.menu}
            >
              Herbal Tea
            </Button>
          </Typography>
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
  isAdmin: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  findProduct: PropTypes.func
}

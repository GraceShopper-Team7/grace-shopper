import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {signupthunk} from '../store'
import {addAddress} from '../store/address'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import AddressForm from './address-form'

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
})

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      username: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.submitUser({...this.state}).then(() => {
      this.props.history.push('/')
    })
  }
  render() {
    const {classes} = this.props
    const {displayName, error} = this.props
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Create your Account</Typography>
            <form
              onSubmit={this.handleSubmit}
              name="signup"
              className={classes.form}
            >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  autoFocus
                  onChange={this.handleChange}
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  onChange={this.handleChange}
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" onChange={this.handleChange} />
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="phoneNumber">Contact Number</InputLabel>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={this.handleChange}
                />
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="username">User Name</InputLabel>
                <Input
                  id="username"
                  name="username"
                  onChange={this.handleChange}
                />
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  onChange={this.handleChange}
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
              >
                {displayName}
              </Button>
              {error && error.response && <div> {error.response.data} </div>}
            </form>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}
const mapSignup = state => {
  return {
    displayName: 'Sign Up',
    error: state.user.error
  }
}
const mapDispatch = dispatch => {
  return {
    submitUser: user => dispatch(signupthunk(user))
  }
}
const withStyleSignup = withStyles(styles)(Signup)
export default connect(mapSignup, mapDispatch)(withStyleSignup)

/**
 * PROP TYPES
 */
Signup.propTypes = {
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object,
  classes: PropTypes.object.isRequired
}

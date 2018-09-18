import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {Navbar} from './components'
import Routes from './routes'

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
  }
})

class App extends Component {
  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(App))

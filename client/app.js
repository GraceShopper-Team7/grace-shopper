import React from 'react'
import {Route, NavLink, Switch, withRouter} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'

// import ConnectedSingleProduct from './singleProduct'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default withRouter(App)

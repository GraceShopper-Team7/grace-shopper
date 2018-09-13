import {connect} from 'react-redux'
import React, {Component} from 'react'

class Cart extends Component {
  componentDidMount() {}

  render() {
    console.log('this.props-render: ', this.props)

    return (
      <div>
        <h1>CART</h1>

        <h3>CURRENT ORDER</h3>

        <h3>PAST ORDER(S)</h3>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default ConnectedCart

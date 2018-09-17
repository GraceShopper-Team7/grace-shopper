import {connect} from 'react-redux'
import React, {Component} from 'react'
import {addProduct} from '../store/product'
import ProductForm from './product-form'

const initialState = {
  title: '',
  imageUrl: '',
  price: 0,
  description: '',
  ingredients: [],
  inventoryQty: 0,
  typeId: 0
}

class AddProduct extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    evt.target.name === 'ingredients'
      ? this.setState({[evt.target.name]: evt.target.value.split(', ')})
      : this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.submitProduct({...this.state}).then(() => {
      this.props.history.push('/products')
    })
  }

  render() {
    return (
      <ProductForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        {...this.state}
      />
    )
  }
}

const mapDispatch = dispatch => ({
  submitProduct: product => dispatch(addProduct(product))
})

export default connect(null, mapDispatch)(AddProduct)

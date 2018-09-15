import {connect} from 'react-redux'
import React, {Component} from 'react'
import {updateProduct} from '../store/product'
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

class EditProduct extends Component {
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
    this.props.changeProduct(this.props.product.id, {
      ...this.state
    })
    this.props.history.push('/products')
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

const mapDispatchToProps = dispatch => ({
  changeProduct: (id, product) => {
    const editedProduct = {id, product}
    dispatch(updateProduct(editedProduct))
  }
})

export default connect(null, mapDispatchToProps)(EditProduct)

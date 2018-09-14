import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {updateProduct} from '../store/product'

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
    this.state = {...initialState}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    if (evt.target.name === 'ingredients') {
      this.setState({[evt.target.name]: evt.target.value.split(', ')})
    } else {
      this.setState({[evt.target.name]: evt.target.value})
    }
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log(this.state)
    this.props.changeProduct(this.props.product.id, {
      ...this.state
    })
    this.props.history.push('/products')
  }

  render() {
    console.log(this.props.product.title)
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          label="Title"
          name="title"
          margin="normal"
          onChange={this.handleChange}
        />
        <br />
        <TextField
          label="Image Url"
          name="imageUrl"
          margin="normal"
          onChange={this.handleChange}
        />
        <br />
        <FormControl>
          <InputLabel htmlFor="adornment-amount">Price</InputLabel>
          <Input onChange={this.handleChange} name="price" />
        </FormControl>
        <br />
        <TextField
          label="Inventory Quantity"
          name="inventoryQty"
          margin="normal"
          onChange={this.handleChange}
        />
        <br />
        <TextField
          label="description"
          name="description"
          fullWidth={true}
          multiline={true}
          rows={2}
          rowsMax={4}
          onChange={this.handleChange}
        />
        <TextField
          label="Ingredients"
          name="ingredients"
          margin="normal"
          onChange={this.handleChange}
        />
        <br />
        <FormControl>
          <InputLabel htmlFor="type-simple">Type</InputLabel>
          <Select
            value={this.state.typeId}
            onChange={this.handleChange}
            name="typeId"
          >
            <MenuItem value={1}>Black</MenuItem>
            <MenuItem value={2}>Green</MenuItem>
            <MenuItem value={3}>White</MenuItem>
            <MenuItem value={4}>Herbal</MenuItem>
          </Select>
          <span>Field is required!</span>
        </FormControl>
        <br />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!this.state.typeId}
        >
          Save
        </Button>
      </form>
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

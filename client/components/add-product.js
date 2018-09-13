import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
//import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {addProduct} from '../store/product'

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
    this.props
      .submitProduct({
        ...this.state
      })
      .then(() => {
        this.props.history.push('/products')
      })
  }

  render() {
    //const {classes} = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          label="Title"
          name="title"
          placeholder="Enter title here"
          margin="normal"
          onChange={this.handleChange}
        />
        <br />
        <TextField
          label="Image Url"
          name="imageUrl"
          placeholder="Enter image url here"
          margin="normal"
          onChange={this.handleChange}
        />
        <br />
        <FormControl>
          <InputLabel htmlFor="adornment-amount">Price</InputLabel>
          <Input
            //id="adornment-amount"
            //value={this.state.amount}
            //onChange={this.handleChange('amount')}
            onChange={this.handleChange}
            name="price"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <br />
        <TextField
          label="Inventory Quantity"
          name="inventoryQty"
          placeholder="Enter inventory quantity here"
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
          placeholder="Enter ingredients here"
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
            /*
            inputProps={{
              name: 'typeId',
              id: 'type-simple'
            }}*/
          >
            <MenuItem value={1}>Black</MenuItem>
            <MenuItem value={2}>Green</MenuItem>
            <MenuItem value={3}>White</MenuItem>
            <MenuItem value={4}>Herbal</MenuItem>
          </Select>
        </FormControl>
        <br />
        <Button variant="contained" color="primary" type="submit">
          Add Product
        </Button>
      </form>
    )
  }
}
/*
AddProduct.propTypes = {
  classes: PropTypes.object.isRequired
}
*/
const mapDispatch = dispatch => ({
  submitProduct: product => dispatch(addProduct(product))
})

export default connect(null, mapDispatch)(AddProduct)

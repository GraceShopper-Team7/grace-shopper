import React from 'react'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const ProductForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <TextField
        label="Title"
        name="title"
        placeholder="Enter title here"
        margin="normal"
        onChange={props.handleChange}
      />
      <br />
      <TextField
        label="Image Url"
        name="imageUrl"
        placeholder="Enter image url here"
        margin="normal"
        onChange={props.handleChange}
      />
      <br />
      <FormControl>
        <InputLabel htmlFor="adornment-amount">Price</InputLabel>
        <Input
          onChange={props.handleChange}
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
        onChange={props.handleChange}
      />
      <br />
      <TextField
        label="description"
        name="description"
        fullWidth={true}
        multiline={true}
        rows={2}
        rowsMax={4}
        onChange={props.handleChange}
      />
      <TextField
        label="Ingredients"
        name="ingredients"
        placeholder="Enter ingredients here"
        margin="normal"
        onChange={props.handleChange}
      />
      <br />
      <FormControl>
        <InputLabel htmlFor="type-simple">Type</InputLabel>
        <Select
          value={props.typeId}
          onChange={props.handleChange}
          name="typeId"
        >
          <MenuItem value={1}>Black</MenuItem>
          <MenuItem value={2}>Green</MenuItem>
          <MenuItem value={3}>White</MenuItem>
          <MenuItem value={4}>Herbal</MenuItem>
        </Select>
      </FormControl>
      <br />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  )
}
export default ProductForm

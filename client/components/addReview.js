import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {addReview} from '../store/review'

const initialState = {
  rating: 0,
  content: ''
}
class AddReview extends Component {
  constructor() {
    super()
    this.state = {...initialState}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.submitReview(this.props.match.params.productId, {...this.state})
    this.props.history.push(`/products`)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormControl>
          <InputLabel>Rating</InputLabel>
          <TextField
            name="rating"
            onChange={this.handleChange}
            margin="normal"
          />
        </FormControl>

        <br />
        <FormControl>
          <InputLabel>Review</InputLabel>
          <TextField
            name="content"
            onChange={this.handleChange}
            margin="normal"
          />
        </FormControl>
        <br />

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    )
  }
}
const mapDispatch = dispatch => ({
  submitReview: (productId, review) => {
    const singleReview = {productId, review}
    dispatch(addReview(singleReview))
  }
})
export default connect(null, mapDispatch)(AddReview)

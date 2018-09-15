import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {addReview} from '../store/review'
import {throws} from 'assert'

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
    this.props.submitReview(
      this.props.match.params.productId,
      this.props.user.id,
      {...this.state}
    )
    this.props.history.push(`/products`)
  }

  render() {
    // console.log('PROPS IN ADD REVIEW', this.props);
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
  submitReview: (productId, userId, review) => {
    const singleReview = {productId, userId, review}
    dispatch(addReview(singleReview))
  }
})

const mapStateToProps = state => {
  return {
    singleProduct: state.products.selected,
    user: state.user
  }
}
export default connect(mapStateToProps, mapDispatch)(AddReview)

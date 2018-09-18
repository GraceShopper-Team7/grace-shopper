import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {addReview} from '../store/review'
import {Input} from '@material-ui/core'

const initialState = {
  rating: 0,
  content: ''
}
const styles = {
  root: {
    width: '100%',
    maxWidth: 500
  }
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
    // this.props.history.push(`/products`);
  }

  render() {
    const {classes} = this.props
    console.log('In Add Review', this.props)
    return (
      <div className={classes.root}>
        <Typography variant="display2" gutterBottom>
          {this.props.singleProduct.title}
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <FormControl>
            <InputLabel>Rating</InputLabel>
            <Input name="rating" onChange={this.handleChange} margin="normal" />
          </FormControl>

          <br />
          <FormControl>
            <InputLabel>Review</InputLabel>
            <Input
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
      </div>
    )
  }
}
const mapDispatch = dispatch => ({
  submitReview: (productId, userId, review) => {
    // const singleReview = { productId, userId, review };
    dispatch(addReview({productId, userId, review}))
  }
})

const mapStateToProps = state => {
  return {
    singleProduct: state.products.selected,
    user: state.user
  }
}
AddReview.propTypes = {
  classes: PropTypes.object.isRequired
}

const withStyleAddReview = withStyles(styles)(AddReview)
export default connect(mapStateToProps, mapDispatch)(withStyleAddReview)

// const connectedAddReview = connect(mapStateToProps, mapDispatch)(AddReview);
// // const connectedAddReviewWithStyle = withStyles(styles)(connectedAddReview);
// export default connectedAddReview;

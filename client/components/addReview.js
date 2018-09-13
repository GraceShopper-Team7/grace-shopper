import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import {addReview} from '../store/review'

export class AddReview extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const firstName = event.target.firstName.value
    const lastName = event.target.lastName.value
    const email = event.target.email.value
    this.props
      .submitStudent({
        firstName,
        lastName,
        email
      })
      .then(() => {
        this.props.history.push('/students')
      })
  }

  render() {
    return (
      <form id="new-student-form" onSubmit={this.handleSubmit}>
        <div>
          <label>First name:</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name here"
          />
          <br />
          <label>Last name:</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter last name here"
          />
          <br />
          <label>Email:</label>
          <input type="text" name="email" placeholder="Enter email here" />
          <br />
          <span>
            <button type="submit" className="btn">
              Add Student
            </button>
          </span>
        </div>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  submitReview: review => dispatch(addReview(review))
})

export default connect(null, mapDispatch)(AddReview)

import {connect} from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import {fetchAddresses, selectAddress} from '../store/address'
import AddressForm from './address-form'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
})

class AddressList extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    if (this.props.isFetching && this.props.user.id) {
      this.props.loadAddresses(this.props.user.id)
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.user !== this.props.user || this.props.isFetching) &&
      this.props.user.id
    ) {
      this.props.loadAddresses(this.props.user.id)
    }
  }

  handleChange = event => {
    this.props.selectAddress(event.target.value)
  }

  render() {
    if (this.props.isFetching) {
      return <div>Loading addresses!</div>
    }
    const {classes} = this.props
    const addresses = this.props.addresses || []
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="Address"
            name="address"
            className={classes.group}
            value={`${this.props.selected}`}
            onChange={this.handleChange}
          >
            {addresses.map(address => (
              <FormControlLabel
                key={address.id}
                value={`${address.id}`}
                control={<Radio />}
                label={`${address.address}, ${address.city}, ${address.state} ${
                  address.zipcode
                } ${address.country}`}
              />
            ))}
            <FormControlLabel
              key="new"
              value="new"
              control={<Radio />}
              label="New Address"
            />
          </RadioGroup>
          {this.props.selected === 'new' ? <AddressForm /> : <p />}
        </FormControl>
      </div>
    )
  }
}

AddressList.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  console.log('state in addresS', state)
  return {
    user: state.user,
    addresses: state.user.id ? state.addresses.all : [],
    selected: state.addresses.selected,
    isFetching: state.addresses.isFetching
  }
}

const mapDispatchToProps = dispatch => ({
  loadAddresses: userId => dispatch(fetchAddresses(userId)),
  selectAddress: addrId => dispatch(selectAddress(addrId))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AddressList)
)

import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import AddressList from './address-list'
import TakeMoney from './take-money'

const styles = theme => ({
  root: {
    width: '90%'
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
})

function getSteps() {
  return ['Choose a shipping address', 'Confirm the email', 'Place order']
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressList />
    case 1:
      return `Insert your email`
    case 2:
      return ``
    default:
      return 'Unknown step'
  }
}

class VerticalLinearStepper extends React.Component {
  state = {
    activeStep: 0
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }))
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }))
  }

  componentDidMount() {
    console.log('loc state', this.props.location.state)
  }

  render() {
    const {classes} = this.props
    const steps = getSteps()
    const {activeStep} = this.state

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      {activeStep === steps.length - 1 ? (
                        <TakeMoney
                          amount={this.props.location.state.amount}
                          orderId={this.props.location.state.orderId}
                          history={this.props.history}
                        />
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                        >
                          Next
                        </Button>
                      )}
                    </div>
                  </div>
                </StepContent>
              </Step>
            )
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&quot;re finished</Typography>
          </Paper>
        )}
      </div>
    )
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(VerticalLinearStepper)

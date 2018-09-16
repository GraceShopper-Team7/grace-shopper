import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

function EmailForm(props) {
  return (
    <React.Fragment>
      <Typography variant="title" gutterBottom>
        Email
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Email"
            value={props.email}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default EmailForm

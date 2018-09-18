// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { auth } from '../store';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import FormControl from '@material-ui/core/FormControl';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import LockIcon from '@material-ui/icons/LockOutlined';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import withStyles from '@material-ui/core/styles/withStyles';
// import { DH_CHECK_P_NOT_SAFE_PRIME } from 'constants';

// const styles = (theme) => ({
// 	layout: {
// 		width: 'auto',
// 		display: 'block', // Fix IE11 issue.
// 		marginLeft: theme.spacing.unit * 3,
// 		marginRight: theme.spacing.unit * 3,
// 		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
// 			width: 400,
// 			marginLeft: 'auto',
// 			marginRight: 'auto'
// 		}
// 	},
// 	paper: {
// 		marginTop: theme.spacing.unit * 8,
// 		display: 'flex',
// 		flexDirection: 'column',
// 		alignItems: 'center',
// 		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
// 	},
// 	avatar: {
// 		margin: theme.spacing.unit,
// 		backgroundColor: theme.palette.secondary.main
// 	},
// 	form: {
// 		width: '100%', // Fix IE11 issue.
// 		marginTop: theme.spacing.unit
// 	},
// 	submit: {
// 		marginTop: theme.spacing.unit * 3
// 	}
// });

// class Signup extends Component {
// 	constructor() {
// 		super();
// 		this.state = {};
// 	}
// 	render() {
// 		return (
// 			<React.Fragment>
// 				<CssBaseline />
// 				<main className={classes.layout}>
// 					<Paper className={classes.paper}>
// 						<Avatar className={classes.avatar}>
// 							<LockIcon />
// 						</Avatar>
// 						<Typography variant="headline">Sign in</Typography>
// 						<form onSubmit={handleSubmit} name={name} className={classes.form}>
// 							<FormControl margin="normal" required fullWidth>
// 								<InputLabel htmlFor="email">Email Address</InputLabel>
// 								<Input id="email" name="email" autoComplete="email" autoFocus />
// 							</FormControl>

// 							<FormControl margin="normal" required fullWidth>
// 								<InputLabel htmlFor="password">Password</InputLabel>
// 								<Input name="password" type="password" id="password" autoComplete="current-password" />
// 							</FormControl>
// 							<Button type="submit" fullWidth variant="raised" color="primary" className={classes.submit}>
// 								{displayName}
// 							</Button>
// 							{error && error.response && <div> {error.response.data} </div>}
// 						</form>
// 						<Button href="/auth/google">
// 							{displayName} with
// 							<svg style={{ marginLeft: '10px', width: '24px', height: '24px' }} viewBox="0 0 24 24">
// 								<path
// 									fill="#000000"
// 									d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
// 								/>
// 							</svg>
// 						</Button>
// 					</Paper>
// 				</main>
// 			</React.Fragment>
// 		);
// 	}
// }
// export default Signup;

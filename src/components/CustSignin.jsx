import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Link as Lnk } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom';
import { UserContext } from '../userContext';
import GoogleIcon from './../components/GoogleIcon';
import Alert from '@material-ui/lab/Alert';
import '../sass/signin.scss';

const useStyles = makeStyles((theme) => ({
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export default function CustSignin() {

	const [user, setUser] = useContext(UserContext);
	const [error, setError] = useState(false);
	const [details, setDetails] = useState({ username: '', password: '' });
	let history = useHistory();

	const handleSubmit = (e) => {
		async function submitData() {
			setError(false);
			let httpHeaders = { 'Content-Type': 'application/json' };
			let url = process.env.REACT_APP_SERVER_URL + '/customer/login';
			//let url = 'http://localhost:4000/customer/login';
			let myHeaders = new Headers(httpHeaders);
			let response = await fetch(url, {
				method: 'POST',
				headers: myHeaders,
				credentials: 'include',
				body: JSON.stringify(details),
			});
			
			if (response.ok) {
				// alert('Signin successfull ');
				let json = await response.json();
				setUser({ data: json, type: 'customer', loggedIn: true });
				history.push('/');
			}
			else {
				setError(true);
			}
		}
		e.preventDefault();
		submitData();

	};

	function handleChange(event) {
		const inputname = event.target.name;
		const inputvalue = event.target.value;
		const newDetails = { ...details, [inputname]: inputvalue };
		setDetails(newDetails);
	}

	return (
		<form className="form" noValidate onSubmit={handleSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={12} >
					<TextField
						autoFocus
						className="signin-input"
						fullWidth
						id="username"
						label="Username"
						name="username"
						onChange={handleChange}
						required
						value={details.username}
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={12} >
					<TextField
						autoComplete="current-password"
						className="signin-input"
						fullWidth
						id="password"
						label="Password"
						name="password"
						onChange={handleChange}
						required
						type="password"
						value={details.password}
						variant="outlined"
					/>
				</Grid>
				<Grid className="signin-submit" item xs={12}>
					<Button
						className="submit signin-button"
						color="primary"
						fullWidth
						type="submit"
						variant="outlined"
					>
                        Sign In
					</Button>
					{
						error ?
							<Alert severity="error">
								Wrong Username or Password.
							</Alert>
							: null
					}
				</Grid>
				<Grid item xs={12}>
					<Typography
						align='center'
					>
                    Or
					</Typography>
				</Grid>
				<Grid container item xs={12}>
					<Grid className="social-submit" item xs={12}>
						<Lnk className="google-link" href="https://eventnest-server.herokuapp.com/auth/google">
							<Button
								className="google-btn signin-button"
								fullWidth
								startIcon={<GoogleIcon />}
								variant="contained"
							>
                            Sign in with Google
							</Button>
						</Lnk>
					</Grid>	
					<Grid className="social-submit" item xs={12}>
						<Lnk className="twitter-link" href="https://eventnest-server.herokuapp.com/auth/twitter">
							<Button
								className="twitter-btn signin-button"
								fullWidth
								startIcon={<TwitterIcon />}
								variant="contained"
							>
                            Sign in with Twitter
							</Button>
						</Lnk>
					</Grid>	
					<Grid className="social-submit" item xs={12}>
						<Lnk className="facebook-link" href="https://eventnest-server.herokuapp.com/auth/facebook">
							<Button
								className="facebook-btn signin-button"
								fullWidth
								startIcon={<FacebookIcon />}
								variant="contained"
							>
                            Sign in with Facebook
							</Button>
						</Lnk>
					</Grid>
				</Grid>
			</Grid>
			<Grid container>
				<Grid item sm={6} xs={12}>
					<a href='#' variant='body2'>
                        Forgot password?
					</a>
				</Grid>
				<Grid item sm={6} xs={12}>
					<Link to='/signup' variant='body2'>
						{'Don\'t have an account? Sign Up'}
					</Link>
				</Grid>
			</Grid>
		</form>

	);
}
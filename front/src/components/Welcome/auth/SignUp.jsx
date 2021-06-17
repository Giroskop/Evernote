import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import useForm from '../../../hooks/useForm'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://material-ui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

// Object.fromEntries(new Formdata(e.target))
export default function SignUp() {
	const classes = useStyles()
	const history = useHistory()
  const dispatch = useDispatch()
	const [values, changeHandler] = useForm()
  const [error, setError] = useState()
  const user = useSelector(state => state.user)
  console.log(user)

	const signUpUser = async (e) => {
		e.preventDefault()
		console.log('from signUp')
		const res = await fetch('http://127.0.0.1:3001/auth/signUp', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values),
		})
  
    switch (res.status) {
      case 200:
        console.log('Успешно зарегестрирован')
        console.log('you pushed to /')
        const user = await res.json()
        console.log(user)
        window.localStorage.setItem('user', user._id)
        dispatch()
        history.push('/')
        break
      case 400:
        console.log('не все поля заполнены')
        setError('Не все поля заполнены')
        break
      case 406:
        console.log('юзер уже существует')
        setError('Юзер уже существует')
        break
      default:
        console.log('error from auth', res)
        history.push('/errorPage')
        break
    }
	}

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign up
          <p style={{color:"red"}}>{error}</p>
				</Typography>
				<form className={classes.form} noValidate onSubmit={e => signUpUser(e)}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete='fname'
								name='firstName'
								variant='outlined'
								fullWidth
								id='firstName'
								label='First Name'
								autoFocus
								value={values.firstName}
								onChange={changeHandler}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant='outlined'
								fullWidth
								id='lastName'
								label='Last Name'
								name='lastName'
								autoComplete='lname'
								value={values.lastName}
								onChange={changeHandler}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								value={values.email}
								onChange={changeHandler}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
								value={values.password}
								onChange={changeHandler}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value='allowExtraEmails' color='primary' />}
								label='I want to receive inspiration, marketing promotions and updates via email.'
							/>
						</Grid>
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justify='flex-end'>
						<Grid item>
							<Link href='signIn' variant='body2'>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
    
	)
}

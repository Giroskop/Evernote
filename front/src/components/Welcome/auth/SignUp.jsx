import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Alert } from '@material-ui/lab'
import useForm from '../../../hooks/useForm'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Link as Linkto } from 'react-router-dom'
import { userRegisterSagaAC } from '../../../redux/saga/authSaga'
import { REGISTER_FAIL } from '../../../redux/types/auth'
import { clearErrorAC } from '../../../redux/actions/errorAC'

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
export default function SignUp({toggleModal,setModalName}) {
	const classes = useStyles()
	const history = useHistory()
	const dispatch = useDispatch()
	const [values, changeHandler] = useForm()

	const error = useSelector(state => state.error)
	const [errorLocal, setErrorLocal] = useState({
    status: false,
		message: null,
	})
	// useEffect(() => {
	// 	if (error.id === REGISTER_FAIL) {
	// 		setErrorLocal({ status: true, message: error.message })
	// 	} else {
	// 		setErrorLocal({ status: false, message: null })
	// 	}
	// }, [error])
	function signUp(e) {
		e.preventDefault()
		dispatch(clearErrorAC())
		dispatch(userRegisterSagaAC(values))
	}

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Регистрация
					{error.id === REGISTER_FAIL ? (
						<Alert severity='error'>{error.message}</Alert>
					) : null}
				</Typography>
				<form className={classes.form} noValidate onSubmit={signUp}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete='fname'
								name='firstName'
								variant='outlined'
								fullWidth
								id='firstName'
								label='Имя'
								autoFocus
								value={values.firstName || ''}
								onChange={changeHandler}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant='outlined'
								fullWidth
								id='lastName'
								label='Фамилия'
								name='lastName'
								autoComplete='lname'
								value={values.lastName || ''}
								onChange={changeHandler}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='email'
								label='Почта'
								name='email'
								autoComplete='email'
								value={values.email || ''}
								onChange={changeHandler}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='password'
								label='Пароль'
								type='password'
								id='password'
								autoComplete='current-password'
								value={values.password || ''}
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
						Зарегистрироваться
					</Button>
					<Grid container>
						<Grid item>
              <button
									type='button'
									className='button toggleModalButton'
									onClick={toggleModal}
								>
									Уже есть аккаунт? Войти
								</button>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	)
}

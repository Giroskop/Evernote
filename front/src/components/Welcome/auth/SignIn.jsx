import React from 'react'
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
import useForm from '../../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Link as Linkto } from 'react-router-dom'
import { userLoginSagaAC } from '../../../redux/saga/authSaga'


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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

export default function SignIn({toggleModal}) {
	const classes = useStyles()
	const [values, changeHandler] = useForm()
	const dispatch = useDispatch()
	const history = useHistory()

	async function signIn(e) {
		e.preventDefault()
    dispatch(userLoginSagaAC(values))
	}

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Вход в личный кабинет
          {}
				</Typography>
				<form className={classes.form} noValidate onSubmit={signIn}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						label='Почта'
						name='email'
						autoComplete='email'
						autoFocus
						value={values.email || ''}
						onChange={changeHandler}
					/>
					<TextField
						variant='outlined'
						margin='normal'
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
					<FormControlLabel
						control={<Checkbox value='remember' color='primary' />}
						label='Remember me'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						Войти
					</Button>
					<Grid container>
						{/* <Grid item xs>
							<Link href='#' variant='body2'>
								Forgot password?
							</Link>
						</Grid> */}
						<Grid item>
              <button
									type='button'
									className='button toggleModalButton'
									onClick={toggleModal}
								>
									Еще не зарегистрированы? Зарегистрироваться
								</button>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	)
}

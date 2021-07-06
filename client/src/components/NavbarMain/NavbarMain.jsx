import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/actions/userAC'
import { userLogoutAC } from '../../redux/actions/authAC'
import AuthModal from '../Welcome/auth/AuthModal'
const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}))

export default function NavbarMain() {
	const classes = useStyles()

	const dispatch = useDispatch()

	function logout() {
		dispatch(userLogoutAC())
	}
	const isAuth = useSelector(state => state.auth.isAuth)

	return (
		<header className='header'>
			<nav className='header__nav'>
				<Link to='/' className='logo'>
					LOGO
				</Link>
				<ul className='list'>
					{isAuth ? (
						<li className='list__item'>
							<button className='button auth-link' onClick={logout}>
								Выйти
							</button>
						</li>
					) : (
						<>
							<li className='list__item'>
								<AuthModal
									modalButtonName='Зарегистрироваться'
								/>
							</li>
							<li className='list__item'>
								<AuthModal
									modalButtonName='Вход'
								/>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	)
}

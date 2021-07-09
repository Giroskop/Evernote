import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogoutAC } from '../../redux/actions/authAC'
import AuthModal from '../Welcome/auth/AuthModal'
import NotepadCreateModal from './NotepadCreateModal'


export default function NavbarMain() {

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
				<ul className='list list--login'>
					{isAuth ? (
						<>
            <li className="list__item">
              <NotepadCreateModal/>
            </li>
            <li className='list__item'>
							<button className='button auth-link' onClick={logout}>
								Выйти
							</button>
						</li>
            </>
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

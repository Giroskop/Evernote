import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogoutAC } from '../../redux/actions/authAC'
import AuthModal from '../Welcome/auth/AuthModal'
import NotepadCreateModal from './NotepadCreateModal'

export default function NavbarMain() {
	const dispatch = useDispatch()
	const [authModalName, setAuthModalName] = useState('')
	const [authModalOpen, setAuthModalOpen] = useState(false)

	function logout() {
		dispatch(userLogoutAC())
	}
	const isAuth = useSelector(state => state.auth.isAuth)

	function handleOpen(e) {
		setAuthModalOpen(true)
		if (e.target.innerText === 'Зарегистрироваться') {
			setAuthModalName('Зарегистрироваться')
		} else {
			setAuthModalName('Вход')
		}
	}
  console.log(authModalName)
	return (
		<header className='header'>
			<nav className='header__nav'>
				<Link to='/' className='logo'>
					LOGO
				</Link>
				<ul className='list list--login'>
					{isAuth ? (
						<>
							<li className='list__item'>
								<NotepadCreateModal />
							</li>
							<li className='list__item'>
								<button className='button auth-link' onClick={logout}>
									Выйти
								</button>
							</li>
						</>
					) : (
						<>
							<li
								className='list__item auth-link'
								onClick={handleOpen}
							>
								Зарегистрироваться
							</li>
							<li
								className='list__item auth-link'
								onClick={handleOpen}
							>
								Вход
							</li>
						</>
					)}
				</ul>
				<AuthModal
					modalButtonName='Вход'
					authModalName={authModalName}
          setAuthModalName={setAuthModalName}
					authModalOpen={authModalOpen}
					setAuthModalOpen={setAuthModalOpen}
				/>
			</nav>
		</header>
	)
}

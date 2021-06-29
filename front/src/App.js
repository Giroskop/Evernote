
import './App.css'
import style from './style/style.sass'
import { BrowserRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NavbarMain from './components/NavbarMain/NavbarMain'
import Sidebar from './components/Content/Sidebar/Sidebar'
import AppRouter from './components/AppRouter'
import { useEffect, useState } from 'react'
import { userLoadSagaAC } from './redux/saga/authSaga'

function App() {

	const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(userLoadSagaAC())
  }, [])

	// useEffect(() => {
	// 	if (localStorage.email) {
	// 		dispatch(setUser(localStorage.email))
	// 	} else {
	// 		console.log(111)
	// 	}
	// }, [])
	const isAuth = useSelector(state => state.auth.isAuth)
	return (
		<BrowserRouter>
			<div className='App'>
				<div className='fullscreen-wrapper'>
					<NavbarMain />
					{isAuth ? (
						<>
							<div className='container-main'>
								<Sidebar />
								<div className='container-content'>
									<div className='dark-surf'>
										<AppRouter />
									</div>
								</div>
							</div>{' '}
						</>
					) : (
						<>
								<div className='container-content'>
									<div className='dark-surf'>
										<AppRouter />
									</div>
								</div>

						</>
					)}
				</div>
			</div>
		</BrowserRouter>
	)
}

export default App

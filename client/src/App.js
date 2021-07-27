
import './App.css'
import './style/style.sass'
import { BrowserRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import NavbarMain from './components/NavbarMain/NavbarMain'
import Sidebar from './components/Content/Sidebar/Sidebar'
import AppRouter from './components/AppRouter'
import { useEffect } from 'react'
import { userLoadSagaAC } from './redux/saga/authSaga'
import { placemarksLoadSagaAC } from './redux/saga/placemarkSaga'

function App() {

	const dispatch = useDispatch()
  const {token, isAuth} = useSelector(state => state.auth)
  
  useEffect(() => {
    console.log('app rendered')
    dispatch(userLoadSagaAC(token))
    // dispatch(placemarksLoadSagaAC())
  }, [])


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
							</div>
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

import logo from './logo.svg'
import './App.css'
import style from './style/style.sass'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import {useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import SignIn from './components/Welcome/auth/SignIn'
import SignUp from './components/Welcome/auth/SignUp'
import Welcome from './components/Welcome/Welcome'
import NavbarMain from './components/NavbarMain/NavbarMain'
import Sidebar from './components/Content/Sidebar/Sidebar'
import ErrorPage from './components/ErrorPage'
import MainPage from './components/Content/MainPage/MainPage'
import PlacemarkList from './components/Content/Placemarks/PlacemarkList'
import NotepadList from './components/Content/Notepad/NotepadList'
import { setUser } from './redux/actions/userAC'

function App() {
  
  const dispatch = useDispatch()

	useEffect(() => {
    console.log('use')
		if (localStorage.email) {
      console.log('use')
			dispatch(setUser(localStorage.email))
		} else {
			console.log(111)
		}
	}, [])

	const user = useSelector(state => state.user)
	console.log(user)

	return (
		<div className='App'>
			<Router>
				<div className='fullscreen-wrapper'>
					<NavbarMain />
					<div className='container-main'>
						<Sidebar />
						<div className='container-content'>
							<Switch>
								<Route exact path='/'>
									{user.email ? <MainPage /> : <Welcome />}
								</Route>
								<Route exact path='/placemarks'>
									<PlacemarkList />
								</Route>
								<Route exact path='/notepads'>
									<NotepadList />
								</Route>
								<Route exact path='/settings'>
									<ErrorPage />
								</Route>
								<Route exact path='/settings'>
									<ErrorPage />
								</Route>
								<Route exact path='/signIn'>
									<SignIn />
								</Route>
								<Route exact path='/signUp'>
									<SignUp />
								</Route>
								<Route exact path='/errorPage'>
									<ErrorPage />
								</Route>
							</Switch>
						</div>
					</div>
				</div>
			</Router>
		</div>
	)
}

export default App

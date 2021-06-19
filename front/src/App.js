import logo from './logo.svg'
import './App.css'
import style from './style/style.sass'
import Welcome from './components/Welcome/Welcome'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import SignIn from './components/Welcome/auth/SignIn'
import SignUp from './components/Welcome/auth/SignUp'
import NavbarMain from './components/NavbarMain/NavbarMain'
import Sidebar from './components/Content/Sidebar/Sidebar'
import ErrorPage from './components/ErrorPage'
import MainPage from './components/Content/MainPage/MainPage'
import PlacemarkList from './components/Content/Placemarks/PlacemarkList'
import NotepadList from './components/Content/Notepad/NotepadList'

function App() {
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
									{localStorage.email ? <MainPage/> : <Welcome/>}
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

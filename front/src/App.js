import logo from './logo.svg'
import './App.css'
import style from './style/style.sass'
import Welcome from './components/Welcome/Welcome'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import SignIn from './components/Welcome/auth/SignIn/SignIn'
import SignUp from './components/Welcome/auth/SignUp/SignUp'
import NavbarMain from './components/NavbarMain/NavbarMain'
import NotepadList from './components/Content/Notepad/NotepadList'
import Sidebar from './components/Content/Sidebar/Sidebar'

function App() {
	return (
		<div className='App'>
			<Router>
				<div className='fullscreen-wrapper'>
          <NavbarMain/>
					<div className='container-main'>
						<Sidebar />
						<div className='container-content'>
							<Switch>
								<Route exact path='/'>
									<NotepadList />
								</Route>
								<Route path='/signIn'>
									<SignIn />
								</Route>
								<Route path='/signUp'>
									<SignUp />
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

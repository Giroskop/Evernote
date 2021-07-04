import MainPage from './components/Content/MainPage/MainPage'
import Notepad from './components/Content/Notepad/Notepad'
import NotepadList from './components/Content/Notepad/NotepadList'
import Error from './components/Errors/Error'
import Settings from './components/Settings/Settings'
import SignIn from './components/Welcome/auth/SignIn'
import SignUp from './components/Welcome/auth/SignUp'
import Welcome from './components/Welcome/Welcome'
import {
  ERROR_ROUTE,
	LOGIN_ROUTE,
	MAIN_ROUTE,
	NOTEPADS_ROUTE,
	REGISTRATION_ROUTE,
  SETTINGS_ROUTE,
} from './utils/consts'

export const authRoutes = [
	{
		path: NOTEPADS_ROUTE,
		Component: NotepadList,
	},
	{
		path: NOTEPADS_ROUTE + '/:id',
		Component: Notepad,
	},
	{
		path: SETTINGS_ROUTE,
		Component: Settings,
	},
  {
		path: MAIN_ROUTE,
		Component: MainPage,
	},
]
export const publicRoutes = [
	{
		path: MAIN_ROUTE,
		Component: Welcome,
	},
	{
		path: REGISTRATION_ROUTE,
		Component: SignUp,
	},
	{
		path: LOGIN_ROUTE,
		Component: SignIn,
	},
	{
		path: ERROR_ROUTE,
		Component: Error,
	},
]

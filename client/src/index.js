import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:3001/';


ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
	document.getElementById('root')
)


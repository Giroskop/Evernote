import { useSelector } from 'react-redux'

import { Route, Switch } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import PageNotExist from './Errors/PageNotExist'
export default function AppRouter() {
  // const isAuth = useSelector(state => state.isAuth)
  const isAuth = useSelector(state => state.isAuth)
	return (
		<Switch>
      {isAuth && authRoutes.map(({path, Component}) => 
        <Route path={path} component={Component} exact key={path}/>
      )}
      {publicRoutes.map(({path, Component}) => 
        <Route path={path} component={Component} exact key={path}/>
      )}
      <Route>
        <PageNotExist/>
      </Route>
		</Switch>
	)
}

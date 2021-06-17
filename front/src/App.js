import logo from './logo.svg';
import './App.css';
import Welcome from './components/Welcome/Welcome';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import SignIn from './components/Welcome/auth/SignIn';
import SignUp from './components/Welcome/auth/SignUp';
import NavbarMain from './components/NavbarMain/NavbarMain';
import ErrorPage from './components/ErrorPage';



function App() {
  return (
    <div className="App">
      <Router>
        <NavbarMain/>
        <Switch>
          <Route exact path="/">
            <Welcome/>
          </Route>
          <Route exact path="/signIn">
            <SignIn/>
          </Route>
          <Route exact path="/signUp">
            <SignUp/>
          </Route>
          <Route exact path="/errorPage">
            <ErrorPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

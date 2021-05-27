import logo from './logo.svg';
import './App.css';
import Auth from './components/auth/Auth';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import SignIn from './components/auth/SignIn/SignIn';
import SignUp from './components/auth/SignUp/SignUp';
import NavbarMain from './components/NavbarMain/NavbarMain';

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarMain/>
        <Switch>
          <Route exact path="/">
            <Auth/>
          </Route>
          <Route path="/signIn">
            <SignIn/>
          </Route>
          <Route path="/signUp">
            <SignUp/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

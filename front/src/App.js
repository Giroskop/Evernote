import logo from './logo.svg';
import './App.css';
import Welcome from './components/Welcome/Welcome';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import SignIn from './components/Welcome/auth/SignIn/SignIn';
import SignUp from './components/Welcome/auth/SignUp/SignUp';
import NavbarMain from './components/NavbarMain/NavbarMain';

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarMain/>
        <Switch>
          <Route exact path="/">
            <Welcome/>
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

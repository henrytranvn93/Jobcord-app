import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './styles/global.scss';
import LoginPage from './components/LoginPage/LoginPage';
import JobAdd from './components/JobAdd/JobAdd';

function App() {
  const [user, setUser] = useState();

  const getUserUID = (user) => {
    setUser(user)
  }

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact render={() => <LoginPage getUserUID={getUserUID}/>}/>

          <Route path="/add" render={(routeProps) => <JobAdd {...routeProps} user={user}/>}/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;

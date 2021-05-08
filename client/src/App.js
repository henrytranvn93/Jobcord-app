import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './styles/global.scss';
import LoginPage from './components/LoginPage/LoginPage';
import JobAdd from './components/JobAdd/JobAdd';
import JobDetails from './components/JobDetails/JobDetails';

function App() {
  const [user, setUser] = useState();
  const [docID, setDocID] = useState('');

  const getUserUID = (user) => {
    setUser(user)
  }

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact render={() => <LoginPage getUserUID={getUserUID} docID={docID} setDocID={setDocID}/>}/>

          <Route path="/add" render={(routeProps) => <JobAdd {...routeProps} user={user}/>}/>

          <Route path="/details" render={(routeProps) => <JobDetails {...routeProps} user={user} docID={docID}/>}/>


        </Switch>
      </Router>
    </div>
  );
}

export default App;

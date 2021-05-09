import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './styles/global.scss';
import LoginPage from './components/LoginPage/LoginPage';
import JobAdd from './components/JobAdd/JobAdd';
import JobDetails from './components/JobDetails/JobDetails';
import Statistics from './components/Statistics/Statistics';


function App() {
  const [user, setUser] = useState();
  const [docID, setDocID] = useState('');

  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    const docIDLocal = localStorage.getItem("docID");
    if (userLocal !== null && docIDLocal !== null) {
      setUser(JSON.parse(userLocal));
      setDocID(JSON.parse(docIDLocal));
    } 
  }, [])

  useEffect(() => {
    const setLocal = () => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("docID", JSON.stringify(docID));
    }

    return setLocal();
}, [user, docID]);


  const getUserUID = (user) => {
    setUser(user);
  }

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact render={() => <LoginPage getUserUID={getUserUID} docID={docID} setDocID={setDocID}/>}/>

          <Route path="/add" render={(routeProps) => <JobAdd {...routeProps} user={user}/>}/>

          <Route path="/details" render={(routeProps) => <JobDetails {...routeProps} user={user} docID={docID}/>}/>

          <Route path="/statistics" render={() => <Statistics />}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './styles/global.scss';
import LoginPage from './components/LoginPage/LoginPage';


function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact component={LoginPage}/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;

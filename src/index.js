import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/" component={App}/>
      </Switch>
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Shop from './pages/Shop';
import Error from './pages/Error';

function App() {
  return (
    <Router basename="/">
        <Switch>
          <Route path="/" component={Shop} exact />          
          <Route component={Error} />
        </Switch>
    </Router>
  );
}

export default App;

import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

const App: React.FC = (): React.ReactElement => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);

export default App;

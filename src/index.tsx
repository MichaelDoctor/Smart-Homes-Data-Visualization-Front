import React from 'react';
import ReactDOM from 'react-dom';
// import './normalize.css';
// import './webflow.css';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);

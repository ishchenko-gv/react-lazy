import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Shell from './parts/shell';

ReactDOM.render(
  <Router>
    <Shell />
  </Router>,
  document.getElementById('root')
);

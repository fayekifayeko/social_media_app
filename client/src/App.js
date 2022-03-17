import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import { Container } from 'semantic-ui-react'

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar'

import 'semantic-ui-css/semantic.min.css' // before App.css so we can override semantic ui stylings if we need
import './App.css';

import {RedirectToHomeRoute} from './utils/RedirectRoute'

function App() {
  return (
    <AuthProvider>
    <Router>
      <Container>
      <MenuBar />
    <Route exact path = '/' component={Home} />
    <Route exact path = '/login' component={Login} />
    <RedirectToHomeRoute exact path = '/register' component={Register} /> {/* redirect to home page, if you are logged and try to navigate manually to register */}
    </Container>
    </Router>
    </AuthProvider>
  );
}

export default App;

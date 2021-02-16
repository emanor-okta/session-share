import React from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import Home from './Home';
import ReceiveSession from './ReceiveSession';

import config from './config';


const oktaAuth = new OktaAuth(config.oidc);
console.log('Okta Auth');
console.log(oktaAuth);

const App = () => {
  const history = useHistory();

  return (
      <Security oktaAuth={oktaAuth} >
        <Route path='/' exact={true} component={Home}/>
        <Route path='/receivesession' exact={true} component={ReceiveSession}/>
      </Security>
  ); 
  
};

export default App;
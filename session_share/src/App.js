import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './Home';
import Custom_Login from './Custom_Login';

import config from './config';

const oktaAuth = new OktaAuth({...config.oidc, ...config.transform});

const App = () => {
  const history = useHistory();
  
  const CustomLoginAuth = () => {
    history.push('/login');
  }

const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };


  return (
      <Security oktaAuth={oktaAuth} onAuthRequired={CustomLoginAuth} restoreOriginalUri={restoreOriginalUri}>
        <Route path='/' exact={true} component={Home}/>
        <Route path='/login' exact={true} component={Custom_Login}/>
        <Route path='/login/callback' exact={true} component={LoginCallback} />
      </Security>
  ); 
  
};

export default App;

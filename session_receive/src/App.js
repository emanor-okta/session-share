import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './Home';
import ReceiveSession from './ReceiveSession';

import config from './config';


const oktaAuth = new OktaAuth(config.oidc);
console.log('Okta Auth');
console.log(oktaAuth);


const App = () => {
 
   const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} >
        <Route path='/' exact={true} component={Home}/>
        <Route path='/receivesession' exact={true} component={() => <ReceiveSession url={`receivesession`} />} />
        <Route path='/receivesessiontab' exact={true} component={() => <ReceiveSession url={`receivesessiontab`} />} />
      </Security>
  ); 
  
};

export default App;

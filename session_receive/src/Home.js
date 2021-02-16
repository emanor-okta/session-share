import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';


const Home = () => {
    const { oktaAuth, authState } = useOktaAuth();
    const history = useHistory();

    const [userInfo, setUserInfo] = useState({});
    const [tokens, setTokens] = useState({});
    
    const logout = () => {
      // logs user out locally and from Okta
      // oktaAuth.signOut();

      // removes local access/refresh token, keeps Okta session
      oktaAuth.revokeRefreshToken()
      .then(() => {
        oktaAuth.revokeAccessToken()
      })
      .then(() => {
        oktaAuth.tokenManager.clear();
      })
      .catch( err => {
        console.log(err);
      });
    }

    // console.log('AUTH----------')
    // console.log(authState) 

    if(!authState.isAuthenticated) {
      return <div>No Tokens...</div>;
    }
    
    
    if (!userInfo.name) {
      oktaAuth.getUser()
      .then(userInfo => {
        console.log(userInfo);
        setUserInfo(prev => userInfo);
        oktaAuth.tokenManager.getTokens()
        .then( tokens => {
          setTokens(prev => tokens);
        })
      })
      .catch(err => {
        console.log(err);
      });
    }
    
    return (
      <div>
        <h3>Session Transferred For:</h3>
        <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        <h3>Tokens:</h3>
        <pre>{JSON.stringify(tokens, null, 2)}</pre>
        <hr/>
        <button onClick={logout}>Logout</button>
      </div>
    );
    
  };
  
  export default Home;
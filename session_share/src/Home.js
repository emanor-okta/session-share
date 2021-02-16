import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

import {SessionShare} from './sessionShare';

const Home = () => {
    const { oktaAuth, authState } = useOktaAuth();
    const [userInfo, setUserInfo] = useState({});
    const history = useHistory();

    const loginCustomWidget = async () => history.push('login');
    const logout = async () => oktaAuth.signOut('/');

    //using iFrame
    const sessionShare = new SessionShare(authState, 'http://localhost:3002', 'http://localhost:3002');
    //new tab
    // const sessionShare = new SessionShare(authState, 'http://localhost:3002');

    
    
    if(authState.isPending) {
      return <div>Loading...</div>;
    }
  
    if(!authState.isAuthenticated) {
      return (
        <div>
          <h3>Not Logged in yet</h3>
          <br/>
          <button onClick={loginCustomWidget}>Login</button>
          <br/>
        </div>
      );
    }
  
    
    if (!userInfo.name) {
      oktaAuth.getUser()
      .then(userInfo => {
        // console.log(userInfo);
        setUserInfo(prev => userInfo);
      })
      .catch(err => {
        console.log(err);
      });
    }

    const sendSession = () => {
      //opens in hidden IFrame then redirects this window
      sessionShare.sendSession('iframe_redir', 'http://localhost:3002/receivesession');
      //opens in new tab
      // sessionShare.sendSession('New Tab', 'http://localhost:3002/receivesession');
    }

    return (
      <div>
        <p>Logged in!</p>
        <p>{userInfo.name}</p>
        <button onClick={logout}>Logout</button>
        <br/>
        <button onClick={sendSession}>Open</button>
        <iframe name="iframe_redir" title="iframe_redir" 
          height="0px" width="0px" style={{display:'none'}}></iframe>
      </div>
    );
    
  };
  
  export default Home;
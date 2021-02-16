import { useEffect } from "react";
import { useOktaAuth } from '@okta/okta-react';

import { SessionReceive } from './sessionShare';

export default function ReceiveSession() {
    const { oktaAuth } = useOktaAuth();
    //receive from iFrame
    const sessionReceive = new SessionReceive(oktaAuth, 'http://localhost:3001');
    //receive new tab
    // const sessionReceive = new SessionReceive(oktaAuth, 'http://localhost:3001', 'http://localhost:3002');

    var flag = 5;
    
    useEffect(() => {
        console.log('Adding listener');
        sessionReceive.sendReady();

        // this will clean up the event every time the component is re-rendered
        return function cleanup() {
            console.log('Cleaup');
            sessionReceive.removeListener();
        }
    }, [flag]);

  return (
      <div></div>
  );
}
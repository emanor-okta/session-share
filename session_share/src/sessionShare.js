const MSG_SEND = 'POST:SEND';
const MSG_CLOSE = 'POST:CLOSE';
const FEATURES = 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';

class SessionShare {
    constructor(authState, postMsgURL, redirectURL) {
        this.authState = authState;
        this.postMsgURL = postMsgURL;
        this.redirectURL = redirectURL;
    }

    handler = (event) => {
      if (event.origin !== this.postMsgURL) {
          console.log('Not Accepting post_message from origin: ' + event.origin);
          return;
      }
      console.log('Msg Received: ' + event.data);
      if (event.data === MSG_SEND) {
        this.handle.postMessage(encodeURI(JSON.stringify(this.authState)), this.postMsgURL);
      } else if (event.data === MSG_CLOSE) {
        window.removeEventListener('message', this.handler);
        
        if (this.redirectURL) {
            window.location.replace(this.redirectURL);
        }
      }
    }

    sendSession = (component, receiveURL) => {
        console.log(JSON.stringify(this.authState, null, 2));
        window.addEventListener("message", this.handler);
        this.handle = window.open(receiveURL, component, FEATURES);
    }
}


class SessionReceive {
    constructor(oktaAuth, postMsgURL, redirectURL) {
        this.oktaAuth = oktaAuth;
        this.postMsgURL = postMsgURL;
        this.redirectURL = redirectURL;
    }

    handler = (event) => {
        if (event.origin !== this.postMsgURL) {
            console.log('Not Accepting post_message from origin: ' + event.origin);
            return;
        }
        const tokens = JSON.parse(decodeURI(event.data));
        console.log('Msg Received: ' + JSON.stringify(tokens));
        this.oktaAuth.tokenManager.setTokens({accessToken: tokens.accessToken, 
                                        idToken: tokens.idToken, 
                                        refreshToken: tokens.refreshToken});
        
        if (this.redirectURL) {
            window.opener.postMessage(MSG_CLOSE, this.postMsgURL);
            window.location.replace(this.redirectURL);
        } else {
            window.opener.postMessage(MSG_CLOSE, this.postMsgURL);
        }
    }

    sendReady = () => {
        window.addEventListener("message", this.handler);
        if (this.redirectURL) {
            window.opener.postMessage(MSG_SEND, this.postMsgURL);
        } else {
            window.opener.postMessage(MSG_SEND, this.postMsgURL);
        }
    }

    removeListener = () => {
        window.removeEventListener("message", this.handler);
    }
}



module.exports = {
    SessionShare: SessionShare,
    SessionReceive: SessionReceive
}


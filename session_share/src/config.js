
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    oidc: {
      clientId: '0oa1ddcipQGRBMQ815d6',  // Tool SPA App
      issuer: 'https://erikmanor.okta.com/oauth2/aus1d9em7Auo2oFBY5d6',
      redirectUri: window.location.origin + '/login/callback',
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      responseType: ['token', 'id_token'],
      disableHttpsCheck: true,
      tokenManager: {
        autoRenew: true,
        autoRemove: true
      },
    },
    transform: {
      transformAuthState: async (oktaAuth, authState) => {
        // console.log('transform 1');
        console.log(authState)
        if (!authState.isAuthenticated) {
          if (authState.isPending && authState.refreshToken && (authState.refreshToken.expiresAt < parseInt(Date.now()/1000))) {
            authState.isPending = false;
          }
          return authState;
        }
        // extra requirement: user must have valid Okta SSO session
        try {
          // console.log('Calling');
          const user = await oktaAuth.token.getUserInfo();
          // console.log('Called');
          // console.log(user);
          authState.isAuthenticated = !!user; // convert to boolean
          authState.users = user; // also store user object on authState
          return authState;
        } catch (err) {
          console.log(err);
        }
      }
    }
    
  };
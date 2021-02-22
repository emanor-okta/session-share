
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    oidc: {
      clientId: {CLIENT_ID},
      issuer: 'https://{OKTA_DOMAIN}/oauth2/default',
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

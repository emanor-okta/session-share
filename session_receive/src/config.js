
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    oidc: {
      clientId: '0oa1ddcipQGRBMQ815d6', 
      issuer: 'https://erikmanor.okta.com/oauth2/aus1d9em7Auo2oFBY5d6',
      
      redirectUri: window.location.origin + '/login/callback',
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      responseType: ['token', 'id_token'],
         
      disableHttpsCheck: true,
      
    },
    
  };
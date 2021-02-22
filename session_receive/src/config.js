
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    oidc: {
      clientId: {CLIENT_ID}, 
      issuer: 'https://{OKTA_DOMAIN}/oauth2/default',
      
      redirectUri: window.location.origin + '/login/callback',
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      responseType: ['token', 'id_token'],
         
      disableHttpsCheck: true,
      
    },
    
  };

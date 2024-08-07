
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    oidc: {
      clientId: '0oa1qcts70mVXVA6Y1d7', 
      issuer: 'https://oie.erikdevelopernot.com/oauth2/default',
      
      redirectUri: window.location.origin + '/login/callback',
      scopes: ['openid', 'profile', 'email'],  // 'offline_access'],
      responseType: ['token', 'id_token'],
         
      disableHttpsCheck: true,
      
    },
    
  };

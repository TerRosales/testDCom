// src/utils/auth.js
export const getDexcomAuthUrl = () => {
    const clientId = import.meta.env.VITE_DEXCOM_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_DEXCOM_REDIRECT_URI;
    const scope = 'offline_access';
    const responseType = 'code';
  
    return `https://sandbox-api.dexcom.com/v2/oauth2/login?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
  };
  
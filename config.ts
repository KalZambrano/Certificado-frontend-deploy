export const config = {
    apiUrl: 'http://localhost:8080/api',

    endpoints: {
        users: {
            register: '/auth/register',
            login: '/auth/login',
        },
        certificates: {
            create: '/certificados',
            detail: (verificationCode: number | string) => `/certificados/${verificationCode}`,
        }
    }
}

export const getApiUrl = (endpoint: string) => {
  const url = `${config.apiUrl}${endpoint}`;
  console.log(`[${config.apiUrl}] Requesting:`, url);
  return url;
};
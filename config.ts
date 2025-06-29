export const config = {
    apiUrl: 'http://localhost:8080/api',

    endpoints: {
        users: {
            list: '/auth',
            listUsers: '/auth/user',
            listAdmins: '/auth/administrador',
            register: '/auth/register',
            login: '/auth/login',
            detail: (id: number | string) => `/auth/${id}`,
            certificates: (email: string) => `/certificados/estudiante?correo=${email}`
        },
        certificates: {
            list: '/certificados',
            create: '/certificados',
            link: (verificationCode: number | string) => `/certificados/codigo/${verificationCode}`,
            detail: (id: number | string) => `/certificados/${id}`,
            delete: (id: number | string) => `/certificados/${id}`,
            update: (id: number | string) => `/certificados/${id}`,
        }
    }
}

export const getApiUrl = (endpoint: string) => {
  const url = `${config.apiUrl}${endpoint}`;
  console.log(`[${config.apiUrl}] Requesting:`, url);
  return url;
};